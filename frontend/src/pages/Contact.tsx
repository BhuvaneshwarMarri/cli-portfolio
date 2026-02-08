import BvimLayout from "../components/BvimLayout";

export default function Contact() {
  return (
    <BvimLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-cyan-400 mb-4">📧 Get In Touch</h1>
        
        <div className="space-y-6">
          <div className="p-4 bg-gray-800/50 rounded border border-gray-700">
            <h2 className="text-xl font-semibold text-green-400 mb-4">
              Contact Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-green-400 text-2xl">📧</span>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <a href="mailto:bhuvan@example.com" className="text-cyan-300 hover:text-cyan-200 underline">
                    bhuvan@example.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-blue-400 text-2xl">💼</span>
                <div>
                  <p className="text-gray-400 text-sm">LinkedIn</p>
                  <a href="https://linkedin.com/in/bhuvan" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 underline">
                    linkedin.com/in/bhuvan
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-purple-400 text-2xl">💻</span>
                <div>
                  <p className="text-gray-400 text-sm">GitHub</p>
                  <a href="https://github.com/BhuvaneshwarMarri" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 underline">
                    github.com/BhuvaneshwarMarri
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-yellow-400 text-2xl">🐦</span>
                <div>
                  <p className="text-gray-400 text-sm">Twitter</p>
                  <a href="https://twitter.com/bhuvan" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 underline">
                    @bhuvan
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-800/50 rounded border border-gray-700">
            <h2 className="text-xl font-semibold text-blue-400 mb-3">
              💬 Let's Connect!
            </h2>
            <p className="text-gray-300 mb-3">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">▸</span>
                Open to freelance opportunities
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">▸</span>
                Available for collaboration on interesting projects
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">▸</span>
                Happy to help with open-source contributions
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded border border-cyan-700/50">
            <h2 className="text-xl font-semibold text-cyan-400 mb-3">
              🚀 Quick Response
            </h2>
            <p className="text-gray-300">
              I typically respond within 24-48 hours. For urgent inquiries, feel free to reach out on LinkedIn or Twitter.
            </p>
          </div>
          
          <div className="text-center p-4 bg-gray-800/50 rounded border border-gray-700">
            <p className="text-gray-400 text-sm">
              Built with ❤️ using React, TypeScript, and Vim-inspired navigation
            </p>
            <p className="text-gray-500 text-xs mt-2">
              © 2024 Bhuvan. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </BvimLayout>
  );
}