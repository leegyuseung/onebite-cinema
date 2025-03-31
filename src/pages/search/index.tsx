import SearchableLayout from "@/components/searchable-layout";
import RecommandMovieItem from "@/components/recommand-movie-item";
import fetchMovies from "@/lib/fetch-movies";
import { ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MovieData } from "@/types/types";

// query가 없어서 실행은 못한다.
// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   const q = context.query.q;

//   const movies = await fetchMovies(q as string);

//   return {
//     props: { movies },
//   };
// };

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const q = context.query.q;

//   const movies = await fetchMovies(q as string);

//   return {
//     props: { movies },
//   };
// };

export default function Page() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchMovies(q as string);
    setMovies(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  return (
    <div>
      {movies.map((movie) => (
        <RecommandMovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
