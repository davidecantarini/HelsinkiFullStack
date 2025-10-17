import {createContext, useState, useEffect, useContext} from "react";

const MovieContext = createContext();

export function MovieProvider({children}) {
    const [favorites, setFavorites] = useState([]);
    
    useEffect(() => {       
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);
    
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);
    
    const addFavorite = (movie) => {
        setFavorites((prevFavorites) => [...prevFavorites, movie]);
    };
    
    const removeFavorite = (movieId) => {
        setFavorites((prevFavorites) => prevFavorites.filter(movie => movie.id !== movieId));
    };
    
    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId);
    };
    
    return (
        <MovieContext.Provider value={{favorites, addFavorite, removeFavorite, isFavorite}}>
            {children}
        </MovieContext.Provider>
    );
}

export function useMovieContext() {
    return useContext(MovieContext);
}