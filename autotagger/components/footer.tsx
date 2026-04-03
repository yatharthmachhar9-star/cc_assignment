import { GitBranch, MessageSquare, Mail, Sparkles } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Autotagger
              </span>
            </div>
            <p className="text-slate-300 text-sm">
              Advanced AI-powered automatic tagging using Python, TensorFlow, and cutting-edge computer vision
              algorithms.
            </p>
          </div>

          {/* Technology */}
          <div>
            <h3 className="font-semibold mb-4 text-violet-400">Technology Stack</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="hover:text-violet-400 transition-colors cursor-pointer">Python & TensorFlow</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">OpenCV & NumPy</li>
              <li className="hover:text-fuchsia-400 transition-colors cursor-pointer">YOLO v8 Models</li>
              <li className="hover:text-pink-400 transition-colors cursor-pointer">Deep Learning CNNs</li>
              <li className="hover:text-cyan-400 transition-colors cursor-pointer">Computer Vision</li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold mb-4 text-purple-400">Features</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="hover:text-violet-400 transition-colors cursor-pointer">Auto Tag Generation</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Multi-object Detection</li>
              <li className="hover:text-fuchsia-400 transition-colors cursor-pointer">Video Frame Analysis</li>
              <li className="hover:text-pink-400 transition-colors cursor-pointer">Batch Processing</li>
              <li className="hover:text-cyan-400 transition-colors cursor-pointer">API Integration</li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4 text-fuchsia-400">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-slate-300 hover:text-violet-400 transition-all duration-300 hover:scale-110">
                <GitBranch className="w-6 h-6" />
              </a>
              <a href="#" className="text-slate-300 hover:text-purple-400 transition-all duration-300 hover:scale-110">
                <MessageSquare className="w-6 h-6" />
              </a>
              <a href="#" className="text-slate-300 hover:text-fuchsia-400 transition-all duration-300 hover:scale-110">
                <Mail className="w-6 h-6" />
              </a>
            </div>
            <p className="text-slate-300 text-sm">Built with Next.js, TypeScript, and Tailwind CSS</p>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            © 2024 Autotagger. Powered by advanced Python machine learning algorithms.
          </p>
        </div>
      </div>
    </footer>
  )
}
