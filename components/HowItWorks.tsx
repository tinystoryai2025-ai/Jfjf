import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      icon: 'fa-upload',
      title: 'Upload Photo',
    },
    {
      icon: 'fa-wand-magic-sparkles',
      title: 'Customize Story',
    },
    {
      icon: 'fa-book-open',
      title: 'Generate Book',
    },
  ];

  return (
    <section className="py-20 text-center" data-aos="fade-up">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-16">
          Three Simple Steps to Magic
        </h2>
        <div className="flex flex-col items-center space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center" data-aos="fade-up" data-aos-delay={index * 150}>
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8b46ff] to-[#ff6b9d] flex items-center justify-center mb-4 shadow-lg btn-glow">
                <i className={`fas ${step.icon} text-4xl text-white`}></i>
              </div>
              <p className="text-xl font-bold">
                <span className="text-gradient">Step {index + 1}:</span>{' '}
                <span className="text-white">{step.title}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
