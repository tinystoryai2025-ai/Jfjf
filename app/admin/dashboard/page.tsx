import React from 'react';
import UsersClient from '@/components/admin/UsersClient';
import PaymentsClient from '@/components/admin/PaymentsClient';
import type { User, PaymentRequest } from '@/types';

// Mock data fetching functions
async function getUsers(): Promise<User[]> {
    return [
        // FIX: Replaced the incorrect `status` property with `isBanned` to match the `User` type and resolve TypeScript errors.
        { id: '1', name: 'Alice', email: 'alice@example.com', plan: 'Dreamer', credits: 55, joinedAt: new Date('2023-10-28'), isBanned: false },
        { id: '2', name: 'Bob', email: 'bob@example.com', plan: 'Free', credits: 2, joinedAt: new Date('2023-10-27'), isBanned: false },
        { id: '3', name: 'Charlie', email: 'charlie@example.com', plan: 'Legend', credits: 150, joinedAt: new Date('2023-10-26'), isBanned: true },
    ];
}

async function getPaymentRequests(): Promise<PaymentRequest[]> {
    return [
        { id: 'req1', user: { name: 'Alice', email: 'alice@example.com'}, plan: 'Dreamer', amount: 3.99, method: 'PayPal', txId: 'PAYPAL123', status: 'PENDING', createdAt: new Date('2023-11-01T10:00:00Z') },
        { id: 'req2', user: { name: 'David', email: 'dave@example.com'}, plan: 'Sparkle', amount: 1.99, method: 'Binance', txId: 'BINANCE456', status: 'APPROVED', createdAt: new Date('2023-10-31T15:30:00Z') },
        { id: 'req3', user: { name: 'Eve', email: 'eve@example.com'}, plan: 'Legend', amount: 9.99, method: 'Payoneer', txId: 'PAYONEER789', status: 'REJECTED', createdAt: new Date('2023-10-30T12:00:00Z') },
    ];
}

export default async function AdminDashboardPage() {
  const users = await getUsers();
  const requests = await getPaymentRequests();

  return (
    <div className="space-y-8">
      <div className="bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-8">
        <h1 className="text-4xl font-bold text-gradient mb-4">Welcome, Admin!</h1>
        <p className="text-white/80 text-lg">
          This is your control center. Review user activity and manage payment requests below.
        </p>
      </div>
      
      <div className="bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-white mb-6">User Management</h2>
        <UsersClient initialUsers={users} />
      </div>

      <div className="bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-white mb-6">Payment Requests</h2>
        <PaymentsClient initialRequests={requests} />
      </div>
    </div>
  );
}