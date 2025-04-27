import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Question() {
  const { interviewType } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [questionNumber, setQuestionNumber] = useState(1);
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState('');
  const [videoError, setVideoError] = useState('');
  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const videoRef = useRef(null);

  useEffect(() => {
    fetchQuestion();
    setupRecognition();
    startRecording();

    return () => {
      stopRecording();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await fetch(`http://localhost:8000/question/${interviewType}/`);
      const data = await response.json();
      if (data.question) {
        setQuestion(data.question);
        setQuestionNumber(data.question_number);
        speakQuestion(data.question);
      } else if (data.redirect) {
        navigate(data.redirect);
      } else {
        setStatus('Error loading question');
      }
    } catch (error) {
      console.error('Error fetching question:', error);
      setStatus('Error loading question');
    }
  };

  const setupRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.continuous = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript.trim();
        if (transcript) {
          setAnswer(transcript);
          setStatus('');
          submitAnswer(transcript);
        } else {
          setStatus('No speech detected. Listening again...');
          restartRecognition();
        }
      };

      recognitionRef.current.onend = () => {
        if (!answer && status.includes('Listening')) {
          setStatus('Listening again...');
          restartRecognition();
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Recognition Error:', event.error);
        setStatus('Error. Listening again...');
        restartRecognition();
      };
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };
      mediaRecorderRef.current.start();
    } catch (error) {
      console.error('Error starting recording:', error);
      setVideoError('Error accessing camera');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      if (recordedChunksRef.current.length > 0) {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'interview_recording.webm';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        recordedChunksRef.current = [];
      }
    }
  };

  const speakQuestion = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US';
    speech.onend = () => {
      setStatus('Listening...');
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    };
    window.speechSynthesis.speak(speech);
  };

  const restartRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current.start();
    }
  };

  const submitAnswer = async (answerText) => {
    if (!answerText.trim()) {
      setStatus('Please provide an answer');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/question/${interviewType}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: answerText }),
      });
      const data = await response.json();
      if (data.question) {
        setQuestion(data.question);
        setQuestionNumber(data.question_number);
        setAnswer('');
        setStatus('');
        speakQuestion(data.question);
      } else if (data.redirect) {
        stopRecording();
        navigate(data.redirect);
      } else {
        setStatus(data.error || 'Error submitting answer');
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      setStatus('Error submitting answer');
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    submitAnswer(answer);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 w-full max-w-6xl">
        <div className="w-full md:w-[45%] bg-white rounded-xl shadow-lg p-6 flex justify-center items-center">
          {videoError ? (
            <p className="text-red-500">{videoError}</p>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              className="w-full max-w-[450px] rounded-xl"
            />
          )}
        </div>
        <div className="w-full md:w-[45%] bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-center mb-4">Interview Question</h2>
          <form onSubmit={handleManualSubmit} className="flex flex-col gap-4">
            <p className="text-gray-700 text-center">{question}</p>
            <label htmlFor="answer" className="text-gray-600">Your Answer:</label>
            <input
              type="text"
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg bg-gray-50 focus:border-[#2575fc] focus:bg-white focus:shadow-lg transition-all"
              required
            />
            <button
              type="submit"
              className="py-3 px-6 bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white rounded-lg shadow-md hover:bg-gradient-to-r hover:from-[#2575fc] hover:to-[#6a11cb] hover:scale-105 transition-all"
            >
              Submit
            </button>
          </form>
          <p className={`mt-4 text-center ${status.includes('Error') ? 'text-red-500' : 'text-gray-600'} italic`}>
            {status}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Question;