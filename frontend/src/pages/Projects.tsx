import BvimLayout from "../components/BvimLayout";

export default function Projects() {
  return (
    <BvimLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-cyan-400 mb-4">🚀 Projects</h1>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-800/50 rounded border border-gray-700 hover:border-green-700/50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-xl font-semibold text-green-400">
                CLI Portfolio
              </h2>
              <span className="px-2 py-1 bg-green-900/30 text-green-300 rounded text-xs border border-green-700/50">
                Active
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              A unique terminal-inspired portfolio with Vim-like navigation
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">React</span>
              <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">TypeScript</span>
              <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">Vite</span>
            </div>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">▸</span>
                Dual-mode interface (Terminal & Bvim)
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">▸</span>
                Custom command-line parser
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">▸</span>
                Vim-inspired keyboard shortcuts
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-gray-800/50 rounded border border-gray-700 hover:border-blue-700/50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-xl font-semibold text-blue-400">
                SG Games Platform
              </h2>
              <span className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded text-xs border border-blue-700/50">
                In Progress
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              A comprehensive gaming platform with multiplayer capabilities
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">React</span>
              <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">Node.js</span>
              <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">WebSocket</span>
            </div>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">▸</span>
                Real-time multiplayer functionality
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">▸</span>
                User authentication & leaderboards
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-gray-800/50 rounded border border-gray-700 hover:border-purple-700/50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-xl font-semibold text-purple-400">
                Agentic AI Tools
              </h2>
              <span className="px-2 py-1 bg-purple-900/30 text-purple-300 rounded text-xs border border-purple-700/50">
                Research
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              AI-powered automation tools for developers
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">Python</span>
              <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">LangChain</span>
              <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">OpenAI</span>
            </div>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">▸</span>
                Autonomous task execution
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">▸</span>
                Natural language code generation
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-3 bg-cyan-900/20 border border-cyan-700/50 rounded">
          <p className="text-cyan-300 text-sm">
            💡 Check out my <a href="https://github.com/BhuvaneshwarMarri" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-200">GitHub</a> for more projects and contributions!
          </p>
        </div>
      </div>
    </BvimLayout>
  );
}