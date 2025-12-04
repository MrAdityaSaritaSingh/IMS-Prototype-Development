import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}

interface SidebarProps {
  items: NavItem[];
  activeItem: string;
  className?: string;
}

export function Sidebar({ items, activeItem, className = "" }: SidebarProps) {
  return (
    <div className={`w-64 bg-white border-r border-[#E5E7EB] min-h-screen sticky top-[73px] self-start ${className}`}>
      <nav className="p-4">
        <ul className="space-y-1">
          {items.map(item => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <li key={item.id}>
                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={item.onClick}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-[#EFF6FF] text-[#2563EB] font-medium' 
                      : 'text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827]'
                    }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </motion.button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
