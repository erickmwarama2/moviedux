import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "./App.css";
import "./styles.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MoviesGrid from "./components/MoviesGrid";
import Watchlist from "./components/Watchlist";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

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

  const toggleWatchlist = (movieId) => {
    setWatchlist((watchlist) => {
      return watchlist.includes(movieId)
        ? watchlist.filter((id) => id !== movieId)
        : [...watchlist, movieId];
    });
  };

  return (
    <div className="App">
      <div className="container">
        <Header />
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/"> Home </Link>
              </li>
              <li>
                <Link to="/watchlist"> Watchlist </Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <MoviesGrid
                  movies={movies}
                  watchlist={watchlist}
                  toggleWatchlist={toggleWatchlist}
                />
              }
            />
            <Route
              path="/watchlist"
              element={
                <Watchlist
                  watchlist={watchlist}
                  toggleWatchlist={toggleWatchlist}
                  movies={movies}
                />
              }
            />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
