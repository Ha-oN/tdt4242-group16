"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Folder, MessageSquare, Lock, BookOpen } from 'lucide-react';
import { getSidebarData, GroupedConversations } from '@/app/actions';

export default function Sidebar({ userId }: { userId: string }) {
  const [activeTab, setActiveTab] = useState<'ACADEMIC' | 'PRIVATE'>('ACADEMIC');
  const [data, setData] = useState<GroupedConversations | null>(null);

  useEffect(() => {
    // Fetch categorized and sorted data on mount
    getSidebarData(userId).then(setData).catch(console.error);
  }, [userId]);

  if (!data) return <div className="w-64 bg-gray-50 border-r p-4 animate-pulse" />;

  return (
    <aside className="w-64 h-screen bg-gray-50 border-r flex flex-col">
      {/* Header & New Chat Action */}
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-gray-800 mb-4">AI Guidebook</h2>
        <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
          <Plus size={18} />
          <span>New Chat</span>
        </button>
      </div>

      {/* Category Toggle */}
      <div className="flex p-2 gap-1 bg-gray-200 m-4 rounded-lg">
        <button
          onClick={() => setActiveTab('ACADEMIC')}
          className={`flex-1 py-1 text-sm font-medium rounded-md flex justify-center items-center gap-2 transition-colors ${activeTab === 'ACADEMIC' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <BookOpen size={16} /> Academic
        </button>
        <button
          onClick={() => setActiveTab('PRIVATE')}
          className={`flex-1 py-1 text-sm font-medium rounded-md flex justify-center items-center gap-2 transition-colors ${activeTab === 'PRIVATE' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <Lock size={16} /> Private
        </button>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {activeTab === 'PRIVATE' ? (
          <div className="space-y-1">
            {data.private.map((chat) => (
              <Link key={chat._id} href={`/dashboard/chat/${chat._id}`} className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-200 text-gray-700 text-sm transition-colors">
                <MessageSquare size={16} className="text-gray-400" />
                <span className="truncate">{chat.title}</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {data.academic.map((course) => (
              <div key={course.courseId}>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                  <Folder size={14} /> {course.courseCode}
                </div>
                <div className="space-y-1 pl-2 border-l-2 border-gray-200 ml-1">
                  {course.conversations.map((chat) => (
                    <Link key={chat._id} href={`/dashboard/chat/${chat._id}`} className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-200 text-gray-700 text-sm transition-colors">
                      <MessageSquare size={16} className="text-gray-400" />
                      <span className="truncate">{chat.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}