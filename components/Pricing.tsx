import React from 'react';

const PricingCard: React.FC<{
  title: string;
  price: string;
  priceDescription: string;
  features: string[];
  popular?: boolean;
  onChoosePlan: () => void;
}> = ({ title, price, priceDescription, features, popular, onChoosePlan }) => (
  <div className={`relative bg-[#161a38] rounded-2xl border border-slate-700 p-8 flex flex-col text-center transition-transform duration-300 card-glow overflow-hidden ${popular ? 'border-[#8b46ff]' : ''}`} data-aos="fade-up">
    {popular && (
        <div className="absolute top-0 right-0 h-24 w-24">
         <div className="absolute transform rotate-45 bg-gradient-to-r from-[#ff6b9d] to-[#8b46ff] text-center text-white font-semibold py-1 right-[-45px] top-[25px] w-[150px] text-sm">
          POPULAR
        </div>
      </div>
    )}

    <div className="flex-grow">
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <div className="flex items-baseline justify-center mb-4">
        <span className="text-6xl font-black text-white">${price}</span>
        <span className="text-lg text-[#e0e0ff]/70 ml-1">{priceDescription}</span>
      </div>
      
      <ul className="space-y-2 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start justify-center">
            <i className="fas fa-check-circle text-purple-500 mt-1 mr-3"></i>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
    
    <button 
      onClick={onChoosePlan} 
      className="w-full font-bold py-4 rounded-xl text-lg transition-all duration-300 bg-gradient-to-r from-[#8b46ff] to-[#ff6b9d] text-white hover:scale-105 btn-glow"
    >
      Choose Plan
    </button>
  </div>
);


const Pricing: React.FC<{ onPurchaseClick: (planName: string, price: number) => void; isLoggedIn?: boolean }> = ({ onPurchaseClick, isLoggedIn = false }) => {
  const allPlans = [
    {
      name: "Free",
      price: "0",
      priceDescription: "/mo",
      features: [
        '7 credits',
        'Up to 8 pages',
        'Standard illustrations',
        'All languages'
      ],
      priceValue: 0,
    },
    {
      name: "Starter",
      price: "0.99",
      priceDescription: "one-time",
      features: [
        '300 credits',
        'Up to 20 pages',
        'High-quality illustrations',
        'No watermark'
      ],
      priceValue: 0.99,
    },
    {
      name: "Pro",
      price: "3.99",
      priceDescription: "/mo",
      features: [
        '1000 credits/month',
        'Up to 25 pages',
        'High-quality illustrations',
        'Download as PDF',
        'No watermark'
      ],
      popular: true,
      priceValue: 3.99,
    },
    {
      name: "Family",
      price: "9.99",
      priceDescription: "/mo",
      features: [
        'Unlimited credits',
        'Up to 50 pages',
        '4K illustrations',
        'Priority queue',
        'Share with 5 members'
      ],
      priceValue: 9.99,
    }
  ];

  const plans = isLoggedIn ? allPlans.filter(plan => plan.priceValue > 0) : allPlans;

  const gridClasses = isLoggedIn
    ? "grid-cols-1 lg:grid-cols-3"
    : "grid-cols-1 md:grid-cols-2 xl:grid-cols-4";

  return (
    <section className="py-20">
      <div className={`grid ${gridClasses} gap-8 max-w-7xl mx-auto`}>
        {plans.map(plan => (
          <PricingCard 
            key={plan.name}
            title={plan.name}
            price={plan.price}
            priceDescription={plan.priceDescription}
            features={plan.features}
            popular={plan.popular}
            onChoosePlan={() => onPurchaseClick(plan.name, plan.priceValue)}
          />
        ))}
      </div>
    </section>
  );
};

export default Pricing;