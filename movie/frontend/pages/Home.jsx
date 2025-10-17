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

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm("");
    }


    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                type="text" 
                placeholder="Search movies..." 
                className="search-input" 
                value = {searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}/>
                <button type="submit" className="search-button">Search</button>
            </form>
    
            <div className="movie-grid">
            {movies.map(
                (movie) => 
                movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                <MovieCard movie={movie} key={movie.id} />
            )}
            </div>
        </div>
);
}

export default Home