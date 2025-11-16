
import React from 'react';
import PaymentsClient from '@/components/admin/PaymentsClient';
// FIX: Import shared PaymentRequest type to correctly type the mock data.
import { PaymentRequest } from '@/types';

async function getPaymentRequests(): Promise<PaymentRequest[]> {
    // This data would come from `await prisma.paymentRequest.findMany({ include: { user: true } })`
    return [
        { id: 'req1', user: { name: 'Alice', email: 'alice@example.com'}, plan: 'Pro', amount: 3.99, method: 'PayPal', txId: 'PAYPAL123', status: 'PENDING', createdAt: new Date() },
        { id: 'req2', user: { name: 'David', email: 'dave@example.com'}, plan: 'Starter', amount: 0.99, method: 'Binance', txId: 'BINANCE456', status: 'APPROVED', createdAt: new Date() },
        { id: 'req3', user: { name: 'Eve', email: 'eve@example.com'}, plan: 'Family', amount: 9.99, method: 'Payoneer', txId: 'PAYONEER789', status: 'REJECTED', createdAt: new Date() },
    ];
}


export default async function PaymentsPage() {
    const requests = await getPaymentRequests();

    return (
        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6 sm:p-8">
            <h1 className="text-3xl font-bold text-white mb-6">Payment Requests</h1>
            <PaymentsClient initialRequests={requests} />
        </div>
    );
}
