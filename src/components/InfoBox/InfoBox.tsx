import React from 'react';

interface InfoBoxProps {
  title: string;
  message: string;
  type?: 'info' | 'tip' | 'warning' | 'success';
}

export function InfoBox({ title, message, type = 'info' }: InfoBoxProps) {
  const bgClass = { info: 'bg-blue-50 border-blue-200', tip: 'bg-purple-50 border-purple-200', warning: 'bg-yellow-50 border-yellow-200', success: 'bg-green-50 border-green-200' }[type];
  const textClass = { info: 'text-blue-900', tip: 'text-purple-900', warning: 'text-yellow-900', success: 'text-green-900' }[type];
  const icon = { info: 'ℹ', tip: '💡', warning: '⚠️', success: '✓' }[type];
  return (
    <div className={`border rounded-lg p-4 space-y-1 ${bgClass}`}>
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <h3 className={`font-semibold ${textClass}`}>{title}</h3>
      </div>
      <p className={`text-sm ${textClass}`}>{message}</p>
    </div>
  );
}
