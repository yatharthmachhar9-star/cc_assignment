from flask import Flask, request, send_from_directory, jsonify, make_response
from ultralytics import YOLO
import os
import cv2
import shutil
from flask_cors import CORS
import tempfile

app = Flask(__name__)
# Enable CORS with additional options
CORS(app, resources={r"/*": {"origins": "*", "supports_credentials": True}})

UPLOAD_FOLDER = r"E:/Projects/autotagger_backend/uploads"
RESULT_FOLDER = r"E:/Projects/autotagger_backend/runs/detect"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULT_FOLDER, exist_ok=True)

model = YOLO("yolov8n.pt")

# List of video file extensions
VIDEO_EXTENSIONS = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mkv']

def is_video_file(filename):
    _, ext = os.path.splitext(filename.lower())
    return ext in VIDEO_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    file_type = request.form.get('type', 'image')  # Default to image if not specified
    
    save_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(save_path)
    
    # Check if it's a video file
    if file_type == 'video' or is_video_file(file.filename):
        return process_video(save_path, file.filename)
    else:
        return process_image(save_path, file.filename)

def process_image(image_path, filename):
    # Run detection on image
    results = model(image_path)
    result_filename = f"result_{filename}"
    result_path = os.path.join(RESULT_FOLDER, result_filename)
    results[0].save(filename=result_path)
    
    # Get class IDs
    boxes = results[0].boxes
    class_ids = boxes.cls.tolist()
    
    # Map IDs to names
    names = results[0].names
    counts = {}
    for id in class_ids:
        label = names[int(id)]
        counts[label] = counts.get(label, 0) + 1
    
    return jsonify({
        "filename": result_filename,
        "counts": counts
    })


def process_video(video_path, filename):
    # Create a temporary directory for frames
    temp_dir = tempfile.mkdtemp()
    try:
        # Open the video file
        cap = cv2.VideoCapture(video_path)
        if not cap.isOpened():
            return jsonify({"error": "Failed to open video file"}), 400
        
        # Get video properties
        fps = cap.get(cv2.CAP_PROP_FPS)
        frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        
        # Create output video writer
        result_filename = f"result_{filename}"
        result_path = os.path.join(RESULT_FOLDER, result_filename)
        
        # Try to use H.264 codec which is more web-compatible
        # Fall back to mp4v if H.264 is not available
        try:
            fourcc = cv2.VideoWriter_fourcc(*'avc1')  # H.264 codec
            out = cv2.VideoWriter(result_path, fourcc, fps, (frame_width, frame_height))
            if not out.isOpened():
                raise Exception("Failed to open with avc1 codec")
        except Exception:
            try:
                fourcc = cv2.VideoWriter_fourcc(*'H264')  # Alternative H.264 codec name
                out = cv2.VideoWriter(result_path, fourcc, fps, (frame_width, frame_height))
                if not out.isOpened():
                    raise Exception("Failed to open with H264 codec")
            except Exception:
                # Fall back to mp4v
                fourcc = cv2.VideoWriter_fourcc(*'mp4v')
                out = cv2.VideoWriter(result_path, fourcc, fps, (frame_width, frame_height))
        
        # Process frames
        frame_count = 0
        all_counts = {}
        
        # Save first frame as thumbnail
        thumbnail_path = os.path.join(RESULT_FOLDER, result_filename.replace('.mp4', '.jpg'))
        
        while True:
            ret, frame = cap.read()
            if not ret:
                break
                
            # Save first frame as thumbnail
            if frame_count == 0:
                cv2.imwrite(thumbnail_path, frame)
            
            # Save frame to temp directory
            frame_path = os.path.join(temp_dir, f"frame_{frame_count:06d}.jpg")
            cv2.imwrite(frame_path, frame)
            
            # Run detection on frame
            results = model(frame_path)
            
            # Get class IDs and update counts
            boxes = results[0].boxes
            class_ids = boxes.cls.tolist()
            names = results[0].names
            
            for id in class_ids:
                label = names[int(id)]
                all_counts[label] = all_counts.get(label, 0) + 1
            
            # Draw bounding boxes on frame
            annotated_frame = results[0].plot()
            
            # Write the frame to output video
            out.write(annotated_frame)
            
            frame_count += 1
            
            # Process every 5th frame to speed up processing for large videos
            if frame_count % 5 != 0 and frame_count > 1:
                cap.set(cv2.CAP_PROP_POS_FRAMES, frame_count + 4)
                frame_count += 4
        
        # Release resources
        cap.release()
        out.release()
        
        # Normalize counts by dividing by number of processed frames
        processed_frames = frame_count // 5 + 1 if frame_count > 5 else frame_count
        normalized_counts = {k: round(v / processed_frames) for k, v in all_counts.items()}
        
        return jsonify({
            "filename": result_filename,
            "counts": normalized_counts,
            "total_frames": total_frames,
            "processed_frames": processed_frames
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    finally:
        # Clean up temporary directory
        shutil.rmtree(temp_dir, ignore_errors=True)

@app.route('/result/<path:filename>')
def result_file(filename):
    # Set the appropriate MIME type based on file extension
    mime_type = None
    if filename.lower().endswith('.mp4'):
        mime_type = 'video/mp4'
    elif filename.lower().endswith('.jpg') or filename.lower().endswith('.jpeg'):
        mime_type = 'image/jpeg'
    elif filename.lower().endswith('.png'):
        mime_type = 'image/png'
    
    response = make_response(send_from_directory(RESULT_FOLDER, filename, mimetype=mime_type))
    
    # Add explicit CORS headers
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    
    return response

if __name__ == '__main__':
    app.run(debug=True)
