import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config";
import { Event, EventData } from "@/types/event";
import Link from "next/link";

interface HomeProps {
  data: EventData[];
}

export default function Home({ data }: HomeProps) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {data.length === 0 && <h3>No events to show</h3>}

      {data.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {data.length > 0 && (
        <Link href="/events">
          <span className="btn-secondary">View All Events</span>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?_sort=date:ASC&_limit=3`);
  const { data } = await res.json();

  return {
    props: { data },
    revalidate: 1, // In seconds
  };
}
