import BvimLayout from "../components/BvimLayout";

export default function Skills() {
  return (
    <BvimLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-cyan-400 mb-4">💻 Technical Skills</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-800/50 rounded border border-gray-700">
            <h2 className="text-xl font-semibold text-green-400 mb-3">
              Languages
            </h2>
            <div className="flex flex-wrap gap-2">
              {["Python", "Java", "TypeScript", "JavaScript", "C++", "SQL"].map(lang => (
                <span key={lang} className="px-3 py-1 bg-green-900/30 text-green-300 rounded-full text-sm border border-green-700/50">
                  {lang}
                </span>
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-gray-800/50 rounded border border-gray-700">
            <h2 className="text-xl font-semibold text-blue-400 mb-3">
              Frontend
            </h2>
            <div className="flex flex-wrap gap-2">
              {["React", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"].map(tech => (
                <span key={tech} className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm border border-blue-700/50">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-gray-800/50 rounded border border-gray-700">
            <h2 className="text-xl font-semibold text-purple-400 mb-3">
              Backend & Tools
            </h2>
            <div className="flex flex-wrap gap-2">
              {["Node.js", "Express", "MongoDB", "PostgreSQL", "Docker", "Git"].map(tech => (
                <span key={tech} className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-sm border border-purple-700/50">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-gray-800/50 rounded border border-gray-700">
            <h2 className="text-xl font-semibold text-yellow-400 mb-3">
              AI & Systems
            </h2>
            <div className="flex flex-wrap gap-2">
              {["Agentic AI", "LangChain", "Linux", "Bash", "System Design"].map(tech => (
                <span key={tech} className="px-3 py-1 bg-yellow-900/30 text-yellow-300 rounded-full text-sm border border-yellow-700/50">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-800/50 rounded border border-gray-700">
          <h2 className="text-xl font-semibold text-cyan-400 mb-3">
            🎯 Core Competencies
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-300">
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">▸</span>
              Full-stack web development
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">▸</span>
              RESTful API design
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">▸</span>
              Database architecture
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">▸</span>
              DevOps & CI/CD
            </li>
          </ul>
        </div>
      </div>
    </BvimLayout>
  );
}