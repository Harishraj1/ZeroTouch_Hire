import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Results() {
  const navigate = useNavigate();
  const [results, setResults] = useState({
    interview_responses: [],
    analysis_results_by_question: [],
    overall_feedback: '',
    average_ratings_table: '',
    final_rating: 0,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchResults() {
      try {
        const response = await fetch('http://localhost:8000/results/');
        const data = await response.json();
        if (data.interview_responses) {
          setResults(data);
        } else {
          setError(data.error || 'No results available');
        }
      } catch (error) {
        console.error('Error fetching results:', error);
        setError('Error loading results');
      }
    }
    fetchResults();
  }, []);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="bg-[#2c3e50] text-white text-3xl font-bold text-center py-4 rounded-md mb-8">
          Interview Summary
        </h1>
        {error && <p className="text-red-500 text-center mb-6">{error}</p>}
        {results.interview_responses.map((response, index) => (
          <div key={index} className="bg-[#ecf0f1] p-6 rounded-lg border border-gray-200 mb-8">
            <div className="mb-4">
              <p className="text-lg">
                <strong className="text-[#2980b9]">Q{index + 1}: {response.question}</strong>
              </p>
              <p className="text-gray-600 italic">A: {response.answer || 'No answer provided'}</p>
            </div>
            <h2 className="text-xl font-semibold text-[#34495e] mb-4">
              Analysis for Question {response.index}:
            </h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#ecf0f1]">
                  <th className="border border-gray-300 p-3 font-bold">Category</th>
                  <th className="border border-gray-300 p-3 font-bold">Rating</th>
                  <th className="border border-gray-300 p-3 font-bold">Explanation</th>
                </tr>
              </thead>
              <tbody>
                {results.analysis_results_by_question
                  .filter(analysis => analysis.question_number === response.index)
                  .flatMap(analysis => analysis.analysis_results)
                  .map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="border border-gray-300 p-3">{row[0]}</td>
                      <td className="border border-gray-300 p-3">{row[1]}</td>
                      <td className="border border-gray-300 p-3">{row[2]}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-[#34495e] mb-4">Average Ratings:</h2>
          <div
            className="bg-[#f8f9fa] p-4 rounded-md border border-gray-200"
            dangerouslySetInnerHTML={{ __html: results.average_ratings_table }}
          />
        </div>
        <div className="mt-8 text-center bg-[#d5f5e3] p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-[#34495e] mb-2">Final Rating</h2>
          <p className="text-lg font-bold">{results.final_rating.toFixed(1)} / 10</p>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-[#34495e] mb-4">Overall Feedback:</h2>
          <div
            className="bg-[#f8f9fa] p-4 rounded-md border border-gray-200"
            dangerouslySetInnerHTML={{ __html: results.overall_feedback }}
          />
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="bg-[#3498db] text-white px-6 py-3 rounded-md font-bold hover:bg-[#2980b9]"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;