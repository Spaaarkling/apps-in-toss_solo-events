'use client';

import Link from 'next/link';
import { Badge } from '@toss/tds-mobile';
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
        <Badge
          size="small"
          variant="weak"
          color={event.price === 0 ? 'green' : 'blue'}
        >
          {formatPrice(event.price)}
        </Badge>
      </div>

      <div className="flex items-center justify-between mt-3">
        <Badge size="xsmall" variant="weak" color="elephant">
          {event.ageGroup}
        </Badge>
        <span className="text-xs text-gray-500">{event.hostName}</span>
      </div>
    </Link>
  );
}
