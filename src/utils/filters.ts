import { SoloEvent, Filters, PriceRange } from '@/types/event';

export function getPriceRange(price: number): PriceRange {
  if (price === 0) return 'free';
  if (price <= 30000) return '1-3';
  return '3+';
}

export function filterEvents(events: SoloEvent[], filters: Filters): SoloEvent[] {
  return events.filter((event) => {
    if (filters.area !== 'all' && event.area !== filters.area) return false;
    if (filters.ageGroup !== 'all' && event.ageGroup !== filters.ageGroup) return false;
    if (filters.priceRange !== 'all') {
      if (getPriceRange(event.price) !== filters.priceRange) return false;
    }
    return true;
  });
}

export function formatPrice(price: number): string {
  if (price === 0) return '무료';
  return `${(price / 10000).toFixed(price % 10000 === 0 ? 0 : 1)}만원`;
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    rotation: '로테이션 소개팅',
    bar: '혼술바',
    party: '파티',
  };
  return labels[category] ?? category;
}
