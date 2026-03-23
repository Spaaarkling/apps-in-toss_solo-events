'use client';

import { BottomSheet, Button } from '@toss/tds-mobile';
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
    <BottomSheet
      open
      onClose={onClose}
      header={<BottomSheet.Header>필터</BottomSheet.Header>}
      cta={
        <BottomSheet.CTA>
          <div style={{ display: 'flex', gap: 8 }}>
            {hasActiveFilters && (
              <Button
                size="large"
                variant="weak"
                color="dark"
                onClick={resetFilters}
              >
                초기화
              </Button>
            )}
            <Button
              size="large"
              display={hasActiveFilters ? 'inline' : 'full'}
              color="primary"
              onClick={onClose}
              style={{ flex: 1 }}
            >
              적용하기
            </Button>
          </div>
        </BottomSheet.CTA>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '8px 0' }}>
        <FilterSection title="지역">
          <ChipButton active={filters.area === 'all'} onClick={() => update({ area: 'all' })}>전체</ChipButton>
          {availableAreas.map((area) => (
            <ChipButton key={area} active={filters.area === area} onClick={() => update({ area })}>{area}</ChipButton>
          ))}
        </FilterSection>

        <FilterSection title="나이대">
          <ChipButton active={filters.ageGroup === 'all'} onClick={() => update({ ageGroup: 'all' })}>전체</ChipButton>
          {availableAgeGroups.map((ag) => (
            <ChipButton key={ag} active={filters.ageGroup === ag} onClick={() => update({ ageGroup: ag })}>{ag}</ChipButton>
          ))}
        </FilterSection>

        <FilterSection title="가격대">
          {PRICE_OPTIONS.map((opt) => (
            <ChipButton key={opt.value} active={filters.priceRange === opt.value} onClick={() => update({ priceRange: opt.value })}>{opt.label}</ChipButton>
          ))}
        </FilterSection>
      </div>
    </BottomSheet>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <p style={{ fontSize: 13, fontWeight: 600, color: '#9CA3AF', marginBottom: 8 }}>{title}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{children}</div>
    </section>
  );
}

function ChipButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <Button
      size="small"
      variant={active ? 'fill' : 'weak'}
      color={active ? 'primary' : 'dark'}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
