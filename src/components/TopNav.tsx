import React from 'react';
import { User, LogOut, Menu } from 'lucide-react';
import { UserRole } from '../types';

interface TopNavProps {
  user: {
    name: string;
    role: UserRole;
    avatar?: string;
  };
  onLogout: () => void;
  onMenuClick?: () => void;
  onLogoClick?: () => void;
}

export function TopNav({ user, onLogout, onMenuClick, onLogoClick }: TopNavProps) {
  const roleLabels: Record<UserRole, string> = {
    student: 'Student',
    spc: 'SPC Admin',
    recruiter: 'Recruiter'
  };

  return (
    <div className="bg-white border-b border-[#E5E7EB] px-4 md:px-6 py-4 sticky top-0 z-30">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onMenuClick && (
            <button 
              onClick={onMenuClick}
              className="md:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg text-[#6B7280]"
            >
              <Menu size={24} />
            </button>
          )}
          <div 
            className={`flex items-center gap-3 ${onLogoClick ? 'cursor-pointer' : ''}`}
            onClick={onLogoClick}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#2563EB] rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-lg">IMS</span>
            </div>
            <div>
              <h1 className="text-base md:text-lg font-bold text-[#111827] leading-tight">
                <span className="hidden md:inline">Institute Placement System</span>
                <span className="md:hidden">IMS</span>
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-3 px-2 md:px-4 py-2 bg-transparent md:bg-[#F3F4F6] rounded-lg">
            <div className="w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center shrink-0">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <User size={18} className="text-white" />
              )}
            </div>
            <div className="text-left hidden md:block">
              <p className="text-sm font-medium text-[#111827]">{user.name}</p>
              <p className="text-xs text-[#6B7280]">{roleLabels[user.role]}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="p-2 hover:bg-[#F3F4F6] rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut size={20} className="text-[#6B7280]" />
          </button>
        </div>
      </div>
    </div>
  );
}
