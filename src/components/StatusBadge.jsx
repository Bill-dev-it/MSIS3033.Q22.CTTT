import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs) => twMerge(clsx(inputs));

export const StatusBadge = ({ status, showMatchLabel = false }) => {
  const statusStyles = {
    Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Approved: 'bg-green-100 text-green-800 border-green-200',
    Rejected: 'bg-red-100 text-red-800 border-red-200',
  };

  // Display "✓ Matched" instead of "Approved" when showMatchLabel is true
  const displayLabel = (status === 'Approved' && showMatchLabel) ? '✓ Matched' : status;

  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded-full text-xs font-medium border",
      statusStyles[status] || "bg-gray-100 text-gray-800 border-gray-200"
    )}>
      {displayLabel}
    </span>
  );
};
