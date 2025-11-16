
import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { QuizQuestion, UserQuizData, QuizOption } from '../types';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnswer: (isCorrect: boolean, questionId: number) => void;
  onAdReward: () => void;
  userQuizData: UserQuizData;
  setUserQuizData: React.Dispatch<React.SetStateAction<UserQuizData>>;
  credits: number;
}

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


const CountdownCircle: React.FC<{ seconds: number }> = ({ seconds }) => {
    const progress = (seconds / 10) * 100;
    const progressColor = '#FF4500'; // Orangered to match the user's screenshot
  
    const style = {
      background: `
        radial-gradient(closest-side, #18181b 88%, transparent 90% 100%),
        conic-gradient(${progressColor} ${progress}%, #4b5563 0)
      `,
    };
  
    return (
      <div
        style={style}
        className="relative w-36 h-36 rounded-full flex items-center justify-center transition-all"
        role="progressbar"
        aria-valuenow={seconds}
        aria-valuemin="0"
        aria-valuemax="10"
      >
        <span className="absolute text-5xl font-bold text-white">
          {seconds}
        </span>
      </div>
    );
};

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, onAnswer, onAdReward, userQuizData, setUserQuizData, credits }) => {
  const [challengeQuizzes, setChallengeQuizzes] = useState<QuizQuestion[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<QuizOption | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeftForNextChallenge, setTimeLeftForNextChallenge] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(10);
  
  const [showAdOverlay, setShowAdOverlay] = useState(false);
  const [adCountdown, setAdCountdown] = useState(5);
  const [adWatchedThisHour, setAdWatchedThisHour] = useState(false);

  const questionTimerRef = useRef<number | null>(null);
  const adTimerRef = useRef<number | null>(null);
  const speechRef = useRef(window.speechSynthesis);

  const adButtonDisabled = useMemo(() => {
    if (adWatchedThisHour) return true;
    const currentHour = getCurrentBHour();
    return userQuizData.lastAdHour === currentHour;
  }, [userQuizData.lastAdHour, adWatchedThisHour]);

  useEffect(() => {
    if (!isOpen) return;

    // Reset session-specific state
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setAdWatchedThisHour(false);
    
    const allQuizzesStr = window.localStorage.getItem('allQuizzes');
    if (!allQuizzesStr) {
      setChallengeQuizzes([]);
      return;
    }
    const allQuizzes: QuizQuestion[] = JSON.parse(allQuizzesStr);

    const currentHour = getCurrentBHour();
    const lastChallengeHour = userQuizData.challenge.hourStarted;
    
    const startNewChallenge = () => {
        const unansweredPool = allQuizzes.filter(q => !userQuizData.progress.answeredIds.includes(q.id));
        const newQuizSelection = unansweredPool.sort(() => 0.5 - Math.random()).slice(0, 4);
        const newQuizIds = newQuizSelection.map(q => q.id);
        
        setUserQuizData(prev => ({
            ...prev,
            challenge: { hourStarted: currentHour, quizIds: newQuizIds, answeredInChallenge: [] }
        }));
        setChallengeQuizzes(newQuizSelection);
    };

    if (currentHour !== lastChallengeHour) {
        startNewChallenge();
    } else {
        // Continue existing challenge
        const remainingQuizIds = userQuizData.challenge.quizIds.filter(id => !userQuizData.challenge.answeredInChallenge.includes(id));
        const remainingQuizzes = remainingQuizIds.map(id => allQuizzes.find(q => q.id === id)).filter(Boolean) as QuizQuestion[];
        setChallengeQuizzes(remainingQuizzes);
        setCurrentQuizIndex(0);
    }

  }, [isOpen, userQuizData.challenge.hourStarted]);

  // Question Timer
  useEffect(() => {
    if (isOpen && !isAnswered && currentQuizIndex < challengeQuizzes.length) {
      setSecondsLeft(10);
      if (questionTimerRef.current) clearInterval(questionTimerRef.current);
      
      questionTimerRef.current = window.setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            if (questionTimerRef.current) clearInterval(questionTimerRef.current);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (questionTimerRef.current) {
        clearInterval(questionTimerRef.current);
    }
    return () => { if (questionTimerRef.current) clearInterval(questionTimerRef.current); };
  }, [isOpen, isAnswered, currentQuizIndex, challengeQuizzes]);

  // Next Challenge Countdown Timer
  useEffect(() => {
    if (!isOpen) return;
    const intervalId = setInterval(() => {
        const nowInBD = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }));
        const nextHour = new Date(nowInBD);
        nextHour.setHours(nowInBD.getHours() + 1, 0, 0, 0);
        const remaining = nextHour.getTime() - nowInBD.getTime();
        
        if (remaining <= 0) {
            setTimeLeftForNextChallenge("00:00");
            clearInterval(intervalId);
            return;
        }
        const minutes = Math.floor((remaining / 1000 / 60) % 60).toString().padStart(2, '0');
        const seconds = Math.floor((remaining / 1000) % 60).toString().padStart(2, '0');
        setTimeLeftForNextChallenge(`${minutes}:${seconds}`);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isOpen]);

  // Ad Timer
  useEffect(() => {
    if (showAdOverlay) {
      if (adTimerRef.current) clearInterval(adTimerRef.current);
      setAdCountdown(5);
      adTimerRef.current = window.setInterval(() => {
        setAdCountdown(prev => {
          if (prev <= 1) {
            if (adTimerRef.current) clearInterval(adTimerRef.current);
            onAdReward();
            setShowAdOverlay(false);
            setAdWatchedThisHour(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (adTimerRef.current) clearInterval(adTimerRef.current); };
  }, [showAdOverlay, onAdReward]);

  const currentQuestion = challengeQuizzes[currentQuizIndex];
  
  const shuffledOptions = useMemo(() => {
    if (!currentQuestion) return [];
    const options = [...currentQuestion.options];
    // Fisher-Yates shuffle
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  }, [currentQuestion]);

  if (!isOpen) return null;

  const processAnswer = (isCorrect: boolean, selectedOption: QuizOption | null) => {
    if (isAnswered || !currentQuestion) return;
    
    if(questionTimerRef.current) clearInterval(questionTimerRef.current);
    
    setIsAnswered(true);
    setSelectedAnswer(selectedOption);
    
    onAnswer(isCorrect, currentQuestion.id);
    
    setTimeout(() => {
      setIsAnswered(false);
      setSelectedAnswer(null);
      setCurrentQuizIndex(prev => prev + 1);
    }, 1500);
  };
  
  const handleAnswerClick = (option: QuizOption) => {
    processAnswer(option.text === currentQuestion.answer, option);
  };

  const handleTimeUp = () => {
    processAnswer(false, null);
  };
  
  const speakQuestion = () => {
    if (speechRef.current && currentQuestion) {
        const utterance = new SpeechSynthesisUtterance(currentQuestion.question);
        speechRef.current.cancel();
        speechRef.current.speak(utterance);
    }
  };

  const getButtonClass = (option: QuizOption) => {
    if (!isAnswered) return 'bg-white/10 border-transparent hover:bg-white/20';
    if (option.text === currentQuestion.answer) return 'bg-green-500/30 border-green-500 animate-pulse';
    if (selectedAnswer && option.text === selectedAnswer.text) return 'bg-red-500/30 border-red-500';
    return 'bg-white/5 border-transparent opacity-50';
  };

  const renderQuizContent = () => {
    if (!challengeQuizzes.length || currentQuizIndex >= challengeQuizzes.length) {
       return (
        <div className="text-center p-8 flex-grow flex flex-col items-center justify-center">
          {userQuizData.challenge.quizIds.length === 0 ? (
            <>
              <i className="fas fa-trophy text-6xl text-yellow-400 mb-4"></i>
              <h3 className="text-white/80 text-2xl font-bold">Wow! You're a Quiz Master!</h3>
              <p className="text-white/60 mt-2">You've answered all available questions. Check back later for new ones!</p>
            </>
          ) : (
            <>
              <i className="fas fa-couch text-6xl text-white/20 mb-4"></i>
              <h3 className="text-white/80 text-2xl font-bold">Great job! All done for now.</h3>
              <p className="text-white/60 mt-2">Next challenge in <span className="font-bold text-gradient">{timeLeftForNextChallenge}</span>.</p>
              <button 
                  onClick={() => setShowAdOverlay(true)} 
                  disabled={adButtonDisabled}
                  className="mt-6 w-full max-w-sm bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold px-6 py-3 rounded-full transition-transform hover:scale-105 btn-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                  <i className="fas fa-video mr-2"></i> {adButtonDisabled ? 'Ad Watched This Hour' : 'Watch Ad for 2 Credits'}
              </button>
            </>
          )}
        </div>
      );
    }

    if (!currentQuestion) {
      return (
        <div className="flex-grow flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-white"></div>
          <p className="ml-4">Loading your next challenge...</p>
        </div>
      );
    }

    return (
        <div className="flex-grow flex flex-col relative">
            <div className="flex justify-between items-center text-sm text-white/70 mb-4">
                <span>Quiz {userQuizData.challenge.answeredInChallenge.length + 1}/{userQuizData.challenge.quizIds.length} this hour</span>
            </div>
            
            <div className="relative bg-white/5 p-4 rounded-lg flex items-center">
                <div className="flex-grow pr-4">
                    <h3 className="text-xl sm:text-2xl font-semibold text-center text-white">{currentQuestion.question}</h3>
                </div>
                <button onClick={speakQuestion} className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white/20 flex-shrink-0">
                    <i className="fas fa-volume-up text-xl"></i>
                </button>
            </div>
            
            <div className="my-auto flex items-center justify-center py-4">
              {isAnswered ? (
                 <div className="text-center transition-opacity duration-300">
                    <p className={`text-3xl font-bold ${
                        selectedAnswer === null ? 'text-orange-400'
                        : selectedAnswer?.text === currentQuestion.answer ? 'text-green-400' 
                        : 'text-red-500'
                    }`}>
                        {selectedAnswer === null ? "Time's Up! ⌛ (-1 credit)"
                        : selectedAnswer?.text === currentQuestion.answer ? 'Correct! 🌟 (+1 credit)' 
                        : 'Incorrect 🤔 (-1 credit)'}
                    </p>
                 </div>
              ) : (
                <CountdownCircle seconds={secondsLeft} />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {shuffledOptions.map((option, index) => (
                  <button key={index} onClick={() => handleAnswerClick(option)} disabled={isAnswered} className={`p-4 rounded-lg transition-all duration-300 border-2 flex flex-col items-center justify-center space-y-2 h-32 text-center ${getButtonClass(option)}`}>
                    <span className="text-5xl">{option.emoji}</span>
                    <span className="font-bold text-white text-lg">{option.text}</span>
                  </button>
              ))}
            </div>
        </div>
    );
  };
  
  const renderAdOverlay = () => (
    <div className="absolute inset-0 bg-black/80 z-30 flex flex-col items-center justify-center text-center p-4 rounded-2xl">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#8b46ff] mb-4"></div>
        <h3 className="text-2xl font-bold text-white">Your reward is loading...</h3>
        <p className="text-white/70 mt-2">You will receive +2 credits in</p>
        <p className="text-5xl font-bold text-gradient mt-2">{adCountdown}</p>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-zinc-900 rounded-2xl border border-white/20 glow-border p-6 w-full max-w-2xl m-4 relative animate-fade-in flex flex-col min-h-[70vh]" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-[#e0e0ff]/70 hover:text-white transition-colors z-20">
          <i className="fas fa-times text-2xl"></i>
        </button>

        <div className="flex justify-between items-center border-b border-white/20 pb-4 mb-4">
            <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Quiz Time!</h2>
                <p className="text-sm text-white/60">Next challenge in: <span className="font-bold text-gradient">{timeLeftForNextChallenge}</span></p>
            </div>
            <div className="text-right bg-black/20 px-4 py-2 rounded-lg">
                <p className="text-xl font-bold text-white">{credits} ✨</p>
                <p className="text-xs text-white/60">Credits</p>
            </div>
        </div>

        {renderQuizContent()}

        {showAdOverlay && renderAdOverlay()}
        
        <style>{`
          @keyframes fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
          .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        `}</style>
      </div>
    </div>
  );
};

export default QuizModal;
