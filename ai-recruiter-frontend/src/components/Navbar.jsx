import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const isInterviewPage = location.pathname.includes('/interview') || 
                        location.pathname.includes('/question') || 
                        location.pathname.includes('/results');

  return (
    <nav className="fixed top-0 left-0 w-full p-4 bg-white bg-opacity-90 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-[#2575fc]">AI Recruiter</div>
        <div className="flex gap-8 items-center">
          <Link to="/" className="text-gray-800 font-medium hover:text-[#2575fc]">Home</Link>
          <Link to="#about" className="text-gray-800 font-medium hover:text-[#2575fc]">About</Link>
          <Link to="#features" className="text-gray-800 font-medium hover:text-[#2575fc]">Features</Link>
          <Link to="#contact" className="text-gray-800 font-medium hover:text-[#2575fc]">Contact</Link>
          {!isInterviewPage && (
            <Link 
              to="/interview/mixed" 
              className="bg-[#2575fc] text-white px-6 py-3 rounded-full font-medium hover:bg-[#1a5bbf] transition-transform hover:-translate-y-1"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;