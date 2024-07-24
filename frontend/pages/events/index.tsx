import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import Pagination from "@/components/Pagination";
import { API_URL, PER_PAGE } from "@/config";
import { EventData } from "@/types/event";

interface EventsProps {
  data: EventData[];
  page: number;
  total: number;
}

const Events = ({ data, page, total }: EventsProps) => {
  return (
    <Layout>
      <h1>Events</h1>
      {data.length === 0 && <h3>No events to show</h3>}

      {data.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  );
};

export async function getServerSideProps({ query: { page = 1 } }: any) {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  const totalRes = await fetch(`${API_URL}/api/events/count`);
  const total = await totalRes.json();

  const eventRes = await fetch(
    `${API_URL}/api/events?sort[0]=date:asc&pagination[limit]=${PER_PAGE}&pagination[start]=${start}`
  );
  const { data } = await eventRes.json();

  return {
    props: { data, page: +page, total },
  };
}

export default Events;
