"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Video, X, Zap, Tag, Download, RefreshCw, Clock, AlertCircle } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Image from "next/image"
import { uploadVideo, getImageUrl, downloadFile, downloadTags } from "@/lib/api"

export default function VideosPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [processingProgress, setProcessingProgress] = useState(0)
  const [processedVideoUrl, setProcessedVideoUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0] // Only take the first file
    if (file) {
      setUploadedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setTags([]) // Reset tags when new file is uploaded
      setProcessingProgress(0)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".avi", ".mov", ".wmv", ".flv", ".webm", ".mkv"],
    },
    multiple: false,
  })

  const removeFile = () => {
    setUploadedFile(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
    setTags([])
    setProcessingProgress(0)
    setProcessedVideoUrl(null)
    setError(null)
  }

  const processVideo = async () => {
    if (!uploadedFile) return
    
    setIsProcessing(true)
    setProcessingProgress(0)
    setError(null)
    
    // Create a progress simulation while the actual processing happens
    const progressInterval = setInterval(() => {
      setProcessingProgress((prev) => {
        // Cap at 90% until we get the actual result
        return prev < 90 ? prev + 2 : 90
      })
    }, 100)
    
    try {
      // Use the dedicated video upload function
      const response = await uploadVideo(uploadedFile)
      
      clearInterval(progressInterval)
      setProcessingProgress(100)
      
      // Convert object counts to array of tags
      const detectedTags = Object.keys(response.counts)
      setTags(detectedTags)
      
      // Get the processed video URL
      const videoUrl = getImageUrl(response.filename)
      setProcessedVideoUrl(videoUrl)
      
      setIsProcessing(false)
    } catch (err) {
      clearInterval(progressInterval)
      console.error('Error processing video:', err)
      setError('Failed to process video. Please try again.')
      setIsProcessing(false)
      setProcessingProgress(0)
    }
  }

  const resetUpload = () => {
    removeFile()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <Navigation />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Video className="w-4 h-4" />
              Video Auto-Tagging
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Video Autotagger
            </h1>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              Upload video files for advanced object detection and automatic tagging. Our Python-based AI system
              processes each frame using{" "}
              <span className="font-semibold text-purple-600">computer vision algorithms</span> to track object
              movements and generate <span className="font-semibold text-pink-600">temporal tags</span>.
            </p>
          </div>

          {!uploadedFile ? (
            /* Drag and Drop Area */
            <Card className="mb-8 border-2 border-dashed border-purple-300 hover:border-purple-400 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <Upload className="w-5 h-5" />
                  Upload Video for Auto-Tagging
                </CardTitle>
                <CardDescription>
                  Drag and drop your video file here or click to browse. Supports MP4, AVI, MOV, WMV, FLV, WebM, and MKV
                  formats. Maximum file size: 100MB.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-16 text-center cursor-pointer transition-all duration-500 ${
                    isDragActive
                      ? "border-purple-500 bg-gradient-to-br from-purple-100 to-pink-100 scale-105"
                      : "border-purple-300 hover:border-purple-500 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 hover:scale-102"
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${
                        isDragActive
                          ? "bg-gradient-to-br from-purple-500 to-pink-500 scale-110 rotate-6"
                          : "bg-gradient-to-br from-purple-400 to-pink-400 hover:scale-110 hover:rotate-3"
                      }`}
                    >
                      <Video className="w-10 h-10 text-white" />
                    </div>
                    {isDragActive ? (
                      <p className="text-purple-700 font-medium text-lg">Drop the video here...</p>
                    ) : (
                      <>
                        <p className="text-slate-700 font-medium mb-2 text-lg">
                          Drag & drop a video here, or click to select
                        </p>
                        <p className="text-slate-500 text-sm">
                          AI will track objects frame-by-frame with motion analysis, trajectory mapping, and temporal
                          auto-tagging
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Video Preview and Processing */
            <div className="space-y-8">
              <Card className="overflow-hidden border-2 border-purple-200">
                <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-purple-700">
                      <Video className="w-5 h-5" />
                      {uploadedFile.name}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        onClick={resetUpload}
                        variant="outline"
                        size="sm"
                        className="border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        New Video
                      </Button>
                      <Button
                        onClick={removeFile}
                        variant="outline"
                        size="sm"
                        className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="relative rounded-xl overflow-hidden bg-slate-100 mb-6">
                    {processedVideoUrl ? (
                      <div className="relative">
                        <video 
                          controls 
                          className="w-full h-auto max-h-96 object-contain"
                          onError={(e) => {
                            console.error('Video playback error:', e);
                            setError('Error playing the processed video. Try downloading instead.');
                          }}
                        >
                          <source src={processedVideoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        {/* Add a thumbnail image for the processed video */}
                          <div className="mt-2 p-2 bg-slate-50 rounded border border-slate-200">
                            <p className="text-sm text-slate-600 mb-1">Processed Video Thumbnail:</p>
                            <div className="relative h-32 w-full">
                              <Image 
                                src={processedVideoUrl.replace('.mp4', '.jpg')} 
                                alt="Video Thumbnail" 
                                width={200} 
                                height={120}
                                className="object-contain rounded"
                                unoptimized
                                onError={(e) => {
                                  console.error('Thumbnail loading error:', e);
                                  // Hide the image container if thumbnail fails to load
                                  const target = e.target as HTMLImageElement;
                                  if (target.parentElement) {
                                    target.parentElement.style.display = 'none';
                                  }
                                }}
                              />
                            </div>
                          </div>
                      </div>
                    ) : previewUrl ? (
                      <video src={previewUrl} controls className="w-full h-auto max-h-96 object-contain" />
                    ) : null}
                  </div>
                  
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      <p>{error}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Size: {(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB
                    </div>
                  </div>

                  {isProcessing && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                        <span>Processing frames...</span>
                        <span>{processingProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${processingProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={processVideo}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    {isProcessing ? (
                      <>
                        <Zap className="w-5 h-5 mr-2 animate-spin" />
                        Processing Video Frames...
                      </>
                    ) : (
                      <>
                        <Tag className="w-5 h-5 mr-2" />
                        Generate Auto Tags
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Tags Results */}
              {tags.length > 0 && (
                <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-700">
                      <Tag className="w-5 h-5" />
                      Generated Video Tags ({tags.length})
                    </CardTitle>
                    <CardDescription>
                      AI-detected objects and motion patterns throughout your video with temporal analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => uploadedFile && downloadTags(tags, uploadedFile.name)}
                        variant="outline"
                        className="border-green-300 text-green-600 hover:bg-green-50 bg-transparent"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export Video Tags
                      </Button>
                      {processedVideoUrl && (
                        <Button
                          onClick={() => downloadFile(processedVideoUrl, `processed_${uploadedFile?.name || 'video.mp4'}`)}
                          variant="outline"
                          className="border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Video
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Technical Info */}
          <Card className="mt-8 border-2 border-slate-200 hover:border-purple-300 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-slate-900">Video Analysis Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2 text-purple-700">Tracking Features</h4>
                  <div className="text-sm text-slate-600 space-y-2">
                    <p>
                      <strong className="text-purple-600">Multi-Object Tracking:</strong> Simultaneous tracking across
                      frames
                    </p>
                    <p>
                      <strong className="text-pink-600">Trajectory Analysis:</strong> Path visualization and movement
                      patterns
                    </p>
                    <p>
                      <strong className="text-violet-600">Temporal Consistency:</strong> Object ID persistence
                      throughout video
                    </p>
                    <p>
                      <strong className="text-fuchsia-600">Motion Estimation:</strong> Velocity and direction
                      calculations
                    </p>
                    <p>
                      <strong className="text-rose-600">Scene Understanding:</strong> Context-aware behavior analysis
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2 text-pink-700">Technical Implementation</h4>
                  <div className="text-sm text-slate-600 space-y-2">
                    <p>
                      <strong>Framework:</strong> OpenCV, TensorFlow, PyTorch
                    </p>
                    <p>
                      <strong>Algorithms:</strong> SORT, DeepSORT, ByteTrack
                    </p>
                    <p>
                      <strong>Detection Model:</strong> YOLOv8 + Custom Tracking
                    </p>
                    <p>
                      <strong>Frame Rate:</strong> 30 FPS processing capability
                    </p>
                    <p>
                      <strong>Output:</strong> Temporal tags with confidence scores
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
