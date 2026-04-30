import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
          <div className="max-w-md w-full bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40 p-10 text-center">
            {/* Error Icon */}
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>

            <h2 className="text-2xl font-black text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-500 font-medium mb-8 leading-relaxed">
              An unexpected error occurred. Don't worry, your data is safe. Please try again.
            </p>

            {/* Error Details (collapsed) */}
            {this.state.error && (
              <details className="text-left bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                <summary className="text-xs font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-600">
                  Error Details
                </summary>
                <pre className="mt-3 text-xs text-red-600 font-mono overflow-auto max-h-32 whitespace-pre-wrap">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleReset}
                className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all active:scale-[0.98]"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
