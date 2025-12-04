import React from 'react';

type StatusType = 
  | 'eligible' 
  | 'not-eligible' 
  | 'registered' 
  | 'shortlisted' 
  | 'offered' 
  | 'closed' 
  | 'pending';

interface StatusChipProps {
  status: StatusType;
  label?: string;
}

export function StatusChip({ status, label }: StatusChipProps) {
  const statusConfig = {
    'eligible': { bg: 'bg-green-100', text: 'text-green-800', label: 'Eligible' },
    'not-eligible': { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Not Eligible' },
    'registered': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Registered' },
    'shortlisted': { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Shortlisted' },
    'offered': { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Offered' },
    'closed': { bg: 'bg-gray-200', text: 'text-gray-700', label: 'Closed' },
    'pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending Review' }
  };

  const config = statusConfig[status];
  const displayLabel = label || config.label;

  return (
    <span className={`inline-flex px-3 py-1 rounded-full text-xs ${config.bg} ${config.text}`}>
      {displayLabel}
    </span>
  );
}
