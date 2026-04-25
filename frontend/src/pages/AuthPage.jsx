import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming the user logs in successfully
    login({ name: username || 'Demo User', email: username, role: 'admin' });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-sans">
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center p-6 gap-12">
        
        {/* Left Side - Login Form */}
        <div className="w-full md:w-1/2 max-w-sm mx-auto flex flex-col items-center">
          <h2 className="text-[#ff4b2b] text-2xl font-bold mb-8 uppercase tracking-wide">
            User Login
          </h2>

          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            {/* Username Input */}
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-6 py-4 bg-[#e8eaf6] text-gray-700 placeholder-gray-500 text-center font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-[#ff4b2b]/50 transition-all"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-[#e8eaf6] text-gray-700 placeholder-gray-500 text-center font-bold text-xl rounded-full focus:outline-none focus:ring-2 focus:ring-[#ff4b2b]/50 transition-all tracking-widest"
                required
              />
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-xs font-bold text-gray-800 px-2 mt-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 mr-2 border-2 border-gray-400 rounded-sm appearance-none checked:bg-[#ff4b2b] checked:border-[#ff4b2b] relative checked:after:content-['✓'] checked:after:text-white checked:after:absolute checked:after:top-[-2px] checked:after:left-[2px] checked:after:text-[10px]"
                />
                Remember
              </label>
              <a href="#" className="hover:text-[#ff4b2b] transition-colors">
                Forgot Password ?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 mt-6 bg-[#ff4b2b] hover:bg-[#ff3b1b] text-white font-bold rounded-full uppercase tracking-wider shadow-lg shadow-[#ff4b2b]/30 transition-all transform active:scale-95"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right Side - Illustration */}
        <div className="w-full md:w-1/2 flex justify-center items-center relative">
          <img 
            src="https://img.freepik.com/free-vector/cyber-security-concept_23-2148533304.jpg?t=st=1714081001~exp=1714084601~hmac=567bb0144f8f419b4b0e51cc6df4b2c1" 
            alt="Security Login Illustration" 
            className="w-full max-w-lg object-contain rounded-xl mix-blend-multiply"
            onError={(e) => {
              // Fallback to a generic unDraw illustration if the above link fails
              e.target.src = "https://raw.githubusercontent.com/KaterinaLupacheva/react-login-form/master/public/img/login.svg";
            }}
          />
          
          {/* Optional: Add decorative paper plane element via CSS if image doesn't have it exactly */}
          <div className="absolute top-10 left-10 text-[#ff4b2b] text-4xl transform -rotate-12 opacity-80 animate-pulse hidden lg:block">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;
