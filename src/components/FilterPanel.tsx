'use client';

import { Filters, PriceRange } from '@/types/event';

interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onClose: () => void;
  availableAreas: string[];
  availableAgeGroups: string[];
}

const PRICE_OPTIONS: { value: PriceRange | 'all'; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'free', label: '무료' },
  { value: '1-3', label: '1~3만' },
  { value: '3+', label: '3만+' },
];

export default function FilterPanel({
  filters,
  onFilterChange,
  onClose,
  availableAreas,
  availableAgeGroups,
}: FilterPanelProps) {
  const update = (partial: Partial<Filters>) => {
    onFilterChange({ ...filters, ...partial });
  };

  const resetFilters = () => {
    onFilterChange({ area: 'all', ageGroup: 'all', priceRange: 'all' });
  };

  const hasActiveFilters =
    filters.area !== 'all' ||
    filters.ageGroup !== 'all' ||
    filters.priceRange !== 'all';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#1A1D23] rounded-t-2xl sm:rounded-2xl max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#1A1D23] px-5 pt-5 pb-3 border-b border-[#2A2D35] flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">필터</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5L15 15M5 15L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* 지역 */}
          <section>
            <h3 className="text-sm font-semibold text-gray-300 mb-2">지역</h3>
            <div className="flex flex-wrap gap-2">
              <ChipButton active={filters.area === 'all'} onClick={() => update({ area: 'all' })}>전체</ChipButton>
              {availableAreas.map((area) => (
                <ChipButton key={area} active={filters.area === area} onClick={() => update({ area })}>{area}</ChipButton>
              ))}
            </div>
          </section>

          {/* 나이대 */}
          <section>
            <h3 className="text-sm font-semibold text-gray-300 mb-2">나이대</h3>
            <div className="flex flex-wrap gap-2">
              <ChipButton active={filters.ageGroup === 'all'} onClick={() => update({ ageGroup: 'all' })}>전체</ChipButton>
              {availableAgeGroups.map((ag) => (
                <ChipButton key={ag} active={filters.ageGroup === ag} onClick={() => update({ ageGroup: ag })}>{ag}</ChipButton>
              ))}
            </div>
          </section>

          {/* 가격대 */}
          <section>
            <h3 className="text-sm font-semibold text-gray-300 mb-2">가격대</h3>
            <div className="flex flex-wrap gap-2">
              {PRICE_OPTIONS.map((opt) => (
                <ChipButton key={opt.value} active={filters.priceRange === opt.value} onClick={() => update({ priceRange: opt.value })}>{opt.label}</ChipButton>
              ))}
            </div>
          </section>
        </div>

        <div className="sticky bottom-0 bg-[#1A1D23] px-5 py-4 border-t border-[#2A2D35] flex gap-3">
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="px-4 py-2.5 rounded-xl text-sm text-gray-400 bg-[#2A2D35] hover:text-white transition-colors"
            >
              초기화
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700 transition-colors"
          >
            적용하기
          </button>
        </div>
      </div>
    </div>
  );
}

function ChipButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
        active ? 'bg-violet-600 text-white' : 'bg-[#2A2D35] text-gray-400 hover:text-gray-200'
      }`}
    >
      {children}
    </button>
  );
}
