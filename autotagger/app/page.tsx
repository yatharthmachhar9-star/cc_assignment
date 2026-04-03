import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Video, ArrowRight, Sparkles, Zap, Target } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <Navigation />

      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse">
              <Sparkles className="w-4 h-4" />
              AI-Powered Auto Tagging
            </div>
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-6 leading-tight">
              Autotagger
            </h1>
            <p className="text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
              Revolutionary Python-based AI system that automatically detects and tags objects in your media. Upload
              photos or videos to experience cutting-edge machine learning with{" "}
              <span className="font-semibold text-violet-600">TensorFlow</span>,
              <span className="font-semibold text-purple-600"> OpenCV</span>, and{" "}
              <span className="font-semibold text-fuchsia-600">YOLO algorithms</span>.
            </p>
          </div>

          {/* Card Buttons Section */}
          <div className="grid md:grid-cols-2 gap-8 w-full max-w-2xl">
            <Link href="/photos">
              <Card className="group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-100 hover:to-cyan-100 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="text-center pb-4 relative z-10">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                    <Camera className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-slate-900 group-hover:text-blue-700 transition-colors">
                    Photo Tagging
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center relative z-10">
                  <CardDescription className="text-slate-600 mb-4">
                    Upload images to automatically detect and tag objects using state-of-the-art CNN models. Supports
                    JPEG, PNG formats with real-time bounding box visualization and confidence scoring.
                  </CardDescription>
                  <div className="flex items-center justify-center text-blue-600 font-medium group-hover:text-blue-700 group-hover:gap-3 transition-all duration-300">
                    Start Tagging <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/videos">
              <Card className="group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 hover:border-purple-400 hover:bg-gradient-to-br hover:from-purple-100 hover:to-pink-100 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="text-center pb-4 relative z-10">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                    <Video className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-slate-900 group-hover:text-purple-700 transition-colors">
                    Video Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center relative z-10">
                  <CardDescription className="text-slate-600 mb-4">
                    Process video files for frame-by-frame object tagging and motion analysis. Advanced temporal
                    detection with MP4, AVI support and trajectory mapping with auto-generated tags.
                  </CardDescription>
                  <div className="flex items-center justify-center text-purple-600 font-medium group-hover:text-purple-700 group-hover:gap-3 transition-all duration-300">
                    Analyze Video <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Features Section */}
          <div className="mt-20 grid md:grid-cols-3 gap-8 w-full">
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                Deep Learning Models
              </h3>
              <p className="text-slate-600 text-sm">
                Pre-trained neural networks with 95%+ accuracy for precise tagging
              </p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                Real-time Processing
              </h3>
              <p className="text-slate-600 text-sm">Lightning-fast tagging with GPU acceleration and instant results</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-violet-600 transition-colors">
                Smart Auto-Tagging
              </h3>
              <p className="text-slate-600 text-sm">Identify 80+ object classes with intelligent tag generation</p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                95%
              </div>
              <div className="text-sm text-slate-600">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                80+
              </div>
              <div className="text-sm text-slate-600">Object Classes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                30fps
              </div>
              <div className="text-sm text-slate-600">Processing Speed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                1M+
              </div>
              <div className="text-sm text-slate-600">Tags Generated</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
