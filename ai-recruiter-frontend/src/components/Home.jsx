import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen">
      <section className="pt-32 pb-20 text-center">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center px-6">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a068f] mb-6 leading-tight">
              Transform Your Hiring Process with AI
            </h1>
            <p className="text-lg text-white mb-8">
              Experience the future of recruitment with our AI-powered platform. Automated interviews and streamlined HR rounds to efficiently evaluate soft skills and cultural fit - all in one place.
            </p>
            <div className="flex gap-4">
              <Link
                to="/interview/mixed"
                className="bg-[#2575fc] text-white px-8 py-4 rounded-full font-medium hover:bg-[#1a5bbf] transition-transform hover:-translate-y-1"
              >
                Get Started
              </Link>
              <Link
                to="#learn-more"
                className="border-2 border-[#2575fc] text-[#2575fc] bg-white px-8 py-4 rounded-full font-medium hover:bg-[#f0f8ff] transition-transform hover:-translate-y-1"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div>
            <img
              src="/static/AI_img.png"
              alt="AI Recruitment Platform"
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;