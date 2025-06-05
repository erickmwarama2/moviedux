import { useEffect, useState } from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

export default function MoviesGrid() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const onSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch("movies.json");
        const movies = await response.json();
        const filteredMovies = movies.filter((movie) =>
          movie.title.toLowerCase().includes(searchTerm)
        );
        setMovies(filteredMovies);
      } catch (error) {
        console.log(error);
      }
    }

    fetchMovies();
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search movies..."
        className="search-input"
        onChange={onSearchInput}
      />
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
