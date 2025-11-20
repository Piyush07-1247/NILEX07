import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { ShoppingCart, Zap, Star, Tag, MapPin, ChevronRight, ShieldCheck } from 'lucide-react';

const ProductScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart } = useAppContext();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [pincode, setPincode] = useState('');
  const [isPincodeChecked, setIsPincodeChecked] = useState(false);

  const product = products.find(p => p.id === id);

  if (!product) return <div>Product not found</div>;

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const handleAddToCart = () => {
    if (!selectedSize) {
        alert('Please select a size');
        return;
    }
    addToCart(product, selectedSize);
    navigate('/cart');
  };

  return (
    <div className="bg-white rounded-sm shadow-sm overflow-hidden min-h-[80vh]">
      <div className="flex flex-col md:flex-row">
        {/* Left: Image & Buttons */}
        <div className="md:w-5/12 p-4 border-r border-gray-100 relative">
           <div className="aspect-[4/5] w-full max-w-sm mx-auto border border-gray-100 relative mb-4">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute top-2 right-2 bg-white shadow rounded-full p-2 text-gray-400 cursor-pointer hover:text-red-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </div>
           </div>
           
           <div className="flex gap-2 justify-center max-w-sm mx-auto">
               <button 
                onClick={handleAddToCart}
                className="flex-1 py-3.5 bg-yellow-400 text-white font-bold uppercase text-sm md:text-base flex items-center justify-center gap-2 hover:shadow-md transition-shadow"
               >
                   <ShoppingCart size={20} fill="white" /> Add to Cart
               </button>
               <button 
                onClick={() => {
                    if(!selectedSize) { alert('Please select a size'); return;}
                    addToCart(product, selectedSize);
                    navigate('/checkout');
                }}
                className="flex-1 py-3.5 bg-accent text-white font-bold uppercase text-sm md:text-base flex items-center justify-center gap-2 hover:shadow-md transition-shadow"
               >
                   <Zap size={20} fill="white" /> Buy Now
               </button>
           </div>
        </div>

        {/* Right: Details */}
        <div className="md:w-7/12 p-4 md:p-6">
            <div className="text-gray-500 text-sm hover:text-primary cursor-pointer mb-1">Home &gt; Clothing &gt; Men's Clothing &gt; Shirts</div>
            <h1 className="text-lg md:text-xl font-normal text-gray-900 mb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-sm flex items-center gap-1">
                    {product.rating} <Star size={10} fill="white" />
                </div>
                <span className="text-gray-500 text-sm font-bold">{product.reviews} Ratings & Reviews</span>
                {product.assured && (
                    <div className="flex items-center bg-primary/10 px-2 py-0.5 rounded border border-blue-100">
                        <ShieldCheck size={14} className="text-primary mr-1"/>
                        <span className="text-xs font-bold text-primary italic">PAssured</span>
                    </div>
                )}
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mb-4">
                <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                <span className="text-gray-500 line-through">₹{product.mrp}</span>
                <span className="text-green-600 font-bold text-sm">{discount}% off</span>
            </div>

            {/* Offers */}
            <div className="mb-6">
                <h3 className="text-sm font-bold mb-2">Available offers</h3>
                <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-800">
                        <Tag size={16} className="text-green-600 mt-0.5 shrink-0" />
                        <span><span className="font-bold">Bank Offer</span> 5% Unlimited Cashback on Nilex Axis Bank Credit Card</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-800">
                        <Tag size={16} className="text-green-600 mt-0.5 shrink-0" />
                        <span><span className="font-bold">Special Price</span> Get extra 10% off (price inclusive of discount)</span>
                    </li>
                </ul>
            </div>

            {/* Size */}
            <div className="mb-6">
                <div className="flex items-center justify-between w-full max-w-xs mb-2">
                    <h3 className="text-sm font-bold text-gray-500">Select Size</h3>
                    <span className="text-sm font-bold text-primary cursor-pointer">Size Chart</span>
                </div>
                <div className="flex gap-3">
                    {product.sizes.map(s => (
                        <button
                            key={s}
                            onClick={() => setSelectedSize(s)}
                            className={`w-12 h-12 rounded-sm border-2 flex items-center justify-center font-bold text-sm transition-colors ${
                                selectedSize === s 
                                ? 'border-primary text-primary bg-blue-50' 
                                : 'border-gray-300 text-gray-900 hover:border-primary'
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
                {selectedSize && <p className="text-green-600 text-xs mt-2 font-bold">Size {selectedSize} selected</p>}
            </div>

            {/* Pincode */}
            <div className="mb-6 max-w-sm">
                 <h3 className="text-sm font-bold text-gray-500 mb-2">Delivery</h3>
                 <div className="flex border-b-2 border-primary pb-1">
                    <MapPin size={18} className="text-gray-400 mr-2" />
                    <input 
                        type="text" 
                        placeholder="Enter Delivery Pincode" 
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => {setPincode(e.target.value); setIsPincodeChecked(false);}}
                        className="flex-1 text-sm outline-none font-bold text-gray-800 placeholder-gray-400"
                    />
                    <button 
                        onClick={() => pincode.length === 6 && setIsPincodeChecked(true)}
                        className="text-sm font-bold text-primary"
                    >
                        Check
                    </button>
                 </div>
                 {isPincodeChecked && (
                     <div className="text-xs mt-2">
                         <p className="font-bold text-gray-800">Delivery by {new Date(Date.now() + 4 * 86400000).toLocaleDateString('en-IN', {weekday: 'short', day: 'numeric', month: 'short'})} <span className="text-green-600">| Free</span></p>
                     </div>
                 )}
            </div>

            {/* Description */}
            <div className="border-t border-gray-100 pt-4">
                 <div className="flex items-center justify-between mb-2">
                     <h3 className="text-lg font-bold">Product Details</h3>
                     <ChevronRight className="text-gray-400" />
                 </div>
                 <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;