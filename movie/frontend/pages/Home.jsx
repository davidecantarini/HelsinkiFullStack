import MovieCard from "../src/components/MovieCard"
import { useEffect, useState } from "react"
import "../src/css/Home.css"
import { getPopularMovies, searchMovies } from "../src/services/api";


function Home() {

    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (error) {
                setError("Failed to load popular movies.");
                console.error(error);
            }
            finally {
            setLoading(false);
            }
        };
        loadPopularMovies();
}, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        if (loading) return;

        setLoading(true);
        try {
            const results = await searchMovies(searchTerm);
                setMovies(results);
                setError(null);
            }
        catch (error) {
            setError("Failed to search movies.");
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };

    console.log("Loading:", loading);

    return (
  <div className="home">
    <form onSubmit={handleSearch} className="search-form">
      <input 
        type="text" 
        placeholder="Search movies..." 
        className="search-input" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="search-button">Search</button>
    </form>

    {loading ? (
      <div className="loading">Loading movies...</div>
    ) : error ? (
      <div className="error">{error}</div>
    ) : (
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    )}
  </div>
);

}
export default Home