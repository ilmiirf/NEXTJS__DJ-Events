import style from "@/styles/Header.module.css";
import Link from "next/link";
import Search from "./Search";

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.logo}>
        <Link href="/">DJ Events</Link>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href="/events">Events</Link>
          </li>
          <li>
            <Link href="/events/add">Add Event</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
