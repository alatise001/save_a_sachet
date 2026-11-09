'use client';
import { startTransition, useEffect, useState } from 'react';

const DAY = 86_400_000;
const HOUR = 3_600_000;
const MINUTE = 60_000;

export function useCountdown(deadline: Date) {
  const [now, setNow] = useState(0);
  const diff = Math.max(0, deadline.getTime() - now);
  const expired = diff === 0;

  useEffect(() => {
    startTransition(() => {
      setNow(Date.now());
    });

    if (expired) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [expired]);

  return {
    days: Math.floor(diff / DAY),
    hours: Math.floor((diff % DAY) / HOUR),
    minutes: Math.floor((diff % HOUR) / MINUTE),
    seconds: Math.floor((diff % MINUTE) / 1000),
    expired,
  };
}
