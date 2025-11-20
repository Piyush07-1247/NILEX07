import React, { useState, useMemo } from 'react';
import { useAppContext } from '../App';
import ProductCard from '../components/ProductCard';

const CATEGORIES_NAV = [
    { name: 'Formal', img: 'https://images.unsplash.com/photo-1620012253295-c15cc3fe5d3d?q=80&w=200&auto=format&fit=crop' },
    { name: 'Casual', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=200&auto=format&fit=crop' },
    { name: 'Party', img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=200&auto=format&fit=crop' },
    { name: 'Summer', img: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=200&auto=format&fit=crop' },
    { name: 'Denim', img: 'https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?q=80&w=200&auto=format&fit=crop' },
];

const HomeScreen: React.FC = () => {
  const { products } = useAppContext();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return products;
    return products.filter(p => p.category === activeCategory);
  }, [products, activeCategory]);

  return (
    <div className="space-y-4">
      
      {/* Categories Nav - Horizontal Scroll */}
      <div className="bg-white shadow-sm p-3 md:p-4 flex overflow-x-auto gap-6 md:gap-10 items-center justify-start md:justify-center no-scrollbar rounded-sm">
        <button onClick={() => setActiveCategory('All')} className="flex flex-col items-center gap-2 min-w-[60px] cursor-pointer group">
             <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-blue-50 flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-primary transition-all">
                 <span className="text-xs font-bold text-primary">ALL</span>
             </div>
             <span className={`text-xs font-bold ${activeCategory === 'All' ? 'text-primary' : 'text-gray-700'}`}>All</span>
        </button>
        {CATEGORIES_NAV.map((cat) => (
             <button key={cat.name} onClick={() => setActiveCategory(cat.name)} className="flex flex-col items-center gap-2 min-w-[60px] cursor-pointer group">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gray-100 overflow-hidden border-2 border-transparent group-hover:border-primary transition-all">
                    <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <span className={`text-xs font-bold ${activeCategory === cat.name ? 'text-primary' : 'text-gray-700'}`}>{cat.name}</span>
             </button>
        ))}
      </div>

      {/* Banner */}
      <div className="relative w-full h-32 md:h-64 bg-gray-200 overflow-hidden rounded-sm">
        <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80" 
            alt="Sale Banner" 
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-6 md:px-12">
            <div className="text-white">
                <p className="text-yellow-400 font-bold mb-1 uppercase tracking-widest text-xs md:text-sm">Season End Sale</p>
                <h2 className="text-2xl md:text-4xl font-bold mb-2">Men's Collection</h2>
                <p className="text-sm md:text-lg mb-4 opacity-90">Flat 40-60% Off on Top Brands</p>
                <button onClick={() => setActiveCategory('All')} className="bg-white text-black px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-wide hover:bg-gray-100">Shop Now</button>
            </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="bg-white p-4 shadow-sm rounded-sm">
        <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
             <h2 className="text-lg md:text-xl font-bold text-gray-800">
                {activeCategory === 'All' ? 'Best of Shirts' : `${activeCategory} Shirts`}
             </h2>
             <button 
                onClick={() => setActiveCategory('All')}
                className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-sm shadow-sm hover:bg-blue-700"
             >
                 VIEW ALL
             </button>
        </div>

        {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
            </div>
        ) : (
            <div className="text-center py-20 text-gray-500">
                <p>No products found in this category.</p>
                <button onClick={() => setActiveCategory('All')} className="text-primary font-bold text-sm mt-2">Show All Products</button>
            </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;