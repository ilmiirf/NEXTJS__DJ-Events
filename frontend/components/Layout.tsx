import Head from "next/head";
import { useRouter } from "next/router";
import Header from "./Header";
import Footer from "./Footer";
import Showcase from "./Showcase";

import style from "@/styles/Layout.module.css";

interface LayoutProps {
  title: string;
  keywords: string;
  description: string;
  children: React.ReactNode;
}

const Layout = ({ title, keywords, description, children }: LayoutProps) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      {router.pathname === "/" && <Showcase />}
      <div className={style.container}>{children}</div>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "DJ Events | Find the hottest parties",
  description: "Find the latest DJ and other musical events",
  keywords: "music, dj, edm, events",
};

export default Layout;
