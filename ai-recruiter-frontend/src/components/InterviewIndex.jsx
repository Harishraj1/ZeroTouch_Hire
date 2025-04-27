import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function InterviewIndex() {
  const { interviewType } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus('Please select a file');
      return;
    }
    setStatus('<span class="spinner"></span> Initializing the interview...');
    const formData = new FormData();
    formData.append('resume_image', file);

    try {
      const response = await fetch(`http://localhost:8000/index/${interviewType}/`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.redirect) {
        setStatus('Interview initialized successfully!');
        setTimeout(() => navigate(data.redirect), 1000);
      } else {
        setStatus(data.error || 'Error uploading resume');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Error uploading resume');
    }
  };

  const toggleGuidelines = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-16">
      <div className="bg-gradient-to-br from-[#f9e1fa] to-[#c3f0f3] p-8 rounded-2xl shadow-lg max-w-md w-full text-center flex flex-col gap-6">
        <h1 className="text-3xl font-bold uppercase text-[#1a068f] shadow-md">
          Welcome to AI Recruiter
        </h1>
        <h3 className="text-xl font-medium text-[#0814c1] shadow-sm">
          Your smart assistant for job applications
        </h3>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Start Interview</h2>
          <div className="flex flex-col gap-4">
            <label htmlFor="resume_image" className="text-gray-700">Upload Resume Image</label>
            <input
              type="file"
              id="resume_image"
              name="resume_image"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input w-full p-4 rounded-xl shadow-md bg-gradient-to-br from-[#c6bfce] to-[#adcbff] border border-[#2575fc] hover:bg-gray-100"
              required
            />
            <button
              onClick={handleSubmit}
              className="btn-primary w-64 py-4 text-white font-bold rounded-xl shadow-lg hover:bg-gradient-to-r hover:from-[#2575fc] hover:to-[#6a11cb] hover:scale-105 transition-all"
            >
              Start Interview
            </button>
            <p
              className="status-text text-green-600 italic flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: status }}
            ></p>
          </div>
          <span
            className="guidelines-icon text-4xl text-[#e40101] cursor-pointer hover:text-[#f39c12] mt-6 inline-block"
            onClick={toggleGuidelines}
          >
            ⓘ
          </span>
        </div>
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl max-w-lg w-full text-center shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Interview Guidelines</h2>
              <ul className="text-left space-y-2">
                <li>Ensure a stable internet connection.</li>
                <li>Prepare a quiet environment.</li>
                <li>Check your camera and microphone.</li>
                <li>Dress professionally.</li>
                <li>Be punctual.</li>
                <li>Keep a copy of your resume handy.</li>
                <li>Listen carefully and organize your thoughts.</li>
                <li>Show enthusiasm and be yourself.</li>
                <li>Ask clarifying questions if needed.</li>
              </ul>
              <button
                onClick={toggleGuidelines}
                className="mt-4 bg-[#f39c12] text-white py-2 px-5 rounded-md hover:bg-[#d67c0d]"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InterviewIndex;