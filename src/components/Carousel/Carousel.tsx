'use client';

import React from 'react';

interface CarouselProps {
  items: React.ReactNode[];
  autoplay?: boolean;
  interval?: number;
}

export function Carousel({ items, autoplay = false, interval = 5000 }: CarouselProps) {
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % items.length), interval);
    return () => clearInterval(timer);
  }, [autoplay, interval, items.length]);

  return (
    <div className="relative w-full bg-neutral-100 rounded-lg overflow-hidden">
      <div className="aspect-video flex items-center justify-center">{items[current]}</div>
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
        {items.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full ${i === current ? 'bg-neutral-900' : 'bg-neutral-400'}`} />
        ))}
      </div>
      <button onClick={() => setCurrent((prev) => (prev - 1 + items.length) % items.length)} className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2">‹</button>
      <button onClick={() => setCurrent((prev) => (prev + 1) % items.length)} className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2">›</button>
    </div>
  );
}
