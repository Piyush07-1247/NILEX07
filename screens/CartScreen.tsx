import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { Trash2, Plus, Minus, ShoppingBag, ShieldCheck, MapPin } from 'lucide-react';

const CartScreen: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useAppContext();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const mrpTotal = cart.reduce((sum, item) => sum + (item.mrp * item.quantity), 0);
  const discount = mrpTotal - total;

  if (cart.length === 0) {
    return (
      <div className="bg-white p-8 text-center shadow-sm rounded-sm min-h-[60vh] flex flex-col items-center justify-center">
        <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="Empty Cart" className="w-48 mb-4" />
        <h2 className="text-lg font-bold text-gray-800 mb-2">Missing Cart items?</h2>
        <p className="text-sm text-gray-500 mb-6">Login to see the items you added previously</p>
        <Link 
          to="/" 
          className="px-12 py-3 bg-accent text-white shadow-md rounded-sm font-bold text-sm"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Left: Cart Items */}
      <div className="flex-grow space-y-4">
        <div className="bg-white shadow-sm rounded-sm overflow-hidden">
             <div className="p-3 md:p-4 border-b border-gray-100 flex justify-between items-center">
                 <h3 className="font-semibold text-gray-800">My Cart ({cart.length})</h3>
                 <div className="flex items-center gap-1 text-xs text-gray-600">
                     <MapPin size={14} className="text-primary"/> Deliver to <span className="font-bold text-gray-900">Bangalore - 560001</span>
                 </div>
             </div>

            {cart.map(item => (
                <div key={`${item.id}-${item.selectedSize}`} className="p-4 border-b border-gray-100 last:border-0 flex flex-col sm:flex-row gap-4">
                    <div className="w-20 h-24 flex-shrink-0 mx-auto sm:mx-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    
                    <div className="flex-grow space-y-1 text-center sm:text-left">
                        <h3 className="font-medium text-gray-900 truncate max-w-md">{item.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">Size: <span className="font-bold text-gray-800">{item.selectedSize}</span></p>
                        <p className="text-xs text-gray-500">Seller: NilexRetail <span className="bg-primary text-white px-1 rounded text-[10px] ml-1 font-bold">Assured</span></p>
                        
                        <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                            <span className="text-xs text-gray-500 line-through">₹{item.mrp}</span>
                            <span className="font-bold text-lg text-gray-900">₹{item.price}</span>
                            <span className="text-xs font-bold text-green-600">{Math.round(((item.mrp - item.price)/item.mrp)*100)}% Off</span>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between items-center sm:items-end min-w-[120px]">
                         <div className="text-[10px] text-gray-500 mb-2">Delivery by Thu Mar 28 | <span className="text-green-600">Free</span></div>
                    </div>
                </div>
            ))}
             
            {/* Cart Actions separate loop for simplicity in this layout, or keep integrated */}
            {cart.map(item => (
                 <div key={`action-${item.id}-${item.selectedSize}`} className="px-4 py-3 flex items-center gap-4 sm:gap-8 border-t border-gray-50 justify-center sm:justify-start">
                     <div className="flex items-center gap-2">
                        <button 
                            onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                            className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:border-primary font-bold text-gray-600 disabled:opacity-50"
                            disabled={item.quantity <= 1}
                        >
                            <Minus size={12} />
                        </button>
                        <div className="w-10 text-center border border-gray-200 py-0.5 text-sm font-bold">{item.quantity}</div>
                        <button 
                            onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                            className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:border-primary font-bold text-gray-600"
                        >
                            <Plus size={12} />
                        </button>
                     </div>
                     <button className="font-bold text-sm text-gray-800 hover:text-primary uppercase">Save for later</button>
                     <button 
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        className="font-bold text-sm text-gray-800 hover:text-red-500 uppercase"
                     >
                        Remove
                     </button>
                 </div>
            ))}

        </div>
        
        <div className="bg-white p-4 shadow-sm rounded-sm flex items-center justify-between">
            <div className="text-sm font-bold text-gray-800">Order confirmation email will be sent to <span className="italic">user@example.com</span></div>
            <button className="text-primary border border-gray-200 px-4 py-2 font-bold text-xs rounded-sm uppercase">Update</button>
        </div>
      </div>

      {/* Right: Price Details */}
      <div className="lg:w-[320px] flex-shrink-0 h-fit sticky top-20">
        <div className="bg-white shadow-sm rounded-sm">
          <div className="p-4 border-b border-gray-100">
             <h3 className="text-gray-500 font-bold text-base uppercase">Price Details</h3>
          </div>
          
          <div className="p-4 space-y-4 text-base">
             <div className="flex justify-between">
                 <span>Price ({cart.length} items)</span>
                 <span>₹{mrpTotal}</span>
             </div>
             <div className="flex justify-between text-green-600">
                 <span>Discount</span>
                 <span>- ₹{discount}</span>
             </div>
             <div className="flex justify-between text-green-600">
                 <span>Delivery Charges</span>
                 <span>Free</span>
             </div>
             <div className="border-t border-dashed border-gray-200 my-2"></div>
             <div className="flex justify-between font-bold text-lg">
                 <span>Total Amount</span>
                 <span>₹{total}</span>
             </div>
          </div>

          <div className="p-4 border-t border-gray-100 text-green-600 font-bold text-sm">
              You will save ₹{discount} on this order
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 text-gray-500 text-xs p-2">
            <ShieldCheck size={32} className="text-gray-400"/>
            <p>Safe and Secure Payments. Easy returns. 100% Authentic products.</p>
        </div>

        <div className="mt-4 p-4 bg-white shadow-sm rounded-sm">
            <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-accent text-white py-3.5 rounded-sm font-bold text-base shadow-sm uppercase hover:shadow-md transition-shadow"
            >
                Place Order
            </button>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;