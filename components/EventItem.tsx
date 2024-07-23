import Link from "next/link";
import Image from "next/image";
import style from "@/styles/EventItem.module.css";
import { Event } from "@/types/event";

interface EventItemProps {
  evt: Event;
}

const EventItem = ({ evt }: EventItemProps) => {
  return (
    <div className={style.event}>
      <Image
        src={evt.image ? evt.image : "/images/event-default.png"}
        width={170}
        height={100}
        alt={evt.name}
      />
      <div className={style.info}>
        <span>
          {evt.date} at {evt.time}
        </span>
        <h3>{evt.name}</h3>
      </div>
      <Link href={`/events/${evt.slug}`}>
        <span className="btn">Details</span>
      </Link>
    </div>
  );
};

export default EventItem;
