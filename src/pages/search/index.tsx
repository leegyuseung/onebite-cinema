import SearchableLayout from "@/components/searchable-layout";
import RecommandMovieItem from "@/components/recommand-movie-item";
import fetchMovies from "@/lib/fetch-movies";
import { ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MovieData } from "@/types/types";
import Head from "next/head";

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
      <Head>
        <title>한입 씨네마 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입 씨네마 - 검색결과" />
        <meta
          property="og:description"
          content="한입 씨네마에 등록된 영화들을 만나보세요 🎥"
        />
      </Head>
      {movies.map((movie) => (
        <RecommandMovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
