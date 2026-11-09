import type { LucideIcon } from 'lucide-react';
import React from 'react';

export default function InfoTag({
  description,
  icon: Icon,
  bgColor,
  textColor,
  blur = false,
}: {
  description: string;
  icon: LucideIcon;
  bgColor?: string;
  textColor?: string;
  blur?: boolean;
}) {
  return (
    <div>
      {' '}
      <p
        className={`inline-flex items-center gap-1.5 rounded-full border border-white/15 ${bgColor ? bgColor : 'bg-white/5'} px-3 py-1.5 font-display text-sm font-medium ${textColor ? textColor : 'text-mint/85'} ${blur ? 'backdrop-blur' : ''}`}
      >
        <Icon className="size-4" strokeWidth={2.5} />
        {description}
      </p>
    </div>
  );
}
