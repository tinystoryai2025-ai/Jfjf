'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: 'fa-tachometer-alt' },
  { name: 'Users', href: '/admin/users', icon: 'fa-users' },
  { name: 'Payment Requests', href: '/admin/payments', icon: 'fa-credit-card' },
  // { name: 'Settings', href: '/admin/settings', icon: 'fa-cog' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still redirect even if API call fails
      router.push('/admin/login');
    }
  };

  return (
    <aside className="w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 flex-shrink-0 p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gradient mb-10 text-center">
          TinyStory.ai
        </h1>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-white/80 hover:bg-white/10 ${pathname.startsWith(item.href) ? 'bg-white/10 text-white' : ''}`}
            >
              <i className={`fas ${item.icon} w-5 text-center`}></i>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-white/80 hover:bg-white/10 w-full"
      >
        <i className="fas fa-sign-out-alt w-5 text-center"></i>
        <span>Logout</span>
      </button>
    </aside>
  );
}