import { FaExclamationTriangle } from "react-icons/fa";
import Link from "next/link";
import Layout from "@/components/Layout";
import style from "@/styles/404.module.css";

const NotFound = () => {
  return (
    <Layout title="Page Not Found">
      <div className={style.error}>
        <h1>
          {" "}
          <FaExclamationTriangle /> 404
        </h1>
        <h4>Sorry, there is nothing here</h4>
        <Link href="/">Go Back Home</Link>
      </div>
    </Layout>
  );
};

export default NotFound;
