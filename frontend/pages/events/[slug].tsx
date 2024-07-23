import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Layout from "@/components/Layout";
import { API_URL } from "@/config";
import { Event } from "@/types/event";
import style from "@/styles/Event.module.css";

interface EventProps {
  evt: Event;
}

const EventPage = ({ evt }: EventProps) => {
  const deleteEvent = (e: any) => {
    e.preventDefault();
    console.log("delete");
  };
  return (
    <Layout title="Event">
      <div className={style.event}>
        <div className={style.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <span>
              <FaPencilAlt /> Edit Event
            </span>
          </Link>
          <Link href={`/events/delete/${evt.id}`}>
            <span className={style.delete}>
              <FaTimes /> Delete Event
            </span>
          </Link>
        </div>
        <span>
          {evt.date} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={style.image}>
            <Image src={evt.image} width={960} height={600} alt="" />
          </div>
        )}
        <h3>Performers</h3>
        <p>{evt.performers}</p>
        <h3>Description</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href="/events">
          <span className={style.back}>{"<"} Go Back</span>
        </Link>
      </div>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  const paths = events.map((evt: Event) => ({
    params: { slug: evt.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params: { slug } }: any) => {
  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const events = await res.json();
  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  };
};

export default EventPage;
