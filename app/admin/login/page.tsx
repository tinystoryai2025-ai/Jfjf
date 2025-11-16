'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@tinystory.ai', password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push(data.redirect || '/admin');
      } else {
        setError(data.message || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0a0a15] via-[#16213e] to-[#1a1a2e] p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 glow-border p-8 sm:p-10 relative">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gradient relative mb-4">
              TinyStory.ai
            </h1>
            <h2 className="text-3xl font-bold text-white">Admin Login</h2>
            <p className="text-white/60 mt-2">Access the control panel.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="font-semibold mb-2 block text-sm text-white/80">Admin Email</label>
              <input 
                type="email" 
                value="admin@tinystory.ai"
                readOnly
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-[#e0e0ff]/70 placeholder-[#e0e0ff]/50 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="font-semibold mb-2 block text-sm text-white/80">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-[#e0e0ff] placeholder-[#e0e0ff]/50 focus:outline-none focus:ring-2 focus:ring-[#8b46ff]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-white/60 hover:text-white"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#8b46ff] to-[#ff6b9d] text-white font-semibold py-3 rounded-lg text-lg transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-wait btn-glow"
            >
              {isLoading ? 'Signing In...' : 'Login as Admin'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}