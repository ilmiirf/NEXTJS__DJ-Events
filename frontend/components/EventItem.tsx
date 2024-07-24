import Link from "next/link";
import Image from "next/image";
import style from "@/styles/EventItem.module.css";
import { Event, EventData } from "@/types/event";

interface EventItemProps {
  evt: EventData;
}

const EventItem = ({ evt }: EventItemProps) => {
  return (
    <div className={style.event}>
      <Image
        src={
          evt.attributes.img ? evt.attributes.img : "/images/event-default.png"
        }
        width={170}
        height={100}
        alt={evt.attributes.name}
      />
      <div className={style.info}>
        <span>
          {new Date(evt.attributes.date).toLocaleDateString("en-US")} at{" "}
          {evt.attributes.time}
        </span>
        <h3>{evt.attributes.name}</h3>
      </div>
      <Link href={`/events/${evt.id}`}>
        <span className="btn">Details</span>
      </Link>
    </div>
  );
};

export default EventItem;
