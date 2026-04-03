# AutoTagger Backend

This is the backend service for the AutoTagger application, built with Flask and YOLOv8 for object detection in images and videos.

## Features

- Process uploaded images using YOLOv8 object detection
- Process uploaded videos frame-by-frame with YOLOv8
- Generate annotated images and videos with bounding boxes
- Create thumbnails for processed videos
- Provide object counts and tags for detected objects
- Serve processed media files to the frontend

## Setup

1. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Start the Flask server:
   ```bash
   python server.py
   ```

## API Endpoints

- `POST /upload` - Upload and process an image or video file
- `GET /result/<filename>` - Retrieve a processed file

## Configuration

- The server uses the YOLOv8 nano model (`yolov8n.pt`) for object detection
- Processed files are stored in the `results` directory
- Uploaded files are temporarily stored in the `uploads` directory

## Dependencies

- Flask - Web framework
- Flask-CORS - Cross-Origin Resource Sharing support
- Ultralytics YOLOv8 - Object detection model
- OpenCV - Image and video processing
- NumPy - Numerical operations

## Video Processing

The video processing functionality:
- Extracts frames from the uploaded video
- Processes frames with YOLOv8 object detection
- Draws bounding boxes around detected objects
- Creates a new video with annotations
- Generates a thumbnail from the first frame
- Returns object counts and tags