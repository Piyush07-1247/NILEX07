import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { PLUS_MEMBERSHIP_PRODUCT } from '../constants';
import { ShieldCheck, Truck, Clock, Gift, ChevronRight } from 'lucide-react';

const PlusScreen: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useAppContext();

  const handleBuyPlus = () => {
    addToCart(PLUS_MEMBERSHIP_PRODUCT, 'Standard');
    navigate('/checkout');
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      {/* Hero Section */}
      <div className="bg-[#222] text-white relative overflow-hidden">
         <div className="container mx-auto px-4 py-12 md:py-20 relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 mb-4 bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-500/50">
                <span className="text-yellow-400 text-lg">✦</span>
                <span className="text-yellow-400 font-bold tracking-widest uppercase text-xs">Nilex Plus</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Experience the <br/><span className="text-yellow-400">Power of Plus</span></h1>
            <p className="text-gray-300 text-lg mb-8 max-w-xl">Unlock free delivery, early access to sales, and earn 2X coins on every purchase. Join the exclusive club today.</p>
            
            <button 
                onClick={handleBuyPlus}
                className="bg-white text-black px-8 py-4 font-bold rounded-sm hover:bg-gray-200 transition-colors flex items-center gap-2 mx-auto md:mx-0"
            >
                Join Now at ₹499 <ChevronRight size={18}/>
            </button>
            <p className="text-xs text-gray-500 mt-3 font-bold">limited time offer. standard price ₹999</p>
         </div>
         
         {/* Decorative BG elements */}
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-yellow-600/20 to-transparent hidden md:block"></div>
         <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-yellow-500 rounded-full blur-[100px] opacity-30"></div>
      </div>

      {/* Benefits Grid */}
      <div className="container mx-auto px-4 -mt-10 relative z-20">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             {[
                 { icon: <Truck size={32}/>, title: "Free Delivery", desc: "On all orders, no minimum value." },
                 { icon: <Clock size={32}/>, title: "Early Access", desc: "Shop sales 24 hours before others." },
                 { icon: <ShieldCheck size={32}/>, title: "Superior Support", desc: "Dedicated 24/7 customer care." },
                 { icon: <Gift size={32}/>, title: "2X Rewards", desc: "Earn double SuperCoins on every order." }
             ].map((benefit, idx) => (
                 <div key={idx} className="bg-white p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow border-t-4 border-yellow-500">
                     <div className="mb-4 text-yellow-600 bg-yellow-50 w-16 h-16 rounded-full flex items-center justify-center">{benefit.icon}</div>
                     <h3 className="text-lg font-bold text-gray-800 mb-2">{benefit.title}</h3>
                     <p className="text-gray-500 text-sm">{benefit.desc}</p>
                 </div>
             ))}
         </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 mt-12">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto space-y-4">
              <div className="bg-white p-4 rounded-sm shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-2">How do I activate membership?</h3>
                  <p className="text-sm text-gray-600">Once you complete the payment of ₹499, your membership is activated instantly and tied to your registered mobile number.</p>
              </div>
              <div className="bg-white p-4 rounded-sm shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-2">Is it refundable?</h3>
                  <p className="text-sm text-gray-600">Membership fees are non-refundable once activated.</p>
              </div>
          </div>
      </div>
    </div>
  );
};

export default PlusScreen;