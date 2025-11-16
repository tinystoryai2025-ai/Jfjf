
import React from 'react';
import UsersClient from '@/components/admin/UsersClient';
// FIX: Import shared User type to correctly type the mock data.
import { User } from '@/types';

// This is a mock function. In a real app, you would fetch from your database.
async function getUsers(): Promise<User[]> {
    // This data would come from `await prisma.user.findMany()`
    return [
        { id: '1', name: 'Alice', email: 'alice@example.com', password: '$2a$10$...', plan: 'Dreamer', credits: 55, joinedAt: new Date(), isBanned: false },
        { id: '2', name: 'Bob', email: 'bob@example.com', password: '$2a$10$...', plan: 'Free', credits: 2, joinedAt: new Date(), isBanned: false },
        { id: '3', name: 'Charlie', email: 'charlie@example.com', password: '$2a$10$...', plan: 'Legend', credits: 150, joinedAt: new Date(), isBanned: true },
    ];
}

export default async function UsersPage() {
    const users = await getUsers();

    return (
        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6 sm:p-8">
            <h1 className="text-3xl font-bold text-white mb-6">User Management</h1>
            <UsersClient initialUsers={users} />
        </div>
    );
}
