import React, { useState, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import ConfirmPaymentScreen from './screens/ConfirmPaymentScreen';
import AdminScreen from './screens/AdminScreen';
import LoginScreen from './screens/LoginScreen';
import PlusScreen from './screens/PlusScreen';
import { AuthProvider } from './context/AuthContext';
import { Product, CartItem } from './types';
import { INITIAL_PRODUCTS } from './constants';

// Context for Cart Management
interface AppContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  clearCart: () => void;
  updateQuantity: (productId: string, size: string, delta: number) => void;
  products: Product[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);

  const addToCart = (product: Product, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item =>
          (item.id === product.id && item.selectedSize === size) 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.selectedSize === size)));
  };

  const updateQuantity = (productId: string, size: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId && item.selectedSize === size) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  return (
    <AuthProvider>
      <AppContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity, products }}>
        <HashRouter>
          <div className="min-h-screen bg-offwhite text-gray-900 font-sans flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-2 sm:px-4 py-4 max-w-7xl">
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/plus" element={<PlusScreen />} />
                <Route path="/product/:id" element={<ProductScreen />} />
                <Route path="/cart" element={<CartScreen />} />
                <Route path="/checkout" element={<CheckoutScreen />} />
                <Route path="/confirm-payment" element={<ConfirmPaymentScreen />} />
                <Route path="/admin" element={<AdminScreen />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <footer className="bg-[#172337] text-white py-10 text-sm mt-auto">
              <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                      <h3 className="text-gray-400 text-xs font-bold mb-4 uppercase">About</h3>
                      <p>Contact Us</p>
                      <p>About Us</p>
                      <p>Careers</p>
                  </div>
                  <div>
                      <h3 className="text-gray-400 text-xs font-bold mb-4 uppercase">Help</h3>
                      <p>Payments</p>
                      <p>Shipping</p>
                      <p>Cancellation</p>
                  </div>
                  <div>
                      <h3 className="text-gray-400 text-xs font-bold mb-4 uppercase">Social</h3>
                      <p>Facebook</p>
                      <p>Twitter</p>
                      <p>Instagram</p>
                  </div>
                  <div className="border-l border-gray-600 pl-6">
                      <h3 className="text-gray-400 text-xs font-bold mb-4 uppercase">Mail Us:</h3>
                      <p>Nilex07 Store,</p>
                      <p>Building 123, Tech Park,</p>
                      <p>Bangalore, 560001</p>
                  </div>
              </div>
              <div className="text-center mt-10 pt-6 border-t border-gray-700">
                  &copy; {new Date().getFullYear()} Nilex07. All rights reserved.
              </div>
            </footer>
          </div>
        </HashRouter>
      </AppContext.Provider>
    </AuthProvider>
  );
};

export default App;