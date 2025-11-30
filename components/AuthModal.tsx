
import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { X, Mail, Lock, Loader2, AlertCircle, User } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        // Validation
        if (password !== confirmPassword) {
            throw new Error("Passwords do not match");
        }
        if (!fullName.trim()) {
            throw new Error("Please enter your full name");
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
                full_name: fullName,
            }
          }
        });
        
        if (error) throw error;

        // Check if session was created (Auto-confirm ON) or if email verification is needed
        if (data.session) {
            setLoading(false);
            onLoginSuccess?.();
        } else {
            setError("Account created! Please check your email to confirm registration.");
            // Don't close modal, let them read the message
            setLoading(false);
            return;
        }

      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        setLoading(false);
        onLoginSuccess?.();
      }

    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const toggleMode = () => {
      setIsSignUp(!isSignUp);
      setError(null);
      setFullName('');
      setConfirmPassword('');
      setPassword('');
      setEmail('');
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#111]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className="relative bg-[#1a1a1a] border border-[#2F2F2F] w-full max-w-md rounded-3xl p-8 shadow-2xl animate-fade-in-up max-h-[90vh] overflow-y-auto custom-scrollbar">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <h2 className="font-['Syne'] font-bold text-3xl mb-2 text-white">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-400 text-sm">
            {isSignUp ? 'Join ALIGN to start screening candidates.' : 'Sign in to continue to your dashboard.'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
            <div className={`mb-6 border rounded-lg p-3 flex items-start gap-3 ${error.includes('Account created') ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                <AlertCircle className={`mt-0.5 ${error.includes('Account created') ? 'text-green-500' : 'text-red-500'}`} size={16} />
                <p className={`text-xs leading-relaxed ${error.includes('Account created') ? 'text-green-400' : 'text-red-400'}`}>{error}</p>
            </div>
        )}

        {/* Google Button */}
        <button
          onClick={handleGoogleAuth}
          className="w-full bg-white text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors mb-6"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#2F2F2F]"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#1a1a1a] px-2 text-gray-500">Or continue with email</span>
            </div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
            {/* Name Field - Sign Up Only */}
            {isSignUp && (
                <div className="relative group animate-fade-in-up">
                    <User className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-[#FFCB74] transition-colors" size={18} />
                    <input 
                        type="text" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Full Name"
                        className="w-full bg-[#111] border border-[#2F2F2F] rounded-xl py-3 pl-12 pr-4 text-white focus:border-[#FFCB74] outline-none transition-all"
                        required={isSignUp}
                    />
                </div>
            )}

            <div className="relative group">
                <Mail className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-[#FFCB74] transition-colors" size={18} />
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full bg-[#111] border border-[#2F2F2F] rounded-xl py-3 pl-12 pr-4 text-white focus:border-[#FFCB74] outline-none transition-all"
                    required
                />
            </div>

            <div className="relative group">
                <Lock className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-[#FFCB74] transition-colors" size={18} />
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-[#111] border border-[#2F2F2F] rounded-xl py-3 pl-12 pr-4 text-white focus:border-[#FFCB74] outline-none transition-all"
                    required
                    minLength={6}
                />
            </div>

            {/* Confirm Password - Sign Up Only */}
            {isSignUp && (
                <div className="relative group animate-fade-in-up">
                    <Lock className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-[#FFCB74] transition-colors" size={18} />
                    <input 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        className="w-full bg-[#111] border border-[#2F2F2F] rounded-xl py-3 pl-12 pr-4 text-white focus:border-[#FFCB74] outline-none transition-all"
                        required={isSignUp}
                        minLength={6}
                    />
                </div>
            )}

            <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#FFCB74] text-[#111111] font-bold py-3.5 rounded-xl hover:bg-[#eebb55] transition-all flex items-center justify-center gap-2 mt-4"
            >
                {loading ? <Loader2 size={20} className="animate-spin" /> : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
        </form>

        <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <button 
                    onClick={toggleMode}
                    className="ml-2 text-[#FFCB74] font-bold hover:underline"
                >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
