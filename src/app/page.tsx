import { getEvents, getAvailableAreas, getAvailableAgeGroups } from '@/lib/events';
import HomeClient from '@/components/HomeClient';

export const revalidate = 60;

export default async function Home() {
  const [events, areas, ageGroups] = await Promise.all([
    getEvents(),
    getAvailableAreas(),
    getAvailableAgeGroups(),
  ]);

  return <HomeClient events={events} areas={areas} ageGroups={ageGroups} />;
}
