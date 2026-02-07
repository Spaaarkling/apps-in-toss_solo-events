'use client';

import Link from 'next/link';
import { SoloEvent } from '@/types/event';
import { formatPrice, getCategoryLabel } from '@/utils/filters';

interface EventDetailClientProps {
  event: SoloEvent;
}

export default function EventDetailClient({ event }: EventDetailClientProps) {
  return (
    <div className="flex flex-col min-h-dvh">
      <header className="sticky top-0 z-40 bg-[#0F1115]/95 backdrop-blur-sm px-4 py-3 flex items-center gap-3">
        <Link href="/" className="text-gray-400 hover:text-white transition-colors p-1 -ml-1">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <h1 className="text-base font-semibold text-white truncate">{event.title}</h1>
      </header>

      <main className="flex-1 px-4 pb-24">
        <div className="mt-3 mb-4">
          <span className="text-xs bg-violet-600/20 text-violet-400 px-2.5 py-1 rounded-md font-medium">
            {getCategoryLabel(event.category)}
          </span>
        </div>

        <h2 className="text-xl font-bold text-white">{event.title}</h2>
        <p className="text-sm text-gray-400 mt-2 leading-relaxed">{event.description}</p>

        <div className="mt-6 space-y-3">
          <InfoRow icon="location" label="장소" value={`${event.area} · ${event.place}`} />
          <InfoRow icon="age" label="나이대" value={event.ageGroup} />
          <InfoRow icon="price" label="가격" value={formatPrice(event.price)} />
          <InfoRow icon="host" label="주최" value={event.hostName} />
          <InfoRow icon="instagram" label="인스타" value={event.instagram} />
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0F1115]/95 backdrop-blur-sm border-t border-[#1A1D23]">
        <div className="mx-auto max-w-md px-4 py-3">
          <a
            href={event.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3.5 rounded-xl text-center text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700 transition-colors"
          >
            신청하기
          </a>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  const icons: Record<string, React.ReactNode> = {
    location: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 14s5-4.5 5-8A5 5 0 003 6c0 3.5 5 8 5 8z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    age: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    price: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 4v8M6 6h3a1.5 1.5 0 010 3H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    host: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 6h6M5 8h4M5 10h5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    instagram: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="4" r="1" fill="currentColor" />
      </svg>
    ),
  };

  return (
    <div className="flex items-center gap-3 bg-[#1A1D23] rounded-xl px-4 py-3">
      <span className="text-gray-500 shrink-0">{icons[icon]}</span>
      <span className="text-xs text-gray-500 w-10 shrink-0">{label}</span>
      <span className="text-sm text-gray-200">{value}</span>
    </div>
  );
}
