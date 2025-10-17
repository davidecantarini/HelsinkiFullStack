function MovieCard({movie}) {

    function onFavClick() {
        console.log("Favorite Clicked")
    }
    return <div className = "movie-card"> 
            <div className = "movie-poster">
            <img src = {movie.url || "https://via.placeholder.com/150"} alt = {movie.title} />
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