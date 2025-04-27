function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">AI Recruiter</h3>
          <p className="text-gray-400">
            Revolutionizing the hiring process with artificial intelligence and machine learning.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-white hover:text-[#2575fc]"><i className="fab fa-linkedin"></i></a>
            <a href="#" className="text-white hover:text-[#2575fc]"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-white hover:text-[#2575fc]"><i className="fab fa-facebook"></i></a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#about" className="text-gray-400 hover:text-[#2575fc]">About Us</a></li>
            <li><a href="#features" className="text-gray-400 hover:text-[#2575fc]">Features</a></li>
            <li><a href="#pricing" className="text-gray-400 hover:text-[#2575fc]">Pricing</a></li>
            <li><a href="#contact" className="text-gray-400 hover:text-[#2575fc]">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Features</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-[#2575fc]">AI Interview</a></li>
            <li><a href="#" className="text-gray-400 hover:text-[#2575fc]">Face Detection</a></li>
            <li><a href="#" className="text-gray-400 hover:text-[#2575fc]">Resume Analysis</a></li>
            <li><a href="#" className="text-gray-400 hover:text-[#2575fc]">Candidate Tracking</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Email: info@airecruiter.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: SNS College of Engineering, Coimbatore, Tamil Nadu</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;