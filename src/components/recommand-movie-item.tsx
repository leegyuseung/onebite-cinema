import style from "./recommand-movie-item.module.css";
import Link from "next/link";
import { MovieData } from "@/types/types";

export default function RecommandMovieItem({ id, posterImgUrl }: MovieData) {
  return (
    <Link className={style.container} href={`/movie/${id}`}>
      <img src={posterImgUrl} />
    </Link>
  );
}
