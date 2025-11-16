
import React, { useState } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planDetails: { name: string; price: number } | null;
  userEmail: string | null;
}

const PaymentOption: React.FC<{ name: string; icon: string; isActive: boolean; onClick: () => void }> = ({ name, icon, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all w-full text-left ${isActive ? 'bg-white/20' : 'bg-transparent hover:bg-white/10'}`}
  >
    <i className={`${icon} text-2xl w-8 text-center ${isActive ? 'text-[#ff6b9d]' : 'text-[#e0e0ff]/70'}`}></i>
    <span className="font-semibold">{name}</span>
  </button>
);

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, planDetails, userEmail }) => {
  const [activeTab, setActiveTab] = useState<'paypal' | 'binance' | 'payoneer' | 'webmoney'>('paypal');
  const [paymentSent, setPaymentSent] = useState(false);
  const [txId, setTxId] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleModalClose = () => {
    onClose();
    // Delay resetting state to avoid flash of content
    setTimeout(() => {
        setPaymentSent(false);
        setTxId('');
        setError('');
    }, 300);
  }

  const handlePaymentSent = async () => {
    if (!txId.trim()) {
        setError('Please enter a valid Transaction ID.');
        return;
    }
    if (!planDetails || !userEmail) {
        setError('An error occurred. Missing user or plan details.');
        return;
    }
    setError('');

    // In a real app, this would be a fetch call to your backend API
    try {
        console.log("Submitting payment request:", {
            userEmail,
            plan: planDetails.name,
            amount: planDetails.price,
            method: activeTab,
            txId,
        });
        // const response = await fetch('/api/payment-request', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ ... })
        // });
        // if (!response.ok) throw new Error('Failed to submit request');
        
        setPaymentSent(true);
        setTimeout(() => {
            handleModalClose();
        }, 4000);

    } catch (err) {
        setError('Failed to submit payment request. Please try again.');
    }
  }

  const renderContent = () => {
    if (paymentSent) {
      return (
        <div className="text-center p-8 flex flex-col items-center justify-center h-full">
            <i className="fas fa-check-circle text-6xl text-green-400 mb-4 animate-pulse"></i>
            <h3 className="text-2xl font-bold text-white">Payment Submitted</h3>
            <p className="text-[#e0e0ff]/80 mt-2">
                Thank you! Our team will verify your payment and add the credits to your account within 24 hours.
            </p>
        </div>
      );
    }
    
    let content;
    switch (activeTab) {
      case 'paypal':
        content = (
          <div className="space-y-4 text-center">
            <p className="text-sm text-[#e0e0ff]/80">Send payment to the following PayPal email.</p>
            <div className="bg-white/5 p-3 rounded-lg">
              <span className="font-mono text-lg text-gradient">payment@tinystory.ai</span>
            </div>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=payment@tinystory.ai" alt="PayPal QR Code" className="mx-auto rounded-lg border-4 border-white/10"/>
          </div>
        );
        break;
      case 'binance':
        content = (
           <div className="space-y-4 text-center">
            <p className="text-sm text-[#e0e0ff]/80">Send to the following Binance Pay ID/Email.</p>
            <div className="bg-white/5 p-3 rounded-lg">
              <span className="font-mono text-lg text-gradient">shoscho30@gmail.com</span>
            </div>
            <i className="fas fa-wallet text-8xl text-white/20 my-8"></i>
          </div>
        );
        break;
      case 'payoneer':
        content = (
          <div className="space-y-4 text-center">
            <p className="text-sm text-[#e0e0ff]/80">Send payment to the following Payoneer account email.</p>
            <div className="bg-white/5 p-3 rounded-lg">
              <span className="font-mono text-lg text-gradient">payment.payoneer@tinystory.ai</span>
            </div>
            <i className="fas fa-envelope-open-text text-8xl text-white/20 my-8"></i>
          </div>
        );
        break;
      case 'webmoney':
        content = (
          <div className="space-y-4 text-center">
            <p className="text-sm text-[#e0e0ff]/80">Send payment to the following WebMoney Z-Purse.</p>
            <div className="bg-white/5 p-3 rounded-lg">
              <span className="font-mono text-lg text-gradient">Z171353586932</span>
            </div>
            <i className="fas fa-wallet text-8xl text-white/20 my-8"></i>
          </div>
        );
        break;
      default:
        content = <div>Select a payment option.</div>;
    }

    return (
        <>
            {content}
            <div className="mt-6 space-y-4">
                 <input 
                   type="text" 
                   value={txId}
                   onChange={(e) => setTxId(e.target.value)}
                   placeholder="Enter Transaction ID or Reference"
                   className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-[#e0e0ff] placeholder-[#e0e0ff]/50 focus:outline-none focus:ring-2 focus:ring-[#8b46ff]"
                   required
                 />
                 {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                <button onClick={handlePaymentSent} className="w-full bg-gradient-to-r from-[#8b46ff] to-[#ff6b9d] text-white font-semibold py-3 rounded-lg text-lg transition-transform hover:scale-105">
                    I Have Paid
                </button>
            </div>
        </>
    )
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={handleModalClose}>
      <div
        className="bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 glow-border w-full max-w-3xl m-4 relative animate-fade-in flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        data-aos="zoom-in"
      >
        {/* Left Sidebar */}
        <div className="p-6 border-b md:border-b-0 md:border-r border-white/20 bg-black/10 flex-shrink-0 md:w-64">
            <h2 className="text-2xl font-bold text-white mb-2">Purchase Credits</h2>
            {planDetails && (
                <div className="mb-6 text-center md:text-left">
                    <p className="text-lg font-bold text-gradient">{planDetails.name}</p>
                    <p className="text-2xl font-black text-white">${planDetails.price.toFixed(2)}</p>
                </div>
            )}
            <div className="space-y-2">
                <PaymentOption name="PayPal" icon="fab fa-paypal" isActive={activeTab === 'paypal'} onClick={() => setActiveTab('paypal')} />
                <PaymentOption name="Binance Pay" icon="fas fa-coins" isActive={activeTab === 'binance'} onClick={() => setActiveTab('binance')} />
                <PaymentOption name="Payoneer" icon="fas fa-credit-card" isActive={activeTab === 'payoneer'} onClick={() => setActiveTab('payoneer')} />
                <PaymentOption name="WebMoney" icon="fas fa-globe" isActive={activeTab === 'webmoney'} onClick={() => setActiveTab('webmoney')} />
            </div>
             <p className="text-xs text-[#e0e0ff]/50 mt-8">
              After payment, submit the transaction details. Credits will be added manually by an admin after verification.
            </p>
        </div>
        
        {/* Right Content */}
        <div className="md:col-span-2 p-8 flex-grow flex flex-col">
            <button onClick={handleModalClose} className="absolute top-4 right-4 text-[#e0e0ff]/70 hover:text-white transition-colors z-10">
              <i className="fas fa-times text-2xl"></i>
            </button>
            <div className="flex-grow flex flex-col justify-center">
              {renderContent()}
            </div>
        </div>

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

export default PaymentModal;
