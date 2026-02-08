import BvimLayout from "../components/BvimLayout";

export default function Education() {
  return (
    <BvimLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-cyan-400 mb-4">🎓 Education</h1>
        
        <div className="space-y-6">
          <div className="p-4 bg-gray-800/50 rounded border border-gray-700">
            <h2 className="text-xl font-semibold text-green-400 mb-2">
              B.Tech in Computer Science Engineering
            </h2>
            <p className="text-gray-400 text-sm mb-3">
              University Name • Expected 2024
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">▸</span>
                Focused on software engineering and system design
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">▸</span>
                Core courses: Data Structures, Algorithms, Database Systems
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">▸</span>
                Specialization in AI and Machine Learning
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-gray-800/50 rounded border border-gray-700">
            <h2 className="text-xl font-semibold text-blue-400 mb-3">
              📚 Certifications & Courses
            </h2>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Advanced React & TypeScript Development
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Cloud Computing & AWS Architecture
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Linux System Administration
              </li>
            </ul>
          </div>
        </div>
      </div>
    </BvimLayout>
  );
}