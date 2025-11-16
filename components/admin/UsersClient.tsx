
'use client';

import React, { useState, useMemo } from 'react';
// FIX: Import the shared User type from the central types file to ensure consistency.
import type { User } from '@/types';

export default function UsersClient({ initialUsers }: { initialUsers: User[] }) {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = useMemo(() => {
        return users.filter(user => 
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    const handleBanUser = (userId: string) => {
        // In a real app, this would be an API call
        const user = users.find(u => u.id === userId);
        if (user) {
            const action = user.isBanned ? 'unbanning' : 'banning';
            alert(`Simulating ${action} user ${userId}. API call not implemented.`);
            setUsers(users.map(u => u.id === userId ? { ...u, isBanned: !u.isBanned } : u));
        }
    };

    const handleEditCredits = (userId: string) => {
        const currentCredits = users.find(u => u.id === userId)?.credits || 0;
        const newCredits = prompt("Enter new credit amount:", String(currentCredits));
        if (newCredits && !isNaN(parseInt(newCredits))) {
             // In a real app, this would be an API call
            alert(`Simulating setting credits for user ${userId} to ${newCredits}. API call not implemented.`);
            setUsers(users.map(u => u.id === userId ? { ...u, credits: parseInt(newCredits) } : u));
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-sm bg-white/5 border border-white/20 rounded-lg px-4 py-3 mb-6 text-[#e0e0ff] placeholder-[#e0e0ff]/50 focus:outline-none focus:ring-2 focus:ring-[#8b46ff]"
            />
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/20">
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Password</th>
                            <th className="p-4">Credits</th>
                            <th className="p-4">Plan</th>
                            <th className="p-4">Joined</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="hover:bg-white/5">
                                <td className="p-4">{user.name || 'N/A'}</td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4 font-mono">********</td>
                                <td className="p-4 font-bold">{user.credits}</td>
                                <td className="p-4">{user.plan}</td>
                                <td className="p-4">{new Date(user.joinedAt).toLocaleDateString()}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${!user.isBanned ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {user.isBanned ? 'BANNED' : 'ACTIVE'}
                                    </span>
                                </td>
                                <td className="p-4 space-x-2 whitespace-nowrap">
                                    <button onClick={() => handleEditCredits(user.id)} title="Edit Credits" className="text-blue-400 hover:text-blue-300"><i className="fas fa-coins"></i></button>
                                    <button onClick={() => handleBanUser(user.id)} title={user.isBanned ? 'Unban User' : 'Ban User'} className={`${user.isBanned ? 'text-yellow-400 hover:text-yellow-300' : 'text-red-400 hover:text-red-300'}`}><i className={`fas ${user.isBanned ? 'fa-unlock' : 'fa-ban'}`}></i></button>
                                    <button onClick={() => alert('Feature to view books is not implemented.')} title="View Books" className="text-purple-400 hover:text-purple-300"><i className="fas fa-book-open"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
