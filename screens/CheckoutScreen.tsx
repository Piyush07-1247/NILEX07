import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { Order } from '../types';

const CheckoutScreen: React.FC = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: ''
  });

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create order object to pass to confirmation
    const orderData: Omit<Order, 'id' | 'status' | 'timestamp'> = {
      customerName: formData.name,
      customerPhone: formData.phone,
      address: `${formData.address}, ${formData.pincode}`,
      items: cart,
      total: total,
      paymentMethod: 'UPI'
    };

    // Navigate to payment with order data
    navigate('/confirm-payment', { state: { orderData } });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Shipping Details</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            required
            type="text"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            required
            type="tel"
            pattern="[0-9]{10}"
            title="10 digit mobile number"
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="9876543210"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <textarea
            required
            value={formData.address}
            onChange={e => setFormData({...formData, address: e.target.value})}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
            placeholder="Street, Apartment, Area"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
          <input
            required
            type="text"
            pattern="[0-9]{6}"
            value={formData.pincode}
            onChange={e => setFormData({...formData, pincode: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="560001"
          />
        </div>

        <div className="pt-4 border-t border-gray-100 mt-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-600">Total Amount</span>
            <span className="text-xl font-bold text-gray-900">₹{total}</span>
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary transition-colors shadow-lg shadow-primary/20"
          >
            Proceed to Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutScreen;