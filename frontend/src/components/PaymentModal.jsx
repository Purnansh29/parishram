import React, { useState } from 'react';

const PaymentModal = ({ isOpen, onClose, course, onPaymentSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !course) return null;

  const handlePay = () => {
    setLoading(true);
    // Simulate network request for payment processing
    setTimeout(() => {
      setSuccess(true);
      setTimeout(() => {
        setLoading(false);
        setSuccess(false);
        onPaymentSuccess();
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-100 p-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-accentPrimary text-white p-1.5 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">Secure Payment</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        {success ? (
          <div className="p-10 flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg">
              <svg className="w-10 h-10 text-emerald-500 animate-[bounce_1s_ease-in-out_infinite]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Payment Successful!</h3>
            <p className="text-gray-500 font-medium">Enrolling you in the course...</p>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex gap-4 mb-6">
              <img 
                src={course.thumbnail} 
                alt={course.title} 
                className="w-20 h-16 object-cover rounded-lg shadow-sm border border-gray-100"
              />
              <div>
                <h4 className="text-sm font-bold text-gray-900 line-clamp-2">{course.title}</h4>
                <p className="text-xs text-gray-500 mt-1">Full Course Access</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
              <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
                <span>Course Fee</span>
                <span className="font-medium">₹{course.price}</span>
              </div>
              <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
                <span>GST (18%)</span>
                <span className="font-medium">₹{Math.round(course.price * 0.18)}</span>
              </div>
              <div className="border-t border-gray-200 my-3 pt-3 flex justify-between items-center">
                <span className="font-bold text-gray-900">Total Payable</span>
                <span className="text-xl font-black text-accentPrimary">
                  ₹{course.price + Math.round(course.price * 0.18)}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <label className="flex items-center p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="radio" name="payment" className="text-accentPrimary focus:ring-accentPrimary" defaultChecked />
                <span className="ml-3 font-medium text-gray-900 text-sm">UPI / QR Code</span>
              </label>
              <label className="flex items-center p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="radio" name="payment" className="text-accentPrimary focus:ring-accentPrimary" />
                <span className="ml-3 font-medium text-gray-900 text-sm">Card / Net Banking</span>
              </label>
            </div>

            <button
              onClick={handlePay}
              disabled={loading}
              className="w-full bg-accentPrimary hover:bg-accentPrimary/90 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Payment...
                </>
              ) : (
                `Pay ₹${course.price + Math.round(course.price * 0.18)}`
              )}
            </button>

            <p className="text-center text-xs text-gray-400 mt-4 font-medium flex items-center justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              This is a mock payment gateway. No real money will be deducted.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
