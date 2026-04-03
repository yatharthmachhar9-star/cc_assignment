# AutoTagger Project

AutoTagger is an AI-powered application that automatically detects and tags objects in images and videos using YOLOv8 object detection. The project consists of a Next.js frontend and a Flask backend.

## Project Structure

- `autotagger/` - Next.js frontend application
- `autotagger_backend/` - Flask backend application with YOLOv8 integration

## Features

- Upload and process images for object detection
- Upload and process videos for frame-by-frame object detection
- Display detected objects with counts and tags
- Download processed images and videos with annotations
- Preview processed media with thumbnails

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- pip (Python package manager)
- npm (Node.js package manager)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd autotagger_backend
   ```

2. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the Flask server:
   ```bash
   python server.py
   ```
   The backend server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd autotagger
   ```

2. Install the required Node.js packages:
   ```bash
   npm install
   ```

3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   The frontend application will run on http://localhost:3000

## Usage

1. Open your browser and navigate to http://localhost:3000
2. Use the "Photos" page to upload and process images
3. Use the "Videos" page to upload and process videos
4. View the detected objects, tags, and download the processed media

## Technologies Used

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI components

### Backend
- Flask (Python)
- YOLOv8 for object detection
- OpenCV for image and video processing

## License

This project is licensed under the MIT License - see the LICENSE file for details.