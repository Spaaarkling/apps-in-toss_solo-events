import { SoloEvent, Category } from '@/types/event';

/**
 * 구글시트에서 이벤트 데이터를 가져옵니다.
 *
 * 시트 컬럼 순서:
 * category | title | area | place | ageGroup | price | hostName | instagram | applyUrl | description
 */

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_GID = process.env.GOOGLE_SHEET_GID ?? '0';

function buildSheetUrl(): string {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function parseCSV(csv: string): string[][] {
  const lines: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    if (char === '"') {
      inQuotes = !inQuotes;
      current += char;
    } else if ((char === '\n' || (char === '\r' && csv[i + 1] === '\n')) && !inQuotes) {
      if (current.trim()) lines.push(current);
      current = '';
      if (char === '\r') i++;
    } else {
      current += char;
    }
  }
  if (current.trim()) lines.push(current);

  return lines.map(parseCSVLine);
}

function rowToEvent(row: string[], index: number): SoloEvent | null {
  // 컬럼: category, title, area, place, ageGroup, price, hostName, instagram, applyUrl, description
  if (row.length < 10) return null;

  const [category, title, area, place, ageGroup, priceStr, hostName, instagram, applyUrl, ...descParts] = row;

  if (!title) return null;

  const validCategories: Category[] = ['rotation', 'bar', 'party'];
  const cat = category.trim().toLowerCase() as Category;
  if (!validCategories.includes(cat)) return null;

  const price = parseInt(priceStr, 10);

  return {
    id: `evt-${index}`,
    category: cat,
    title: title.trim(),
    area: area.trim(),
    place: place.trim(),
    ageGroup: ageGroup.trim(),
    price: isNaN(price) ? 0 : price,
    hostName: hostName.trim(),
    instagram: instagram.trim(),
    applyUrl: applyUrl.trim(),
    description: descParts.join(',').trim() || title.trim(),
  };
}

export async function fetchEventsFromSheet(): Promise<SoloEvent[]> {
  if (!SHEET_ID) {
    return [];
  }

  const url = buildSheetUrl();
  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) {
    console.error(`Google Sheet fetch failed: ${res.status}`);
    return [];
  }

  const csv = await res.text();
  const rows = parseCSV(csv);

  const dataRows = rows.slice(1); // 헤더 스킵
  const events = dataRows.map((row, i) => rowToEvent(row, i + 1)).filter((e): e is SoloEvent => e !== null);

  return events;
}

export function isSheetConfigured(): boolean {
  return !!SHEET_ID;
}
