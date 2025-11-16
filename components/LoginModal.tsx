import React, { FormEvent, useState, useEffect } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (name: string, email: string) => void;
  initialView?: 'login' | 'signup';
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess, initialView = 'login' }) => {
  const [view, setView] = useState<'login' | 'signup' | 'forgotPassword'>('login');
  const [showPassword, setShowPassword] = useState(false);
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    if (isOpen) {
      setView(initialView);
    }
  }, [isOpen, initialView]);
  
  if (!isOpen) return null;

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    const userToSave = {
      email,
      fullName,
      nickname,
      // In a real app, you'd store a hashed password, not the plain text one.
    };
    // Mock user creation by saving to localStorage
    localStorage.setItem(`user_${email}`, JSON.stringify(userToSave));
    onLoginSuccess(nickname || fullName, email);
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // Mock login by checking localStorage
    const storedUser = localStorage.getItem(`user_${email}`);
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      onLoginSuccess(userData.nickname || userData.fullName, email);
    } else {
      // For demonstration, if user doesn't exist, sign them up and log in
      handleSignup(e);
    }
  };
  
  const handleForgotPassword = (e: FormEvent) => {
    e.preventDefault();
    alert(`Password reset link sent to ${email}! (This is a mock action)`);
    onClose();
  };

  const inputClasses = "w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-3 text-[#e0e0ff] placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#8b46ff] caret-red-500";
  
  const renderSocialLogins = () => (
    <>
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-white/20"></div>
        <span className="flex-shrink mx-4 text-[#e0e0ff]/50">OR</span>
        <div className="flex-grow border-t border-white/20"></div>
      </div>
      
      <div className="space-y-4">
        <button onClick={() => alert("Mock Social Login")} className="w-full bg-white/90 text-[#1a1a2e] font-semibold py-3 rounded-lg flex items-center justify-center space-x-3 transition-transform hover:scale-105">
          <i className="fab fa-google"></i>
          <span>Continue with Google</span>
        </button>
        <button onClick={() => alert("Mock Social Login")} className="w-full bg-black text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-3 transition-transform hover:scale-105">
          <i className="fab fa-apple"></i>
          <span>Continue with Apple</span>
        </button>
      </div>
    </>
  );

  const renderLoginView = () => (
    <>
      <h2 className="text-3xl font-bold text-center mb-2 text-white">Welcome Back!</h2>
      <p className="text-center text-[#e0e0ff]/70 mb-8">Let's create some magic.</p>
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <input 
            type="email" 
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
            required
          />
        </div>
        <div className="relative">
          <input 
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClasses}
            required
          />
           <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-white/60 hover:text-white">
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
           </button>
        </div>
        <div className="text-right">
          <button type="button" onClick={() => setView('forgotPassword')} className="text-sm text-[#e0e0ff]/60 hover:text-white transition-colors">Forgot password?</button>
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-[#8b46ff] to-[#ff6b9d] text-white font-semibold py-3 rounded-lg text-lg transition-transform hover:scale-105">
          Continue
        </button>
      </form>
      
      {renderSocialLogins()}
      
      <div className="text-center mt-6 space-y-2">
        <p className="text-sm text-[#e0e0ff]/60">
            Don't have an account? <button onClick={() => setView('signup')} className="font-semibold text-white hover:underline">Sign up</button>
        </p>
         <a href="/admin/login" className="text-sm text-[#e0e0ff]/60 hover:text-white transition-colors">Admin? Login here</a>
      </div>
    </>
  );
  
  const renderSignupView = () => (
     <>
      <h2 className="text-3xl font-bold text-center mb-2 text-white">Create Account</h2>
      <p className="text-center text-[#e0e0ff]/70 mb-8">Join the magic!</p>
      
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <input 
            type="text" 
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={inputClasses}
            required
          />
        </div>
         <div>
          <input 
            type="text" 
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <input 
            type="email" 
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
            required
          />
        </div>
        <div>
          <input 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClasses}
            required
          />
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-[#8b46ff] to-[#ff6b9d] text-white font-semibold py-3 rounded-lg text-lg transition-transform hover:scale-105 btn-glow">
          Create Account
        </button>
      </form>

      {renderSocialLogins()}

      <div className="text-center mt-6">
        <p className="text-sm text-[#e0e0ff]/60">
            Already have an account? <button onClick={() => setView('login')} className="font-semibold text-white hover:underline">Log in</button>
        </p>
      </div>
    </>
  );
  
  const renderForgotPasswordView = () => (
     <>
      <h2 className="text-3xl font-bold text-center mb-2 text-white">Reset Password</h2>
      <p className="text-center text-[#e0e0ff]/70 mb-8">Enter your email to get a reset link.</p>
      
      <form onSubmit={handleForgotPassword} className="space-y-6">
        <div>
          <input 
            type="email" 
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
            required
          />
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-[#8b46ff] to-[#ff6b9d] text-white font-semibold py-3 rounded-lg text-lg transition-transform hover:scale-105">
          Send Reset Link
        </button>
      </form>
       <div className="text-center mt-6">
        <button onClick={() => setView('login')} className="text-sm text-[#e0e0ff]/60 hover:text-white transition-colors">Back to Login</button>
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-zinc-900 rounded-2xl border border-white/20 glow-border p-8 sm:p-10 w-full max-w-md m-4 relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        data-aos="zoom-in"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-[#e0e0ff]/70 hover:text-white transition-colors">
          <i className="fas fa-times text-2xl"></i>
        </button>
        
        {view === 'login' && renderLoginView()}
        {view === 'signup' && renderSignupView()}
        {view === 'forgotPassword' && renderForgotPasswordView()}
        
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        `}</style>
      </div>
    </div>
  );
};

export default LoginModal;
