
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <p className="text-[#e0e0ff]/60 text-sm">
            © 2025 TinyStory.ai
          </p>
          <a href="mailto:tinystoryai2025@gmail.com" className="text-[#e0e0ff]/60 text-sm hover:text-white transition-colors flex items-center">
            <i className="fas fa-envelope mr-2"></i>
            tinystoryai2025@gmail.com
          </a>
        </div>
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <a href="#" className="text-[#e0e0ff]/60 hover:text-white transition-colors"><i className="fab fa-twitter text-xl"></i></a>
          <a href="#" className="text-[#e0e0ff]/60 hover:text-white transition-colors"><i className="fab fa-instagram text-xl"></i></a>
          <a href="#" className="text-[#e0e0ff]/60 hover:text-white transition-colors"><i className="fab fa-facebook text-xl"></i></a>
          <a href="#" className="text-[#e0e0ff]/60 hover:text-white transition-colors"><i className="fab fa-tiktok text-xl"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
