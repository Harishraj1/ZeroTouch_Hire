import { Link } from 'react-router-dom';

function AIInterviewOptions() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#eef2f3] to-[#8e9eab]">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#00203F] mb-10 uppercase tracking-wide shadow-md">
          Select AI Interview Type
        </h1>
        <ul className="flex flex-col gap-6 max-w-xs mx-auto">
          <li>
            <Link
              to="/interview/general"
              className="block w-full py-4 px-6 text-white font-bold text-lg rounded-xl bg-gradient-to-r from-[#6a11cb] to-[#2575fc] shadow-lg hover:bg-gradient-to-r hover:from-[#2575fc] hover:to-[#6a11cb] hover:scale-105 transition-all duration-300"
            >
              HR Interview
            </Link>
          </li>
          <li>
            <Link
              to="/interview/technical"
              className="block w-full py-4 px-6 text-white font-bold text-lg rounded-xl bg-gradient-to-r from-[#6a11cb] to-[#2575fc] shadow-lg hover:bg-gradient-to-r hover:from-[#2575fc] hover:to-[#6a11cb] hover:scale-105 transition-all duration-300"
            >
              Technical Interview
            </Link>
          </li>
          <li>
            <Link
              to="/interview/mixed"
              className="block w-full py-4 px-6 text-white font-bold text-lg rounded-xl bg-gradient-to-r from-[#6a11cb] to-[#2575fc] shadow-lg hover:bg-gradient-to-r hover:from-[#2575fc] hover:to-[#6a11cb] hover:scale-105 transition-all duration-300"
            >
              Mixed Interview
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AIInterviewOptions;