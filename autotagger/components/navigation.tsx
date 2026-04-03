"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Camera, Video, Sparkles } from "lucide-react"

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/photos", icon: Camera, label: "Photos" },
    { href: "/videos", icon: Video, label: "Videos" },
  ]

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
              Autotagger
            </span>
          </Link>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 group ${
                    isActive
                      ? "text-violet-600 bg-violet-50"
                      : "text-slate-600 hover:text-violet-600 hover:bg-violet-50"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-all duration-300 ${
                      isActive ? "scale-110" : "group-hover:scale-110"
                    }`}
                  />
                  <span className="hidden sm:inline font-medium">{item.label}</span>

                  {/* Active underline */}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full"></div>
                  )}

                  {/* Hover underline */}
                  <div
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full transition-all duration-300 ${
                      isActive ? "w-0" : "w-0 group-hover:w-6"
                    }`}
                  ></div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
