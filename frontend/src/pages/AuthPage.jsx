import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login, register, clearError } from '../features/auth/authSlice';
import SEO from '../components/SEO';
import { useEffect, useState } from 'react';
import api from '../services/api';

// Yup Validation Schema
const authSchema = (isLogin) => Yup.object({
  name: isLogin 
    ? Yup.string() 
    : Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const AuthPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [forgotMode, setForgotMode] = useState(false); // 'email' | 'otp' | false
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMessage, setForgotMessage] = useState({ type: '', text: '' });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  // Redirect if logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
    return () => dispatch(clearError());
  }, [user, navigate, dispatch]);

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: authSchema(isLogin),
    enableReinitialize: true,
    onSubmit: (values) => {
      if (isLogin) {
        dispatch(login({ email: values.email, password: values.password }));
      } else {
        dispatch(register(values));
      }
    },
  });

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setForgotMode(false);
    dispatch(clearError());
    formik.resetForm();
  };

  const handleForgotSubmitEmail = async (e) => {
    e.preventDefault();
    setForgotLoading(true); setForgotMessage({ type: '', text: '' });
    try {
      const { data } = await api.post('/auth/forgot-password', { email: forgotEmail });
      setForgotMessage({ type: 'success', text: data.message });
      setForgotMode('otp');
    } catch (err) {
      setForgotMessage({ type: 'error', text: err.response?.data?.message || 'Failed to send OTP' });
    } finally { setForgotLoading(false); }
  };

  const handleForgotResetPassword = async (e) => {
    e.preventDefault();
    setForgotLoading(true); setForgotMessage({ type: '', text: '' });
    try {
      const { data } = await api.post('/auth/reset-password', { email: forgotEmail, otp: forgotOtp, newPassword: forgotNewPassword });
      setForgotMessage({ type: 'success', text: data.message });
      setTimeout(() => { setForgotMode(false); setForgotMessage({ type: '', text: '' }); }, 2000);
    } catch (err) {
      setForgotMessage({ type: 'error', text: err.response?.data?.message || 'Failed to reset password' });
    } finally { setForgotLoading(false); }
  };

  // Error icon helper
  const ErrorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/30 font-sans p-4 md:p-6">
      <SEO title={isLogin ? "Login" : "Sign Up"} description="Access your Parishram dashboard to access courses, mock tests, and study analytics." />
      <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100">
        
        {/* Header */}
        <div className="mb-8 md:mb-10 text-center">
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
            {forgotMode ? '🔑 Reset Password' : isLogin ? 'Welcome back' : 'Create an Account'}
          </h1>
          <p className="text-gray-500 font-medium text-sm md:text-base">
            {forgotMode === 'email' ? 'Enter your email to receive an OTP' : forgotMode === 'otp' ? 'Enter the OTP and your new password' : isLogin ? 'Please enter your details to access your dashboard.' : 'Enter your details to get started with Parishram.'}
          </p>
        </div>

        {/* Forgot Password Flow */}
        {forgotMode ? (
          <div className="space-y-6">
            {forgotMessage.text && (
              <div className={`p-4 rounded-xl text-sm font-bold ${forgotMessage.type === 'success' ? 'bg-green-50 border border-green-100 text-green-600' : 'bg-red-50 border border-red-100 text-red-600'}`}>
                {forgotMessage.type === 'success' ? '✅' : '❌'} {forgotMessage.text}
              </div>
            )}

            {forgotMode === 'email' && (
              <form onSubmit={handleForgotSubmitEmail} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 block">Email Address</label>
                  <input type="email" required value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} placeholder="name@example.com" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 font-medium" />
                </div>
                <button type="submit" disabled={forgotLoading} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 disabled:opacity-70">
                  {forgotLoading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </form>
            )}

            {forgotMode === 'otp' && (
              <form onSubmit={handleForgotResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 block">OTP Code</label>
                  <input type="text" required value={forgotOtp} onChange={(e) => setForgotOtp(e.target.value)} placeholder="6-digit OTP" maxLength={6} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 font-bold text-center text-2xl tracking-[0.5em]" />
                  <p className="text-xs text-gray-400">Check your backend console for the OTP (demo mode)</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 block">New Password</label>
                  <input type="password" required value={forgotNewPassword} onChange={(e) => setForgotNewPassword(e.target.value)} placeholder="At least 6 characters" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 font-medium" />
                </div>
                <button type="submit" disabled={forgotLoading} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 disabled:opacity-70">
                  {forgotLoading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            )}

            <button onClick={() => { setForgotMode(false); setForgotMessage({ type: '', text: '' }); }} className="w-full text-center text-sm font-bold text-blue-600 hover:underline">
              ← Back to Login
            </button>
          </div>
        ) : (
          <>
            {/* Backend Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 animate-shake">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <ErrorIcon />
                </div>
                <p className="text-sm font-bold text-red-600">{error}</p>
              </div>
            )}

            {/* Social Login */}
            <button className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-bold text-gray-700 shadow-sm active:scale-[0.98]">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>

            {/* Divider */}
            <div className="my-6 md:my-8 flex items-center gap-4 text-gray-300">
              <div className="h-px bg-gray-200 flex-1"></div>
              <span className="text-xs font-black uppercase tracking-widest text-gray-400">OR</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            {/* Form */}
            <form className="space-y-5 md:space-y-6" onSubmit={formik.handleSubmit}>
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 block">Full Name</label>
                  <input type="text" name="name" placeholder="John Doe" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`w-full px-5 py-3.5 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all text-gray-700 font-medium ${formik.touched.name && formik.errors.name ? 'border-red-400 focus:ring-red-500/20' : 'border-gray-100 focus:ring-blue-500/20 focus:border-blue-500'}`} />
                  {formik.touched.name && formik.errors.name && <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1"><ErrorIcon />{formik.errors.name}</p>}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 block">Email Address</label>
                <input type="email" name="email" placeholder="name@eduaspirant.com" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`w-full px-5 py-3.5 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all text-gray-700 font-medium ${formik.touched.email && formik.errors.email ? 'border-red-400 focus:ring-red-500/20' : 'border-gray-100 focus:ring-blue-500/20 focus:border-blue-500'}`} />
                {formik.touched.email && formik.errors.email && <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1"><ErrorIcon />{formik.errors.email}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-gray-700">Password</label>
                  {isLogin && (
                    <button type="button" onClick={() => setForgotMode('email')} className="text-xs font-bold text-blue-600 hover:underline">Forgot?</button>
                  )}
                </div>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} name="password" placeholder="••••••••" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`w-full px-5 py-3.5 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all text-gray-700 font-bold text-lg tracking-widest ${formik.touched.password && formik.errors.password ? 'border-red-400 focus:ring-red-500/20' : 'border-gray-100 focus:ring-blue-500/20 focus:border-blue-500'}`} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                    )}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1"><ErrorIcon />{formik.errors.password}</p>}
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="remember" className="w-5 h-5 rounded-md border-gray-200 text-blue-600 focus:ring-blue-500/20 cursor-pointer" />
                <label htmlFor="remember" className="text-sm font-bold text-gray-600 cursor-pointer">Keep me logged in</label>
              </div>

              <button type="submit" disabled={loading} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] mt-4 disabled:opacity-70 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    {isLogin ? 'Logging in...' : 'Creating account...'}
                  </>
                ) : (
                  isLogin ? 'Login to Dashboard' : 'Create Account'
                )}
              </button>
            </form>

            <p className="mt-6 md:mt-8 text-center text-sm font-medium text-gray-500">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button type="button" onClick={toggleAuthMode} className="font-bold text-blue-600 hover:text-blue-700 hover:underline">{isLogin ? 'Sign up' : 'Log in'}</button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
