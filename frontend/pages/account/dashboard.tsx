import { parseCookies } from "@/helpers";
import Layout from "@/components/Layout";
import { API_URL } from "@/config";
import { EventData } from "@/types/event";
import style from "@/styles/Dashboard.module.css";
import DashboardEvent from "@/components/DashboardEvent";
import { useRouter } from "next/router";

interface DashboardProps {
  events: EventData[];
  token: string;
}

const Dashboard = ({ events, token }: DashboardProps) => {
  const router = useRouter();
  const deleteEvent = async (id: number) => {
    if (confirm("Are you sure?")) {
      const res = fetch(`${API_URL}/api/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        router.push("/events");
      });
    }
  };
  return (
    <Layout title="User Dahboard">
      <div className={style.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;

export async function getServerSideProps({ req }: any) {
  const { token } = parseCookies(req);
  // TODO: harusnya ngambil dari api/events/me
  const res = await fetch(`${API_URL}/api/events`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { data: events } = await res.json();
  console.log(events);
  return {
    props: { events, token },
  };
}
