
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MagicParticles from './components/MagicParticles';
import Hero from './components/Hero';
import LoginModal from './components/LoginModal';
import GeneratorForm from './components/GeneratorForm';
import PreviewSection from './components/PreviewSection';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import PaymentModal from './components/PaymentModal';
import QuizModal from './components/QuizModal';
import type { StorybookResult, UserQuizData } from './types';
import HowItWorks from './components/HowItWorks';
import UnlockMagic from './components/UnlockMagic';
import { ALL_QUIZZES } from './quizData';


// Define a type for the selected plan
type PlanDetails = {
  name: string;
  price: number;
};

// Helper to get current hour in Bangladesh
const getCurrentBHour = () => {
    try {
        const dateInBD = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }));
        return dateInBD.getHours();
    } catch (e) {
        // Fallback for environments where Intl is not fully supported
        const now = new Date();
        const utcOffset = now.getTimezoneOffset() / 60;
        const bdOffset = 6;
        now.setHours(now.getHours() + utcOffset + bdOffset);
        return now.getHours();
    }
};


// Custom hook for managing state with localStorage
function useStickyState<T>(defaultValue: T, key:string): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null
        ? JSON.parse(stickyValue)
        : defaultValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}


function App() {
  const [isLoggedIn, setIsLoggedIn] = useStickyState(false, 'isLoggedIn');
  const [userName, setUserName] = useStickyState<string | null>(null, 'userName');
  const [userEmail, setUserEmail] = useStickyState<string | null>(null, 'userEmail');
  const [credits, setCredits] = useStickyState(0, 'credits');
  const [apiKeySelected, setApiKeySelected] = useStickyState(false, 'apiKeySelected');
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginModalView, setLoginModalView] = useState<'login' | 'signup'>('login');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanDetails | null>(null);
  const [generationOutput, setGenerationOutput] = useState<{ result: StorybookResult; theme: string; language: string; } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

  const initialUserQuizData: UserQuizData = {
    progress: { answeredIds: [] },
    challenge: { hourStarted: -1, quizIds: [], answeredInChallenge: [] },
    lastAdHour: null,
  };
  const [userQuizData, setUserQuizData] = useStickyState<UserQuizData>(initialUserQuizData, 'userQuizData');

  useEffect(() => {
    // Preload quizzes into localStorage if they don't exist
    if (!localStorage.getItem('allQuizzes')) {
      const quizzesWithIds = ALL_QUIZZES.map((q, i) => ({ ...q, id: i + 1 }));
      localStorage.setItem('allQuizzes', JSON.stringify(quizzesWithIds));
    }

    // Check API key status on initial load to sync with aistudio
    const checkApiKey = async () => {
      if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (hasKey !== apiKeySelected) {
          setApiKeySelected(hasKey);
        }
      }
    };
    checkApiKey();
  }, []);

  const handleQuizAnswer = (isCorrect: boolean, questionId: number) => {
    setCredits(prev => isCorrect ? prev + 1 : Math.max(0, prev - 1));
    setUserQuizData(prev => ({
      ...prev,
      progress: {
        answeredIds: [...new Set([...prev.progress.answeredIds, questionId])]
      },
      challenge: {
        ...prev.challenge,
        answeredInChallenge: [...new Set([...prev.challenge.answeredInChallenge, questionId])]
      }
    }));
  };

  const handleAdReward = () => {
    const currentHour = getCurrentBHour();
    setCredits(prev => prev + 2);
    setUserQuizData(prev => ({ ...prev, lastAdHour: currentHour }));
  };
  
  const openLoginModal = (view: 'login' | 'signup' = 'login') => {
    setLoginModalView(view);
    setShowLoginModal(true);
  };

  const handleLoginSuccess = (name: string, email: string) => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setCredits(7);
    setUserName(name);
    setUserEmail(email);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCredits(0);
    setUserName(null);
    setUserEmail(null);
    setGenerationOutput(null);
    // This will clear all localStorage for the app
    window.localStorage.clear();
  };

  const handleGenerationComplete = (result: StorybookResult, theme: string, language: string) => {
    setGenerationOutput({ result, theme, language });
    setIsGenerating(false);
    document.getElementById('preview-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePurchaseClick = (planName: string, price: number) => {
    if (isLoggedIn) {
      setSelectedPlan({ name: planName, price });
      setShowPaymentModal(true);
    } else {
      openLoginModal('signup');
    }
  };
  
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#0a0a15] via-[#16213e] to-[#1a1a2e]">
      <MagicParticles />
      <Header 
        isLoggedIn={isLoggedIn} 
        userName={userName}
        onLoginClick={() => openLoginModal('login')}
        onSignupClick={() => openLoginModal('signup')}
        onLogoutClick={handleLogout}
        credits={credits}
        onQuizClick={() => setShowQuizModal(true)}
      />
      <main className="relative z-10 px-4 sm:px-8 md:px-12 lg:px-24">
        {isLoggedIn ? (
          <>
            <div className="text-center pt-32 pb-8" data-aos="fade-in">
              <h1 className="text-4xl font-bold text-white">Welcome, {userName}!</h1>
              <p className="text-white/80 mt-2">You have <span className="text-gradient font-bold">{credits}</span> credits.</p>
              <div className="mt-6 flex items-center justify-center space-x-4">
                  <button 
                      onClick={() => document.getElementById('generator-form-section')?.scrollIntoView({ behavior: 'smooth' })} 
                      className="w-full sm:w-auto bg-gradient-to-r from-[#8b46ff] to-[#ff6b9d] text-white font-semibold px-6 py-3 rounded-full transition-transform hover:scale-105 btn-glow flex items-center justify-center"
                      disabled={isGenerating}
                  >
                      <i className="fas fa-book-open mr-2"></i> Generate Storybook
                  </button>
                  <button 
                      onClick={() => setShowQuizModal(true)}
                      className="w-full sm:w-auto bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold px-6 py-3 rounded-full transition-transform hover:scale-105 btn-glow flex items-center justify-center"
                  >
                      <i className="fas fa-question-circle mr-2"></i> Take a Quiz!
                  </button>
              </div>
            </div>

            <section id="generator-form-section">
                <GeneratorForm 
                  onGenerationStart={() => {
                    setIsGenerating(true);
                    setGenerationOutput(null);
                  }}
                  onGenerationComplete={handleGenerationComplete} 
                  credits={credits}
                  setCredits={setCredits}
                  apiKeySelected={apiKeySelected}
                  setApiKeySelected={setApiKeySelected}
                />
            </section>
            
            {generationOutput && !isGenerating ? (
              <PreviewSection result={generationOutput.result} theme={generationOutput.theme} language={generationOutput.language} />
            ) : (
               !isGenerating && <Pricing onPurchaseClick={handlePurchaseClick} isLoggedIn={isLoggedIn} />
            )}
          </>
        ) : (
          <>
            <Hero onStartCreatingClick={() => openLoginModal('signup')} />
            <HowItWorks />
            <UnlockMagic />
            <Pricing onPurchaseClick={handlePurchaseClick} isLoggedIn={isLoggedIn} />
          </>
        )}
      </main>
      <Footer />
      
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
        initialView={loginModalView}
      />
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        planDetails={selectedPlan}
        userEmail={userEmail}
      />
      {isLoggedIn && (
        <QuizModal
            isOpen={showQuizModal}
            onClose={() => setShowQuizModal(false)}
            onAnswer={handleQuizAnswer}
            onAdReward={handleAdReward}
            userQuizData={userQuizData}
            setUserQuizData={setUserQuizData}
            credits={credits}
        />
      )}
    </div>
  );
}

export default App;
