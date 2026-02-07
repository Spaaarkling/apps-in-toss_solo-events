export type Category = 'rotation' | 'bar' | 'party';

export type PriceRange = 'free' | '1-3' | '3+';

/**
 * 구글시트 컬럼 매핑:
 * category | title | area | place | ageGroup | price | hostName | instagram | applyUrl | description
 * (id는 행 번호 기반 자동 생성)
 */
export interface SoloEvent {
  id: string;       // 자동 생성 (evt-1, evt-2, ...)
  category: Category;
  title: string;
  description: string;
  area: string;       // 지역 (강남, 홍대 등)
  place: string;      // 장소명
  ageGroup: string;   // 나이대 (20대, 20대~30대, 30대 등)
  price: number;
  hostName: string;   // 주최자 이름
  instagram: string;  // @handle
  applyUrl: string;
}

export interface Filters {
  area: string | 'all';
  ageGroup: string | 'all';
  priceRange: PriceRange | 'all';
}
