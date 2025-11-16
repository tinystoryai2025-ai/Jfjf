
'use client';

import React, { useState, useMemo } from 'react';
// FIX: Import shared types from the central types file to ensure consistency.
import type { PaymentRequest, PaymentStatus } from '@/types';

const PLAN_CREDITS: { [key: string]: number } = {
  'Starter': 300,
  'Pro': 1000,
  'Family': 99999, // Representing "Unlimited"
};

export default function PaymentsClient({ initialRequests }: { initialRequests: PaymentRequest[] }) {
    const [requests, setRequests] = useState<PaymentRequest[]>(initialRequests);
    const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'ALL'>('PENDING');

    const filteredRequests = useMemo(() => {
        if (statusFilter === 'ALL') return requests;
        return requests.filter(req => req.status === statusFilter);
    }, [requests, statusFilter]);

    const handleAction = async (id: string, action: 'approve' | 'reject') => {
        const request = requests.find(r => r.id === id);
        if (!request) return;

        if (action === 'approve') {
            const creditsToAdd = PLAN_CREDITS[request.plan] || 0;
            // In a real app, this would be an API call to approve and add credits
            alert(`Request ${id} will be approved. ${creditsToAdd} credits will be added to ${request.user.email}. API call not implemented.`);
            const newStatus = 'APPROVED';
            setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
        } else {
            // In a real app, this would be an API call to reject
            alert(`Request ${id} will be rejected. API call not implemented.`);
            const newStatus = 'REJECTED';
            setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
        }
    };
    
    const getStatusColor = (status: PaymentStatus) => ({
        'PENDING': 'bg-yellow-500/20 text-yellow-400',
        'APPROVED': 'bg-green-500/20 text-green-400',
        'REJECTED': 'bg-red-500/20 text-red-400',
    }[status]);

    return (
        <div>
            <div className="flex space-x-2 mb-6">
                {(['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const).map(status => (
                    <button 
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${statusFilter === status ? 'bg-white/20 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                    >
                        {status}
                    </button>
                ))}
            </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/20">
                            <th className="p-4">User</th>
                            <th className="p-4">Plan</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Method</th>
                            <th className="p-4">Transaction ID</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {filteredRequests.map(req => (
                            <tr key={req.id} className="hover:bg-white/5">
                                <td className="p-4">{req.user.name}<br/><span className="text-xs text-white/60">{req.user.email}</span></td>
                                <td className="p-4">{req.plan}</td>
                                <td className="p-4">${req.amount.toFixed(2)}</td>
                                <td className="p-4">{req.method}</td>
                                <td className="p-4 font-mono text-sm">{req.txId}</td>
                                <td className="p-4">{new Date(req.createdAt).toLocaleString()}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(req.status)}`}>
                                        {req.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    {req.status === 'PENDING' && (
                                        <div className="flex space-x-2">
                                            <button onClick={() => handleAction(req.id, 'approve')} title="Approve & Add Credits" className="p-2 rounded-md bg-green-500/20 hover:bg-green-500/40 text-green-400"><i className="fas fa-check"></i></button>
                                            <button onClick={() => handleAction(req.id, 'reject')} title="Reject" className="p-2 rounded-md bg-red-500/20 hover:bg-red-500/40 text-red-400"><i className="fas fa-times"></i></button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
