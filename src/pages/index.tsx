import { ReactNode } from "react";
import { InferGetServerSidePropsType } from "next";
import style from "./index.module.css";
import RecommandMovieItem from "@/components/recommand-movie-item";
import SearchableLayout from "@/components/searchable-layout";
import MovieItem from "@/components/movie-item";
import fetchMovies from "@/lib/fetch-movies";
import fetchRecommandMovies from "@/lib/fetch-recommand-movies";

export const getServerSideProps = async () => {
  const [allMovies, recommandMovies] = await Promise.all([
    fetchMovies(),
    fetchRecommandMovies(),
  ]);
  return {
    props: { allMovies, recommandMovies },
  };
};

export default function Home({
  allMovies,
  recommandMovies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={style.container}>
      <section className={style.recommand_section_container}>
        <h3>지금 가장 추천하는 영화</h3>
        <div>
          {recommandMovies.slice(0, 3).map((movie) => (
            <RecommandMovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
      <section className={style.movie_section_container}>
        <h3>등록된 모든 영화</h3>
        <div>
          {allMovies.map((movie) => (
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
