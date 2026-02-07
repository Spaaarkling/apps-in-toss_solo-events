import { notFound } from 'next/navigation';
import { getEvents, getEventById } from '@/lib/events';
import EventDetailClient from './EventDetailClient';

export const revalidate = 60;

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event) => ({ id: event.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEventById(id);
  return {
    title: event ? `${event.title} - 솔로이벤트` : '솔로이벤트 - 이벤트 상세',
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  return <EventDetailClient event={event} />;
}
