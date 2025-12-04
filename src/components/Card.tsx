import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export function Card({ children, className = '', padding = true }: CardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-[#E5E7EB] ${padding ? 'p-6' : ''} ${className}`}>
      {children}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
  onClick?: () => void;
}

export function StatCard({ title, value, icon, trend, onClick }: StatCardProps) {
  return (
    <Card className={onClick ? 'cursor-pointer hover:shadow-md transition-shadow duration-300' : ''} onClick={onClick}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[#6B7280] text-sm mb-1">{title}</p>
          <h3 className="text-[#111827] mb-2">{value}</h3>
          {trend && (
            <span className={`text-sm ${trend.positive ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
              {trend.value}
            </span>
          )}
        </div>
        {icon && (
          <div className="p-3 bg-[#EFF6FF] rounded-lg text-[#2563EB]">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
