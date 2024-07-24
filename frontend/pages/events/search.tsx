import qs from "qs";
import { useRouter } from "next/router";
import Link from "next/link";
import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config";
import { EventData } from "@/types/event";

interface EventsProps {
  data: EventData[];
}

const SearchPage = ({ data }: EventsProps) => {
  const router = useRouter();

  return (
    <Layout title="Search Results">
      <Link href="/events">Go Back</Link>
      <h1>Search Result for {router.query.term}</h1>
      {data.length === 0 && <h3>No events to show</h3>}

      {data.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
};

export async function getServerSideProps({ query: { term } }: any) {
  const query = qs.stringify({
    filters: {
      $or: [
        { name: { $containsi: term } },
        { performers: { $containsi: term } },
        { description: { $containsi: term } },
        { venue: { $containsi: term } },
      ],
    },
  });
  const res = await fetch(`${API_URL}/api/events?${query}`);
  const { data } = await res.json();

  return {
    props: { data },
  };
}

export default SearchPage;
