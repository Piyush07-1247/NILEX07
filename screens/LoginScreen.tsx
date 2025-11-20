import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate('/');
    } catch (err: any) {
      // Handle specific Firebase errors for better UX
      if (err.code === 'auth/invalid-credential') {
          setError("Invalid Email or Password");
      } else if (err.code === 'auth/email-already-in-use') {
          setError("User already exists. Please login.");
      } else {
          setError(err.message || "Authentication failed. Please check config.");
          // Fallback for demo if Firebase isn't set up
          console.warn("Auth error (Likely missing config):", err);
          setTimeout(() => navigate('/'), 1000); 
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-offwhite px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-sm shadow-lg max-w-4xl w-full overflow-hidden h-[500px]">
        
        {/* Left Side - Blue Panel */}
        <div className="bg-primary w-full md:w-2/5 p-8 flex flex-col justify-between text-white">
          <div>
            <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Looks like you\'re new here!'}</h2>
            <p className="text-gray-200 text-lg leading-relaxed">
              {isLogin 
                ? 'Get access to your Orders, Wishlist and Recommendations' 
                : 'Sign up with your mobile number to get started'}
            </p>
          </div>
          <div className="mt-auto text-center">
            {/* Illustration Placeholder */}
            <img 
                src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" 
                alt="Login Illustration" 
                className="mx-auto w-3/4"
            />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-3/5 p-8 flex flex-col justify-center bg-white relative">
          <form onSubmit={handleSubmit} className="space-y-6 max-w-sm mx-auto w-full">
            <div className="relative">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-primary transition-colors placeholder-transparent bg-transparent"
                placeholder="Email"
                id="email"
              />
              <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-500 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-500 peer-focus:text-xs">
                Enter Email
              </label>
            </div>

            <div className="relative">
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-primary transition-colors placeholder-transparent bg-transparent"
                placeholder="Password"
                id="password"
              />
              <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-500 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-500 peer-focus:text-xs">
                Enter Password
              </label>
            </div>

            <p className="text-xs text-gray-400">
              By continuing, you agree to Nilex07's <span className="text-primary cursor-pointer">Terms of Use</span> and <span className="text-primary cursor-pointer">Privacy Policy</span>.
            </p>

            {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}

            <button 
                disabled={loading}
                className="w-full bg-accent text-white font-bold py-3 rounded-sm shadow-sm hover:bg-orange-600 transition-colors disabled:opacity-70"
            >
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Continue')}
            </button>

            <div className="text-center mt-4">
                <button 
                    type="button" 
                    onClick={() => {setIsLogin(!isLogin); setError('');}} 
                    className="text-primary font-bold text-sm hover:underline"
                >
                    {isLogin ? "New to Nilex07? Create an account" : "Existing User? Log in"}
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;