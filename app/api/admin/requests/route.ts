
import { NextResponse } from 'next/server';
// In a real app: import prisma from '@/lib/prisma';

export async function GET() {
  // Mock data - replace with actual DB call
  const requests = [
    { id: 'req1', user: { name: 'Alice', email: 'alice@example.com'}, plan: 'Dreamer', amount: 3.99, method: 'PayPal', txId: 'PAYPAL123', status: 'PENDING', createdAt: new Date() },
    { id: 'req2', user: { name: 'David', email: 'dave@example.com'}, plan: 'Sparkle', amount: 1.99, method: 'Binance', txId: 'BINANCE456', status: 'APPROVED', createdAt: new Date() },
    { id: 'req3', user: { name: 'Eve', email: 'eve@example.com'}, plan: 'Legend', amount: 9.99, method: 'Payoneer', txId: 'PAYONEER789', status: 'REJECTED', createdAt: new Date() },
  ];
  
  // Real implementation:
  // const requests = await prisma.paymentRequest.findMany({ 
  //   orderBy: { createdAt: 'desc' },
  //   include: { user: { select: { name: true, email: true } } }
  // });
  
  return NextResponse.json(requests);
}
