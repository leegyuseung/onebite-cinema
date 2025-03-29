import { MovieData } from "@/types/types";

export default async function fetchDetailMovie(
  id: number
): Promise<MovieData | null> {
  const url = `http://localhost:12345/movie/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
