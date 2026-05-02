import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import DashboardHeader from '../../components/DashboardHeader';
import api from '../../services/api';

const CreateTest = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [testData, setTestData] = useState({
    title: '',
    description: '',
    duration: '',
    category: 'JEE Main',
    course: '',
    questions: [
      { text: '', options: ['', '', '', ''], correctOptionIndex: 0, marks: 4, negativeMarks: 1, subject: 'General' }
    ]
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get('/courses');
        setCourses(data);
        if (data.length > 0) setTestData(prev => ({ ...prev, course: data[0]._id }));
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleMetadataChange = (e) => {
    setTestData({ ...testData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...testData.questions];
    updatedQuestions[index][field] = value;
    setTestData({ ...testData, questions: updatedQuestions });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...testData.questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setTestData({ ...testData, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setTestData({
      ...testData,
      questions: [...testData.questions, { text: '', options: ['', '', '', ''], correctOptionIndex: 0, marks: 4, negativeMarks: 1, subject: 'General' }]
    });
  };

  const removeQuestion = (index) => {
    if (testData.questions.length === 1) return;
    const updatedQuestions = testData.questions.filter((_, i) => i !== index);
    setTestData({ ...testData, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Calculate total marks
      const totalMarks = testData.questions.reduce((sum, q) => sum + Number(q.marks), 0);
      const finalData = { ...testData, totalMarks };
      
      await api.post('/tests', finalData);
      navigate('/dashboard/teacher/tests');
    } catch (error) {
      console.error('Failed to create test:', error);
      alert(error.response?.data?.message || 'Failed to create test');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <DashboardHeader title="Create Mock Test" />
        <main className="flex-1 p-6 lg:p-8 max-w-5xl mx-auto w-full">
          <form onSubmit={handleSubmit} className="space-y-8 pb-20">
            
            {/* Phase 1: Metadata */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-teacherPrimary text-white flex items-center justify-center text-sm">1</span>
                Test Configuration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Test Title</label>
                  <input 
                    type="text" 
                    name="title"
                    required
                    placeholder="e.g. Physics Full Syllabus Mock Test #01"
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teacherPrimary outline-none transition-all font-bold"
                    value={testData.title}
                    onChange={handleMetadataChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Duration (Minutes)</label>
                  <input 
                    type="number" 
                    name="duration"
                    required
                    placeholder="e.g. 180"
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teacherPrimary outline-none transition-all"
                    value={testData.duration}
                    onChange={handleMetadataChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Associated Course</label>
                  <select 
                    name="course"
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teacherPrimary outline-none transition-all appearance-none"
                    value={testData.course}
                    onChange={handleMetadataChange}
                  >
                    <option value="">No specific course (Global Test)</option>
                    {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Phase 2: Question Builder */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-teacherPrimary text-white flex items-center justify-center text-sm">2</span>
                  Question Builder
                </h3>
                <div className="text-sm font-bold text-gray-500">
                  Total Questions: {testData.questions.length}
                </div>
              </div>

              {testData.questions.map((q, qIndex) => (
                <div key={qIndex} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group">
                  <div className="bg-gray-50 px-8 py-4 flex items-center justify-between border-b border-gray-100">
                    <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Question {qIndex + 1}</span>
                    <button 
                      type="button" 
                      onClick={() => removeQuestion(qIndex)}
                      className="text-red-400 hover:text-red-600 font-bold text-xs"
                    >
                      Delete Question
                    </button>
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="space-y-2">
                      <textarea 
                        required
                        placeholder="Type your question here..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teacherPrimary outline-none transition-all min-h-[100px]"
                        value={q.text}
                        onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {q.options.map((opt, oIndex) => (
                        <div key={oIndex} className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-300">
                            {String.fromCharCode(65 + oIndex)}
                          </span>
                          <input 
                            type="text" 
                            required
                            placeholder={`Option ${oIndex + 1}`}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teacherPrimary outline-none transition-all"
                            value={opt}
                            onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Correct Option</label>
                        <select 
                          className="w-full px-4 py-2 rounded-lg border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-teacherPrimary outline-none transition-all"
                          value={q.correctOptionIndex}
                          onChange={(e) => handleQuestionChange(qIndex, 'correctOptionIndex', Number(e.target.value))}
                        >
                          <option value={0}>Option A</option>
                          <option value={1}>Option B</option>
                          <option value={2}>Option C</option>
                          <option value={3}>Option D</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Marks (+)</label>
                        <input 
                          type="number" 
                          className="w-full px-4 py-2 rounded-lg border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-teacherPrimary outline-none transition-all"
                          value={q.marks}
                          onChange={(e) => handleQuestionChange(qIndex, 'marks', e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Negative Marks (-)</label>
                        <input 
                          type="number" 
                          className="w-full px-4 py-2 rounded-lg border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-teacherPrimary outline-none transition-all"
                          value={q.negativeMarks}
                          onChange={(e) => handleQuestionChange(qIndex, 'negativeMarks', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button 
                type="button"
                onClick={addQuestion}
                className="w-full py-4 border-2 border-dashed border-gray-200 rounded-3xl text-gray-400 font-bold hover:border-teacherPrimary hover:text-teacherPrimary transition-all flex items-center justify-center gap-2"
              >
                <span>+</span> Add Another Question
              </button>
            </div>

            {/* Sticky Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-white/80 backdrop-blur-md border-t border-gray-100 p-4 flex items-center justify-between z-30">
              <div className="flex items-center gap-4 text-sm font-bold text-gray-500">
                <span>Questions: {testData.questions.length}</span>
                <span>•</span>
                <span>Total Marks: {testData.questions.reduce((sum, q) => sum + Number(q.marks), 0)}</span>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  type="button" 
                  onClick={() => navigate('/dashboard/teacher/tests')}
                  className="px-6 py-2 text-gray-500 font-bold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="px-10 py-3 bg-teacherPrimary text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {loading ? 'Publishing...' : 'Publish Test'}
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default CreateTest;
