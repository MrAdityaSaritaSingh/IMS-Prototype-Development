import React from 'react';
import { ApplicationStatus } from '../types';

interface StatusChipProps {
  status: ApplicationStatus | string;
  size?: 'sm' | 'md';
}

export function StatusChip({ status, size = 'md' }: StatusChipProps) {
  const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
    eligible: { bg: 'bg-green-100', text: 'text-green-700', label: 'Eligible' },
    not_eligible: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Not Eligible' },
    registered: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Registered' },
    shortlisted: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Shortlisted' },
    offered: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Offered' },
    accepted: { bg: 'bg-green-100', text: 'text-green-700', label: 'Accepted' },
    declined: { bg: 'bg-red-100', text: 'text-red-700', label: 'Declined' },
    closed: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Closed' },
    pending_review: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending Review' },
    draft: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Draft' },
    published: { bg: 'bg-green-100', text: 'text-green-700', label: 'Published' },
  };

  const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-700', label: status };
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${config.bg} ${config.text} ${sizeClass}`}>
      {config.label}
    </span>
  );
}
