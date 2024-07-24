import { PER_PAGE } from "@/config";
import Link from "next/link";

interface PaginationProps {
  page: number;
  total: number;
}

const Pagination = ({ page, total }: PaginationProps) => {
  const lastPage = Math.ceil(total / PER_PAGE);
  return (
    <>
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <span className="btn-secondary">Prev</span>
        </Link>
      )}

      {page <= 1 && (
        <Link href={`/events?page=${page + 1}`}>
          <span className="btn-secondary">Next</span>
        </Link>
      )}
    </>
  );
};

export default Pagination;
