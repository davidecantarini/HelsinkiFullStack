import "../css/MovieCard.css"

function MovieCard({movie}) {

    function onFavClick() {
        console.log("Favorite Clicked")
    }
    return <div className = "movie-card"> 
            <div className = "movie-poster">
            <img src = {`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt = {movie.title} />
                <div className = "movie-overlay">
                <button className = "favorite-btn" onClick = {onFavClick}>♡</button>  
                </div>
            </div>
            <div className = "movie-details">
            <h3 className = "movie-title"> {movie.title} </h3>
            <p className = "movie-year"> {movie.year} </p>
            </div>
    </div>

}

export default MovieCard