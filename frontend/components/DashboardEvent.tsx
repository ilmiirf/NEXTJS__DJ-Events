import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import style from "@/styles/DashboardEvent.module.css";
import { EventData } from "@/types/event";

interface DashboardEventProps {
  evt: EventData;
  handleDelete: (id: number) => void;
}

const DashboardEvent = ({ evt, handleDelete }: DashboardEventProps) => {
  return (
    <div className={style.event}>
      <h4>
        <Link href={`/events/${evt.id}`}>{evt.attributes.name}</Link>
      </h4>
      <Link href={`/events/edit/${evt.id}`} className={style.edit}>
        <FaPencilAlt />
      </Link>
      <a href="#" className={style.delete} onClick={() => handleDelete(evt.id)}>
        <FaTimes />
      </a>
    </div>
  );
};

export default DashboardEvent;
