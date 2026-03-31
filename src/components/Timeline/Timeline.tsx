import React from 'react';

interface TimelineEvent {
  title: string;
  description?: string;
  date: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="space-y-6">
      {events.map((event, idx) => (
        <div key={idx} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-neutral-900 rounded-full" />
            {idx !== events.length - 1 && (
              <div className="w-0.5 h-16 bg-neutral-200 mt-2" />
            )}
          </div>
          <div className="pt-1">
            <p className="font-semibold text-neutral-900">{event.title}</p>
            {event.description && (
              <p className="text-sm text-neutral-600">{event.description}</p>
            )}
            <p className="text-xs text-neutral-400 mt-1">{event.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
