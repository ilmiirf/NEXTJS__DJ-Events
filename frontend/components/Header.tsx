import style from "@/styles/Header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.logo}>
        <Link href="/">DJ Events</Link>
      </div>

      <nav>
        <ul>
          <li>
            <Link href="/events">Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
