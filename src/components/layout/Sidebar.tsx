import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarProps {
  items: MenuItem[];
  activeItem: string;
  onItemClick: (id: string) => void;
}

export function Sidebar({ items, activeItem, onItemClick }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-[var(--color-border)] min-h-[calc(100vh-73px)] p-4">
      <nav className="flex flex-col gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeItem === item.id
                  ? 'bg-blue-50 text-[var(--color-primary)]'
                  : 'text-[var(--color-text-secondary)] hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
