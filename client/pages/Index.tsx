import { ArrowRight, Code2, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">React App</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-slate-300 hover:text-white transition">
              Features
            </a>
            <a href="#getting-started" className="text-slate-300 hover:text-white transition">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium">
                ✨ Built with React 18 + Vite
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              Build Amazing
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                React Apps
              </span>
            </h1>

            <p className="text-xl text-slate-400 leading-relaxed">
              A modern, production-ready React application template. Start building instantly with TypeScript, Tailwind CSS, and powerful developer tools.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0"
              >
                Start Building
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-slate-700 hover:bg-slate-800"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="hidden lg:block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-3xl opacity-20"></div>
            <div className="relative bg-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur">
              <div className="space-y-4">
                <div className="h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-3/4"></div>
                <div className="h-3 bg-slate-700 rounded-full w-full"></div>
                <div className="h-3 bg-slate-700 rounded-full w-5/6"></div>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-700 space-y-4">
                <div className="flex gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="h-3 bg-slate-700 rounded-full flex-1"></div>
                </div>
                <div className="flex gap-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div className="h-3 bg-slate-700 rounded-full flex-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-slate-400">
            A complete toolkit for modern React development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-slate-600 transition">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Lightning Fast</h3>
            <p className="text-slate-400">
              Powered by Vite with instant HMR and optimized production builds for maximum performance.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-slate-600 transition">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <Code2 className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Type Safe</h3>
            <p className="text-slate-400">
              Full TypeScript support with strict type checking for safer, more maintainable code.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-slate-600 transition">
            <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Beautifully Styled</h3>
            <p className="text-slate-400">
              Tailwind CSS with a pre-built component library for rapid UI development.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="getting-started" className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/20 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Build Something Great?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Start your next React project with this modern, production-ready template.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-24">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <p className="text-slate-400">
              © 2024 React App. Built with React 18 + Vite.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-white transition">
                GitHub
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition">
                Twitter
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition">
                Docs
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
