import React from 'react';
import Sidebar from '@/components/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // In a real application, retrieve the authenticated user's ID via your session/auth middleware
  // We'll hardcode a dummy ID for this implementation step
  const mockUserId = "60d0fe4f5311236168a109ca"; 

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* Sidebar wrapper: Hidden on very small screens, 
        but normally visible as the first pane.
      */}
      <div className="hidden md:block flex-shrink-0 border-r border-gray-200">
        <Sidebar userId={mockUserId} />
      </div>

      {/* Main content area: This will inject `page.tsx` (the default dashboard view)
        or `/chat/[id]/page.tsx` (the specific discussion window).
      */}
      <main className="flex-1 flex flex-col min-w-0 bg-white relative">
        {/* Mobile Header (Fallback when sidebar is hidden) */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <h1 className="text-lg font-bold text-gray-800">AI Guidebook</h1>
          {/* A mobile hamburger menu toggle would go here */}
        </header>
        
        {/* The active discussion window or landing state */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}