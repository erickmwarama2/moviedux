import { useEffect, useState } from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

export default function MoviesGrid() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch("movies.json");
        const movies = await response.json();
        setMovies(movies);
      } catch (error) {
        console.log(error);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
