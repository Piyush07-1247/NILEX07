import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Star, Heart, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="bg-white hover:shadow-lg transition-shadow duration-200 rounded-sm overflow-hidden cursor-pointer group flex flex-col border border-transparent hover:border-gray-100">
      <Link to={`/product/${product.id}`} className="relative block h-64 overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <button className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full text-gray-400 hover:text-red-500 transition-colors">
            <Heart size={16} fill="currentColor" className="opacity-0 hover:opacity-100 text-red-500 absolute top-1.5 left-1.5" />
            <Heart size={16} />
        </button>
      </Link>

      <div className="p-3 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="block">
            <p className="text-gray-500 text-xs font-bold uppercase mb-1">{product.category}</p>
            <h3 className="text-sm text-gray-900 mb-1 truncate leading-tight hover:text-primary">{product.name}</h3>
        </Link>

        {/* Rating Badge */}
        <div className="flex items-center gap-2 mb-2">
            <div className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                {product.rating} <Star size={8} fill="white" />
            </div>
            <span className="text-gray-500 text-xs">({product.reviews})</span>
            {product.assured && (
               <div className="ml-auto flex items-center bg-primary/10 px-1.5 py-0.5 rounded border border-blue-100">
                  <ShieldCheck size={10} className="text-primary mr-0.5"/>
                  <span className="text-[10px] font-bold text-primary italic">PAssured</span>
               </div>
            )}
        </div>

        <div className="mt-auto">
          <div className="flex items-center gap-2 flex-wrap">
             <span className="text-base font-bold text-gray-900">₹{product.price}</span>
             <span className="text-xs text-gray-500 line-through">₹{product.mrp}</span>
             <span className="text-xs font-bold text-green-600">{discount}% off</span>
          </div>
          <div className="text-[10px] text-gray-500 mt-1">
              Free delivery
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;