import { SoloEvent } from '@/types/event';
import { fetchEventsFromSheet, isSheetConfigured } from './sheets';
import fallbackData from '@/data/events.json';

export async function getEvents(): Promise<SoloEvent[]> {
  if (isSheetConfigured()) {
    const sheetEvents = await fetchEventsFromSheet();
    if (sheetEvents.length > 0) return sheetEvents;
    console.warn('Sheet returned 0 events, falling back to local data');
  }
  return fallbackData as SoloEvent[];
}

export async function getEventById(id: string): Promise<SoloEvent | null> {
  const events = await getEvents();
  return events.find((e) => e.id === id) ?? null;
}

export async function getAvailableAreas(): Promise<string[]> {
  const events = await getEvents();
  return [...new Set(events.map((e) => e.area))].sort();
}

export async function getAvailableAgeGroups(): Promise<string[]> {
  const events = await getEvents();
  return [...new Set(events.map((e) => e.ageGroup))].sort();
}
