import BvimLayout from "../components/BvimLayout";

export default function Experience() {
  return (
    <BvimLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-cyan-400 mb-4">💼 Work Experience</h1>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-800/50 rounded border border-gray-700">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="text-xl font-semibold text-green-400">
                  Full Stack Developer
                </h2>
                <p className="text-gray-400 text-sm">
                  Tech Company • 2023 - Present
                </p>
              </div>
              <span className="px-2 py-1 bg-green-900/30 text-green-300 rounded text-xs border border-green-700/50">
                Current
              </span>
            </div>
            <ul className="space-y-2 text-gray-300 mt-3">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">▸</span>
                Developed and maintained full-stack web applications using React and Node.js
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">▸</span>
                Implemented RESTful APIs and integrated third-party services
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">▸</span>
                Collaborated with cross-functional teams using Agile methodology
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">▸</span>
                Optimized application performance, reducing load time by 40%
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-gray-800/50 rounded border border-gray-700">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="text-xl font-semibold text-blue-400">
                  Software Engineering Intern
                </h2>
                <p className="text-gray-400 text-sm">
                  Startup Inc. • 2022 - 2023
                </p>
              </div>
            </div>
            <ul className="space-y-2 text-gray-300 mt-3">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">▸</span>
                Built responsive web interfaces using React and TypeScript
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">▸</span>
                Participated in code reviews and pair programming sessions
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">▸</span>
                Contributed to open-source projects and internal tools
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-gray-800/50 rounded border border-gray-700">
            <h2 className="text-xl font-semibold text-purple-400 mb-3">
              🎯 Key Achievements
            </h2>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Led migration of legacy codebase to modern tech stack
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Mentored junior developers and conducted technical workshops
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Implemented CI/CD pipeline reducing deployment time by 60%
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Received "Developer of the Quarter" award for outstanding contributions
              </li>
            </ul>
          </div>
        </div>
      </div>
    </BvimLayout>
  );
}