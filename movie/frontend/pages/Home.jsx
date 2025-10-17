import MovieCard from "../components/MovieCard"
import { useState } from "react"

function Home() {

    const [searchTerm, setSearchTerm] = useState("");


    const movies = [
        { id: 1, title: "Inception", year: 2010 },
        { id: 2,title: "Interstellar", year: 2014 },  
        { id: 3,title: "The Dark Knight", year: 2008 },
        { id: 4,title: "The Matrix", year: 1999}
        
    ]

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