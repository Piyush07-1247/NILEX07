import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Search, ChevronDown, LogOut, User as UserIcon } from 'lucide-react';

const Navbar: React.FC = () => {
  const { cart } = useAppContext();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <nav className="bg-primary shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-[64px] flex items-center gap-4 md:gap-8 max-w-7xl">
        
        {/* Logo */}
        <Link to="/" className="flex flex-col items-end group shrink-0">
          <span className="text-xl md:text-2xl font-bold text-white italic tracking-tighter leading-none">
            Nilex<span className="text-yellow-400">07</span>
          </span>
          <span className="text-[10px] text-gray-200 italic font-medium hover:underline flex items-center leading-none">
            Explore <span className="text-yellow-400 font-bold ml-0.5">Plus</span>
            <span className="ml-0.5 text-yellow-400 text-xs">✦</span>
          </span>
        </Link>

        {/* Search Bar */}
        <div className="flex-grow relative max-w-xl hidden sm:block">
          <form onSubmit={handleSearch}>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for products, brands and more" 
              className="w-full py-2 px-4 pr-10 rounded-sm text-sm focus:outline-none shadow-sm text-gray-700"
            />
            <button type="submit" className="absolute right-0 top-0 h-full px-3 text-primary hover:text-blue-700">
              <Search size={18} />
            </button>
          </form>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6 md:gap-8">
          
          {/* Login Button or User Menu */}
          {user ? (
            <div className="hidden md:flex items-center gap-1 text-white cursor-pointer group relative">
               <span className="font-bold text-sm truncate max-w-[100px]">{user.displayName || user.email?.split('@')[0]}</span>
               <ChevronDown size={14} />
               
               <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-sm py-1 hidden group-hover:block text-gray-800 z-50">
                  <div className="px-4 py-2 hover:bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                    <UserIcon size={14}/> My Profile
                  </div>
                  <Link to="/plus" className="px-4 py-2 hover:bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                     <span className="text-yellow-600 text-lg">✦</span> Nilex Plus Zone
                  </Link>
                  <button onClick={() => logout()} className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2">
                    <LogOut size={14}/> Logout
                  </button>
               </div>
            </div>
          ) : (
            <Link to="/login">
                <button className="bg-white text-primary px-8 py-1 font-bold text-sm shadow-sm hover:bg-primary hover:text-white border border-white transition-colors hidden md:block rounded-sm">
                Login
                </button>
            </Link>
          )}

          <div className="hidden md:flex items-center text-white font-semibold text-sm cursor-pointer gap-1 group">
            <span>More</span>
            <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
          </div>

          {/* Cart */}
          <Link to="/cart" className="flex items-center text-white font-semibold text-sm gap-2 group">
            <div className="relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-primary">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="hidden md:inline">Cart</span>
          </Link>
        </div>
      </div>
      
      {/* Mobile Search Bar (Below header) */}
      <div className="sm:hidden bg-primary pb-2 px-2">
         <div className="relative bg-white rounded-sm flex items-center">
            <button className="p-2 text-gray-500"><Search size={16}/></button>
            <input 
              type="text" 
              placeholder="Search for products" 
              className="w-full py-2 pr-4 text-sm focus:outline-none"
            />
         </div>
      </div>
    </nav>
  );
};

export default Navbar;