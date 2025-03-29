import { MovieData } from "@/types/types";

export default async function fetchRecommandMovies(): Promise<MovieData[]> {
  const url = `http://localhost:12345/movie/random`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
