'use client';

import Link from 'next/link';
import { SoloEvent } from '@/types/event';
import { formatPrice } from '@/utils/filters';

interface EventCardProps {
  event: SoloEvent;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link
      href={`/event/${event.id}`}
      className="block bg-[#1A1D23] rounded-2xl p-4 hover:bg-[#22252B] transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-semibold text-white truncate">
            {event.title}
          </h3>
          <p className="text-[13px] text-gray-400 mt-1">
            {event.area} · {event.place}
          </p>
        </div>
        <span
          className={`shrink-0 text-sm font-bold px-2.5 py-1 rounded-lg ${
            event.price === 0
              ? 'bg-emerald-500/15 text-emerald-400'
              : 'bg-blue-500/15 text-blue-400'
          }`}
        >
          {formatPrice(event.price)}
        </span>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1.5">
          <span className="text-xs bg-violet-600/15 text-violet-400 px-2 py-0.5 rounded-md">
            {event.ageGroup}
          </span>
        </div>
        <span className="text-xs text-gray-500">{event.hostName}</span>
      </div>
    </Link>
  );
}
