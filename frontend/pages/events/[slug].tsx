import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Layout from "@/components/Layout";
import { API_URL } from "@/config";
import { Event, EventData } from "@/types/event";
import style from "@/styles/Event.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

interface EventProps {
  evt: EventData;
}

const EventPage = ({ evt }: EventProps) => {
  const router = useRouter();
  const deleteEvent = async (e: any) => {
    if (confirm("Are you sure?")) {
      const res = fetch(`${API_URL}/api/events/${evt.id}`, {
        method: "DELETE",
      }).then(() => {
        router.push("/events");
      });
    }
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

          <a href="#" className={style.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>
        <span>
          {new Date(evt.attributes.date).toLocaleDateString("en-US")} at{" "}
          {evt.attributes.time}
        </span>
        <h1>{evt.attributes.name}</h1>
        <ToastContainer />
        {evt.attributes.img && (
          <div className={style.image}>
            <Image src={evt.attributes.img} width={960} height={600} alt="" />
          </div>
        )}
        <h3>Performers</h3>
        <p>{evt.attributes.performers}</p>
        <h3>Description</h3>
        <p>{evt.attributes.description}</p>
        <h3>Venue: {evt.attributes.venue}</h3>
        <p>{evt.attributes.address}</p>

        <Link href="/events">
          <span className={style.back}>{"<"} Go Back</span>
        </Link>
      </div>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const res = await fetch(`${API_URL}/api/events`);
  const { data } = await res.json();

  const paths = data.map((evt: EventData) => ({
    params: { slug: evt.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params: { slug } }: any) => {
  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const { data } = await res.json();
  return {
    props: {
      evt: data,
    },
    revalidate: 1,
  };
};

export default EventPage;
