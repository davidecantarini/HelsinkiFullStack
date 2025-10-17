import "../src/css/Favorites.css"
import { useMovieContext } from "../src/context/MovieContext"
import MovieCard from "../src/components/MovieCard"

function Favorites() {
    const {favorites} = useMovieContext();

    if (favorites.length === 0) {
        return <EmptyFavorites />
    }

    return <div className = "favorites-list">
        <h2>Your Favorite Movies</h2>
        <div className = "movies-grid">
            {favorites.map((movie) => (
                <MovieCard key = {movie.id} movie = {movie} />
            ))}
        </div>
    </div>
}

function EmptyFavorites() {
    return <div className = "empty-favorites">
        <h2>No Favorite Movies Yet</h2>
        <p>You haven't added any movies to your favorites. Go back to the <a href = "/">home page</a> to add some!</p>
    </div>
}   



export default Favorites