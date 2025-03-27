import movies from "@/mock/dummy.json";
import SearchableLayout from "@/components/searchable-layout";
import RecommandMovieItem from "@/components/recommand-movie-item";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
export default function Page() {
  const router = useRouter();
  const [filterMovies, setFilterMovies] = useState(movies);
  const q = (router.query.q as string) || "";

  useEffect(() => {
    const filtered = movies.filter((movie) => movie.title.includes(q));
    setFilterMovies(filtered);
  }, [q]);

  return (
    <div>
      {filterMovies.map((movie) => (
        <RecommandMovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
