'use client';

import { useState, useMemo } from 'react';
import { Category, Filters, SoloEvent } from '@/types/event';
import { filterEvents } from '@/utils/filters';
import TabBar from '@/components/TabBar';
import EventCard from '@/components/EventCard';
import FilterPanel from '@/components/FilterPanel';
import EmptyState from '@/components/EmptyState';

interface HomeClientProps {
  events: SoloEvent[];
  areas: string[];
  ageGroups: string[];
}

const DEFAULT_FILTERS: Filters = {
  area: 'all',
  ageGroup: 'all',
  priceRange: 'all',
};

export default function HomeClient({ events, areas, ageGroups }: HomeClientProps) {
  const [activeTab, setActiveTab] = useState<Category>('rotation');
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [showFilters, setShowFilters] = useState(false);

  const filteredEvents = useMemo(() => {
    const byCategory = events.filter((e) => e.category === activeTab);
    return filterEvents(byCategory, filters);
  }, [events, activeTab, filters]);

  const activeFilterCount =
    (filters.area !== 'all' ? 1 : 0) +
    (filters.ageGroup !== 'all' ? 1 : 0) +
    (filters.priceRange !== 'all' ? 1 : 0);

  return (
    <div className="flex flex-col min-h-dvh">
      <header className="sticky top-0 z-40 bg-[#0F1115]/95 backdrop-blur-sm px-4 pt-4 pb-3">
        <h1 className="text-xl font-bold text-white mb-3">솔로이벤트</h1>
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      </header>

      <main className="flex-1 px-4 pb-20">
        <div className="flex flex-col gap-3 py-3">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
        <div className="mx-auto max-w-md px-4 pb-5 flex justify-center">
          <button
            onClick={() => setShowFilters(true)}
            className="pointer-events-auto flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#1A1D23] border border-[#2A2D35] text-sm font-medium text-gray-200 shadow-lg shadow-black/30 hover:bg-[#22252B] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            필터
            {activeFilterCount > 0 && (
              <span className="bg-violet-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {showFilters && (
        <FilterPanel
          filters={filters}
          onFilterChange={setFilters}
          onClose={() => setShowFilters(false)}
          availableAreas={areas}
          availableAgeGroups={ageGroups}
        />
      )}
    </div>
  );
}
