import SearchableLayout from "@/components/searchable-layout";
import RecommandMovieItem from "@/components/recommand-movie-item";
import fetchMovies from "@/lib/fetch-movies";
import { ReactNode } from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const q = context.query.q;

  const movies = await fetchMovies(q as string);

  return {
    props: { movies },
  };
};

export default function Page({
  movies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
