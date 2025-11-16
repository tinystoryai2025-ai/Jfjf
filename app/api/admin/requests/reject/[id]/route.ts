
import { NextResponse } from 'next/server';
// In a real app: import prisma from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  
  console.log(`Rejecting payment request with ID: ${id}`);

  // Real implementation:
  /*
  try {
    const updatedRequest = await prisma.paymentRequest.update({
      where: { id, status: 'PENDING' },
      data: { status: 'REJECTED' },
    });
    return NextResponse.json(updatedRequest);
  } catch (error) {
    return NextResponse.json({ message: 'Request not found or already processed.' }, { status: 400 });
  }
  */

  // Mock response for demonstration
  return NextResponse.json({ id, status: 'REJECTED' });
}
