import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTestById, submitTest, clearTestState } from '../features/tests/testSlice';

const TestPlayer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { currentTest: test, loading, submitSuccess, submitResult } = useSelector((state) => state.tests);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    dispatch(fetchTestById(id));
    return () => dispatch(clearTestState());
  }, [dispatch, id]);

  useEffect(() => {
    if (test && !isStarted) {
      setTimeLeft(test.duration * 60);
      
      // Initialize responses
      const initialResponses = {};
      test.questions.forEach((q, index) => {
        initialResponses[index] = {
          questionId: q._id,
          selectedOptionIndex: null,
          status: index === 0 ? 'not_answered' : 'not_visited', // 'not_visited', 'not_answered', 'answered', 'marked', 'answered_marked'
          timeSpent: 0
        };
      });
      setResponses(initialResponses);
    }
  }, [test, isStarted]);

  useEffect(() => {
    let timer;
    if (isStarted && timeLeft > 0 && !submitSuccess) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        setResponses(prev => ({
          ...prev,
          [currentQuestionIndex]: {
            ...prev[currentQuestionIndex],
            timeSpent: prev[currentQuestionIndex].timeSpent + 1
          }
        }));
      }, 1000);
    } else if (isStarted && timeLeft === 0 && !submitSuccess) {
      confirmSubmit();
    }
    return () => clearInterval(timer);
  }, [isStarted, timeLeft, submitSuccess, currentQuestionIndex]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (optionIndex) => {
    setResponses(prev => ({
      ...prev,
      [currentQuestionIndex]: {
        ...prev[currentQuestionIndex],
        selectedOptionIndex: optionIndex
      }
    }));
  };

  const navigateToQuestion = (index) => {
    // Update current question status if it was just visited and not answered
    setResponses(prev => {
      const currentRes = prev[currentQuestionIndex];
      const newStatus = currentRes.selectedOptionIndex !== null 
        ? (currentRes.status === 'marked' || currentRes.status === 'answered_marked' ? 'answered_marked' : 'answered')
        : (currentRes.status === 'marked' ? 'marked' : 'not_answered');

      return {
        ...prev,
        [currentQuestionIndex]: { ...currentRes, status: newStatus },
        [index]: { ...prev[index], status: prev[index].status === 'not_visited' ? 'not_answered' : prev[index].status }
      };
    });
    setCurrentQuestionIndex(index);
  };

  const handleSaveAndNext = () => {
    setResponses(prev => ({
      ...prev,
      [currentQuestionIndex]: {
        ...prev[currentQuestionIndex],
        status: prev[currentQuestionIndex].selectedOptionIndex !== null ? 'answered' : 'not_answered'
      }
    }));
    if (currentQuestionIndex < test.questions.length - 1) {
      navigateToQuestion(currentQuestionIndex + 1);
    }
  };

  const handleClearResponse = () => {
    setResponses(prev => ({
      ...prev,
      [currentQuestionIndex]: {
        ...prev[currentQuestionIndex],
        selectedOptionIndex: null,
        status: 'not_answered'
      }
    }));
  };

  const handleMarkForReviewAndNext = () => {
    setResponses(prev => ({
      ...prev,
      [currentQuestionIndex]: {
        ...prev[currentQuestionIndex],
        status: prev[currentQuestionIndex].selectedOptionIndex !== null ? 'answered_marked' : 'marked'
      }
    }));
    if (currentQuestionIndex < test.questions.length - 1) {
      navigateToQuestion(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = () => {
    setShowConfirmModal(true);
  };

  const confirmSubmit = () => {
    setShowConfirmModal(false);
    const attemptData = {
      totalTimeTaken: test.duration * 60 - timeLeft,
      responses: Object.values(responses).map(r => ({
        questionId: r.questionId,
        selectedOptionIndex: r.selectedOptionIndex,
        timeSpent: r.timeSpent,
        isMarkedForReview: r.status === 'marked' || r.status === 'answered_marked'
      }))
    };
    dispatch(submitTest({ id: test._id, attemptData }));
  };

  if (loading || !test) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accentPrimary"></div></div>;

  if (submitSuccess && submitResult) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">✓</div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">Test Submitted!</h2>
          <p className="text-gray-500 mb-8">Your performance has been recorded successfully.</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <p className="text-sm font-bold text-gray-400 mb-1">Score</p>
              <p className="text-3xl font-black text-accentPrimary">{submitResult.score} <span className="text-lg text-gray-400">/ {test.totalMarks}</span></p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <p className="text-sm font-bold text-gray-400 mb-1">Accuracy</p>
              <p className="text-3xl font-black text-accentPrimary">{submitResult.accuracy}%</p>
            </div>
          </div>

          <button onClick={() => navigate('/dashboard/analytics')} className="w-full py-4 bg-accentPrimary text-white rounded-xl font-bold hover:bg-accentPrimary/90 transition-colors shadow-lg">
            View Full Analytics
          </button>
        </div>
      </div>
    );
  }

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-2xl w-full">
          <h1 className="text-2xl font-black text-gray-900 mb-4">{test.title}</h1>
          <p className="text-gray-600 mb-6">{test.description}</p>
          <div className="flex gap-6 mb-8 text-sm font-bold">
            <div className="bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">⏱️ Duration: {test.duration} mins</div>
            <div className="bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">❓ Questions: {test.questions.length}</div>
            <div className="bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">🎯 Marks: {test.totalMarks}</div>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <h3 className="font-bold text-gray-900 mb-3">General Instructions:</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 mb-8">
              <li>The clock will be set at the server. The countdown timer at the top right corner of screen will display the remaining time.</li>
              <li>The Question Palette displayed on the right side of screen will show the status of each question using colors.</li>
              <li>You can navigate to any question directly by clicking on the question number in the palette.</li>
            </ul>
            <button onClick={() => setIsStarted(true)} className="w-full py-4 bg-accentPrimary text-white rounded-xl font-bold hover:bg-accentPrimary/90 transition-colors shadow-lg text-lg">
              I am ready to begin
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = test.questions[currentQuestionIndex];
  const currentRes = responses[currentQuestionIndex];

  const getStatusColor = (status) => {
    switch(status) {
      case 'answered': return 'bg-green-500 text-white border-green-600';
      case 'not_answered': return 'bg-red-500 text-white border-red-600';
      case 'not_visited': return 'bg-gray-200 text-gray-600 border-gray-300';
      case 'marked': return 'bg-purple-500 text-white border-purple-600';
      case 'answered_marked': return 'bg-purple-500 text-white border-purple-600 relative after:content-[""] after:absolute after:bottom-1 after:right-1 after:w-2 after:h-2 after:bg-green-400 after:rounded-full';
      default: return 'bg-gray-200 text-gray-600 border-gray-300';
    }
  };

  const stats = {
    answered: Object.values(responses).filter(r => r.status === 'answered').length,
    not_answered: Object.values(responses).filter(r => r.status === 'not_answered').length,
    not_visited: Object.values(responses).filter(r => r.status === 'not_visited').length,
    marked: Object.values(responses).filter(r => r.status === 'marked').length,
    answered_marked: Object.values(responses).filter(r => r.status === 'answered_marked').length,
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      {/* Header NTA Style */}
      <header className="bg-blue-900 text-white p-3 flex justify-between items-center shadow-md z-10">
        <div className="font-bold text-xl">{test.title}</div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-xs text-blue-200 uppercase font-bold tracking-wider">Time Left</div>
            <div className={`text-xl font-mono font-bold ${timeLeft < 300 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Area - Question */}
        <div className="flex-1 flex flex-col bg-white m-2 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Question Header */}
          <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-bold text-gray-800 text-lg">Question {currentQuestionIndex + 1}</h2>
            <div className="flex gap-4 text-sm font-bold">
              <span className="text-gray-500 bg-white px-3 py-1 rounded-md border border-gray-200">Subject: <span className="text-accentPrimary">{currentQ.subject}</span></span>
              <span className="text-green-600 bg-green-50 px-3 py-1 rounded-md border border-green-100">+{currentQ.marks} Marks</span>
              <span className="text-red-600 bg-red-50 px-3 py-1 rounded-md border border-red-100">-{currentQ.negativeMarks} Mark</span>
            </div>
          </div>

          {/* Question Content */}
          <div className="p-8 flex-1 overflow-y-auto">
            <div className="text-lg text-gray-900 mb-8 font-medium leading-relaxed">
              {currentQ.text}
            </div>
            
            <div className="space-y-4">
              {currentQ.options.map((option, index) => (
                <label 
                  key={index} 
                  className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    currentRes?.selectedOptionIndex === index 
                      ? 'border-accentPrimary bg-accentPrimary/5' 
                      : 'border-gray-200 hover:border-accentPrimary/30 hover:bg-gray-50'
                  }`}
                >
                  <input 
                    type="radio" 
                    name={`q-${currentQuestionIndex}`}
                    checked={currentRes?.selectedOptionIndex === index}
                    onChange={() => handleOptionSelect(index)}
                    className="w-5 h-5 text-accentPrimary focus:ring-accentPrimary border-gray-300"
                  />
                  <span className="ml-4 text-gray-700 font-medium">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center gap-2">
            <div className="flex gap-2">
              <button 
                onClick={handleMarkForReviewAndNext}
                className="px-6 py-3 bg-purple-100 text-purple-700 border border-purple-200 font-bold rounded-lg hover:bg-purple-200 transition-colors shadow-sm"
              >
                Mark for Review & Next
              </button>
              <button 
                onClick={handleClearResponse}
                className="px-6 py-3 bg-white text-gray-700 border border-gray-300 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
              >
                Clear Response
              </button>
            </div>
            <button 
              onClick={handleSaveAndNext}
              className="px-8 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors shadow-sm"
            >
              Save & Next
            </button>
          </div>
        </div>

        {/* Right Area - Palette */}
        <div className="w-80 bg-white m-2 ml-0 rounded-xl shadow-sm border border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-2 gap-2 text-xs font-medium text-gray-600">
              <div className="flex items-center gap-2"><div className="w-6 h-6 rounded flex items-center justify-center text-white bg-green-500">{stats.answered}</div> Answered</div>
              <div className="flex items-center gap-2"><div className="w-6 h-6 rounded flex items-center justify-center text-white bg-red-500">{stats.not_answered}</div> Not Answered</div>
              <div className="flex items-center gap-2"><div className="w-6 h-6 rounded flex items-center justify-center text-gray-600 bg-gray-200">{stats.not_visited}</div> Not Visited</div>
              <div className="flex items-center gap-2"><div className="w-6 h-6 rounded flex items-center justify-center text-white bg-purple-500">{stats.marked}</div> Marked</div>
              <div className="flex items-center gap-2 col-span-2"><div className="w-6 h-6 rounded flex items-center justify-center text-white bg-purple-500 relative after:content-[''] after:absolute after:bottom-1 after:right-1 after:w-1.5 after:h-1.5 after:bg-green-400 after:rounded-full">{stats.answered_marked}</div> Answered & Marked for Review</div>
            </div>
          </div>
          
          <div className="p-4 flex-1 overflow-y-auto">
            <h3 className="text-sm font-bold text-blue-900 mb-3 bg-blue-50 py-1 px-2 rounded border border-blue-100">Section: General</h3>
            <div className="grid grid-cols-5 gap-2">
              {test.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => navigateToQuestion(index)}
                  className={`w-10 h-10 rounded border text-sm font-bold flex items-center justify-center transition-all ${getStatusColor(responses[index]?.status)} ${currentQuestionIndex === index ? 'ring-2 ring-blue-900 ring-offset-2' : ''}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <button 
              onClick={handleSubmit}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>
      {/* Custom Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-in">
            <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">⚠️</div>
            <h3 className="text-xl font-black text-gray-900 mb-2">Submit Test?</h3>
            <p className="text-gray-500 mb-2">You have answered <strong className="text-gray-900">{stats.answered}</strong> out of <strong className="text-gray-900">{test.questions.length}</strong> questions.</p>
            <p className="text-sm text-gray-400 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirmModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors">Go Back</button>
              <button onClick={confirmSubmit} className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg">Yes, Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestPlayer;
