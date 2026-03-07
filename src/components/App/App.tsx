import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieGrid from "../../components/MuvieGrid/MuvieGrid";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessase";
import MovieModal from "../../components/ MovieModal/ MovieModal";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import styles from "./App.module.css";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setError(false);
      setMovies([]);

      const results = await fetchMovies(query);

      if (results.length === 0) {
        toast.error("No movies found for your request.");
      }

      setMovies(results);
    } catch (error) {
      setError(true);
      console.error("Search error:", error);
      toast.error("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      <main className={styles.main}>
        {loading && <Loader />}
        {error && <ErrorMessage />}
        {!loading && !error && (
          <MovieGrid movies={movies} onSelect={handleSelectMovie} />
        )}
      </main>
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
