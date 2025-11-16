
import React from 'react';

interface HeroProps {
  onStartCreatingClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartCreatingClick }) => {
  return (
    <section className="min-h-screen flex items-center justify-center text-center pt-20" data-aos="fade-up">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight text-white mb-6">
          Your child becomes the <span className="text-gradient">hero</span> in 30 seconds
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-[#e0e0ff]/80 mb-10">
          Upload one photo → AI creates a cartoon version + magical storybook in any language
        </p>
        <button 
          onClick={onStartCreatingClick}
          className="text-xl md:text-2xl font-bold text-white bg-gradient-to-r from-[#8b46ff] to-[#ff6b9d] px-12 py-5 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 btn-glow animate-pulse">
          Start Creating Free
        </button>
      </div>
    </section>
  );
};

export default Hero;
