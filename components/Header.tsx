
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  isLoggedIn: boolean;
  userName: string | null;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogoutClick: () => void;
  credits: number;
  onQuizClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, userName, onLoginClick, onSignupClick, onLogoutClick, credits, onQuizClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const res = await fetch('/api/auth/session');
        if (res.ok) {
          const data = await res.json();
          if (data.isLoggedIn && data.session.role === 'admin') {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        // Not an admin or not logged in as admin
      }
    };
    if(isLoggedIn) checkAdminStatus();
  }, [isLoggedIn]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-2xl border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center space-x-2 group">
              <span className="text-2xl font-bold text-gradient relative">
                TinyStory.ai
                <span className="absolute -right-3 -top-1 text-xl opacity-0 group-hover:opacity-100 transition-opacity animate-[sparkle_4s_ease-in-out_infinite]">✨</span>
              </span>
            </a>
            <style>{`
              @keyframes sparkle {
                0%, 100% { opacity: 0; transform: scale(0.5); }
                15% { opacity: 1; transform: scale(1.2); }
                20% { opacity: 0; transform: scale(0.5); }
              }
            `}</style>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {isAdmin && (
               <a href="/admin/dashboard" className="bg-yellow-500/20 text-yellow-300 font-semibold px-6 py-2 rounded-full transition-all hover:bg-yellow-500/30">
                  Go to Admin Panel
                </a>
            )}
            {isLoggedIn ? (
              <>
                <div className="bg-[#1a1a2e]/50 border border-white/20 rounded-full px-4 py-2 text-sm text-[#e0e0ff]">
                  ✨ {credits} Credits
                </div>
                <button onClick={onQuizClick} className="bg-teal-500/20 text-teal-300 font-semibold px-4 py-2 rounded-full transition-all hover:bg-teal-500/30 text-sm flex items-center space-x-2">
                    <i className="fas fa-question-circle"></i>
                    <span>Quiz Time!</span>
                </button>
                <div className="text-white font-semibold px-6 py-2">
                  Hi, {userName}!
                </div>
                <button onClick={onLogoutClick} className="bg-white/10 text-white font-semibold px-6 py-2 rounded-full transition-all hover:bg-white/20">
                  Logout
                </button>
              </>
            ) : !isAdmin && (
              <>
                <button onClick={onLoginClick} className="bg-white/10 text-white font-semibold px-6 py-2 rounded-full transition-all hover:bg-white/20">
                  Login
                </button>
                <button onClick={onSignupClick} className="bg-gradient-to-r from-[#ff6b9d] to-[#8b46ff] text-white font-semibold px-6 py-2 rounded-full transition-transform hover:scale-105">
                  Sign Up
                </button>
              </>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#e0e0ff] focus:outline-none">
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-20 left-0 w-full bg-black/30 backdrop-blur-xl transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col items-center space-y-4 p-6">
          {isAdmin && (
              <a href="/admin/dashboard" className="bg-yellow-500/20 text-yellow-300 font-semibold px-6 py-2 rounded-full transition-all hover:bg-yellow-500/30 w-full text-center">
                Go to Admin Panel
              {/* FIX: Corrected closing tag from </A> to </Link> to match the opening tag. */}
              </a>
          )}
          {isLoggedIn ? (
            <>
              <div className="bg-[#1a1a2e]/50 border border-white/20 rounded-full px-4 py-2 text-sm text-[#e0e0ff]">
                ✨ {credits} Credits
              </div>
              <div className="text-white font-semibold px-6 py-2">
                  Hi, {userName}!
              </div>
               <button onClick={() => { onQuizClick(); setIsMenuOpen(false); }} className="bg-teal-500/20 text-teal-300 font-semibold px-6 py-2 rounded-full transition-all hover:bg-teal-500/30 w-full">
                  Quiz Time!
                </button>
              <button onClick={() => { onLogoutClick(); setIsMenuOpen(false); }} className="bg-white/10 text-white font-semibold px-6 py-2 rounded-full transition-all hover:bg-white/20 w-full">
                Logout
              </button>
            </>
          ) : !isAdmin && (
             <>
                <button onClick={() => { onLoginClick(); setIsMenuOpen(false); }} className="bg-white/10 text-white font-semibold px-6 py-2 rounded-full transition-all hover:bg-white/20 w-full">
                  Login
                </button>
                <button onClick={() => { onSignupClick(); setIsMenuOpen(false); }} className="bg-gradient-to-r from-[#ff6b9d] to-[#8b46ff] text-white font-semibold px-6 py-2 rounded-full transition-transform hover:scale-105 w-full">
                  Sign Up
                </button>
              </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
