import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login, clearError } from '../features/auth/authSlice';
import SEO from '../components/SEO';
import { useEffect } from 'react';

// Yup Validation Schema
const loginSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const AuthPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  // Redirect if logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
    // Clear errors when component unmounts
    return () => dispatch(clearError());
  }, [user, navigate, dispatch]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/30 font-sans p-6">
      <SEO title="Login" description="Login to your Parishram dashboard to access courses, mock tests, and study analytics." />
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-500 font-medium">Please enter your details to access your dashboard.</p>
        </div>

        {/* Backend Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 animate-shake">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
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
        <div className="my-8 flex items-center gap-4 text-gray-300">
          <div className="h-px bg-gray-200 flex-1"></div>
          <span className="text-xs font-black uppercase tracking-widest text-gray-400">OR</span>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        {/* Form with Formik */}
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          {/* Email Address */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 block">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="name@eduaspirant.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-5 py-3.5 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all text-gray-700 font-medium ${
                formik.touched.email && formik.errors.email
                  ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500'
                  : 'border-gray-100 focus:ring-blue-500/20 focus:border-blue-500'
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-700">Password</label>
              <a href="#" className="text-xs font-bold text-blue-600 hover:underline">Forgot?</a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-5 py-3.5 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all text-gray-700 font-bold text-lg tracking-widest ${
                  formik.touched.password && formik.errors.password
                    ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500'
                    : 'border-gray-100 focus:ring-blue-500/20 focus:border-blue-500'
                }`}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                )}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="remember"
              className="w-5 h-5 rounded-md border-gray-200 text-blue-600 focus:ring-blue-500/20 transition-all cursor-pointer"
            />
            <label htmlFor="remember" className="text-sm font-bold text-gray-600 cursor-pointer">Keep me logged in</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all transform active:scale-[0.98] mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : (
              'Login to Dashboard'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
