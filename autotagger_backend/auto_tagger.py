from ultralytics import YOLO

# Load a model (YOLOv8 nano)
model = YOLO("yolov8n.pt")

# Train the model (optional, you can comment this if not training)
train_results = model.train(
    data="coco8.yaml",
    epochs=10,
    imgsz=640,
    device="cpu",
)

# Evaluate on validation set (optional)
metrics = model.val()

# Perform object detection on an image
results = model("autotagger_backend\865978.jpg")

# Show the results
results[0].show()

# ✅ Save the results — this saves the annotated image in the 'runs/detect/' folder
results[0].save(filename='runs/detect/prediction.jpg')

print("\n✅ Detection done. Saved to: runs/detect/prediction.jpg")

# Export to ONNX (optional)
path = model.export(format="onnx")
