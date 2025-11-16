
import { NextResponse } from 'next/server';
// In a real app: import prisma from '@/lib/prisma';

export async function GET() {
  // Mock data - replace with actual DB call
  const users = [
    { id: '1', name: 'Alice', email: 'alice@example.com', plan: 'Dreamer', credits: 55, joinedAt: new Date(), status: 'ACTIVE' },
    { id: '2', name: 'Bob', email: 'bob@example.com', plan: 'Free', credits: 2, joinedAt: new Date(), status: 'ACTIVE' },
    { id: '3', name: 'Charlie', email: 'charlie@example.com', plan: 'Legend', credits: 150, joinedAt: new Date(), status: 'BANNED' },
  ];
  
  // Real implementation:
  // const users = await prisma.user.findMany({ orderBy: { joinedAt: 'desc' } });
  
  return NextResponse.json(users);
}
