import React from 'react';
import { LogOut, User } from 'lucide-react';

interface TopNavProps {
  role: 'student' | 'spc' | 'recruiter';
  userName: string;
  onLogout: () => void;
}

export function TopNav({ role, userName, onLogout }: TopNavProps) {
  const roleLabels = {
    student: 'Student',
    spc: 'SPC',
    recruiter: 'Recruiter'
  };

  return (
    <nav className="bg-white border-b border-[var(--color-border)] px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
            <span className="text-white">IMS</span>
          </div>
          <div>
            <h3 className="text-[var(--color-text-primary)]">IMS</h3>
            <p className="text-xs text-[var(--color-text-secondary)]">Institute Placement System</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
            <User className="w-5 h-5 text-[var(--color-text-secondary)]" />
            <div className="text-right">
              <p className="text-sm">{userName}</p>
              <p className="text-xs text-[var(--color-text-secondary)]">{roleLabels[role]}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-[var(--color-text-secondary)]" />
          </button>
        </div>
      </div>
    </nav>
  );
}
