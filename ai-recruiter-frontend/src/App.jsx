import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import AIInterviewOptions from './components/AIInterviewOptions';
import InterviewIndex from './components/InterviewIndex';
import Question from './components/Question';
import Results from './components/Results';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#6a11cb] to-[#2575fc]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai-interview-options" element={<AIInterviewOptions />} />
            <Route path="/interview/:interviewType" element={<InterviewIndex />} />
            <Route path="/question/:interviewType" element={<Question />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;