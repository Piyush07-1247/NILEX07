import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UpiQr from '../components/UpiQr';
import { UPI_ID, UPI_NAME } from '../constants';
import { submitOrder } from '../services/api';
import { useAppContext } from '../App';
import { Loader2, CheckCircle } from 'lucide-react';

const ConfirmPaymentScreen: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useAppContext();
  const [status, setStatus] = useState<'waiting' | 'processing' | 'success'>('waiting');
  const [orderId, setOrderId] = useState<string>('');

  useEffect(() => {
    if (!state?.orderData) {
      navigate('/');
    }
  }, [state, navigate]);

  const orderData = state?.orderData;

  const handlePaymentDone = async () => {
    setStatus('processing');
    // In a real app, you'd verify transaction ID here. 
    // For this demo, we assume user paid and just submit the order.
    
    const result = await submitOrder(orderData);
    
    if (result.success) {
      clearCart();
      setOrderId(result.orderId || 'N/A');
      setStatus('success');
    } else {
      alert('Order submission failed. Please try again.');
      setStatus('waiting');
    }
  };

  if (!orderData) return null;

  if (status === 'success') {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-green-100 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h2>
        <p className="text-gray-500 mb-6">Thank you for your purchase.</p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-500 uppercase tracking-wide">Order ID</p>
          <p className="text-xl font-mono font-bold text-gray-800">{orderId}</p>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Complete Payment</h2>
        <p className="text-gray-500">Scan QR code to pay ₹{orderData.total}</p>
      </div>

      <UpiQr 
        upiId={UPI_ID} 
        name={UPI_NAME} 
        amount={orderData.total} 
        transactionNote={`Order for ${orderData.customerName}`}
      />

      <div className="mt-8 space-y-4">
        {status === 'processing' ? (
          <button disabled className="w-full bg-gray-100 text-gray-400 py-3 rounded-lg font-bold flex items-center justify-center gap-2 cursor-not-allowed">
            <Loader2 className="animate-spin" /> Processing...
          </button>
        ) : (
          <button 
            onClick={handlePaymentDone}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
          >
            I Have Paid
          </button>
        )}
        
        <button 
          onClick={() => navigate('/checkout')}
          className="w-full text-gray-500 hover:text-gray-700 py-2 text-sm font-medium"
        >
          Cancel Order
        </button>
      </div>
    </div>
  );
};

export default ConfirmPaymentScreen;