import { ReactNode } from "react";
import style from "./index.module.css";
import movies from "@/mock/dummy.json";
import RecommandMovieItem from "@/components/recommand-movie-item";
import SearchableLayout from "@/components/searchable-layout";
import MovieItem from "@/components/movie-item";

export default function Home() {
  return (
    <div className={style.container}>
      <section className={style.recommand_section_container}>
        <h3>지금 가장 추천하는 영화</h3>
        <div>
          {movies.slice(0, 3).map((movie) => (
            <RecommandMovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
      <section className={style.movie_section_container}>
        <h3>등록된 모든 영화</h3>
        <div>
          {movies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
