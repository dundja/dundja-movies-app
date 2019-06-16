import React, { createContext, useReducer } from "react";
import * as TYPES from "./types";

const MovieContext = createContext(null);

const INITIAL_STATE = {
    staticCategories: ["Popular", "Top Rated", "Upcoming"],
    genres: {
        loading: true
    },
    movies: {
        loading: true
    },
    movie: {
        loading: true
    }
};

const moviesReducer = (state, action) => {
    if (action.type === TYPES.GET_CONFIG) {
        return {
            ...state,
            config: action.payload
        };
    }
    if (action.type === TYPES.FETCH_GENRES) {
        return {
            ...state,
            genres: {
                ...state.genres,
                data: action.payload
            }
        };
    }
    if (action.type === TYPES.FETCH_GENRES_LOADING) {
        return {
            ...state,
            genres: {
                ...state.genres,
                loading: true
            }
        };
    }
    if (action.type === TYPES.FETCH_GENRES_FINISHED) {
        return {
            ...state,
            genres: {
                ...state.genres,
                loading: false
            }
        };
    }
    if (action.type === TYPES.FETCH_MOVIES_LOADING) {
        return {
            ...state,
            movies: {
                ...state.movies,
                loading: true
            }
        };
    }
    if (action.type === TYPES.FETCH_MOVIES_FINISHED) {
        return {
            ...state,
            movies: {
                ...state.movies,
                loading: false
            }
        };
    }
    if (action.type === TYPES.SELECTED_MENU) {
        return {
            ...state,
            selected: action.payload
        };
    }
    if (action.type === TYPES.REMOVE_SELECTED_MENU) {
        return {
            ...state,
            selected: ""
        };
    }
    if (action.type === TYPES.FETCH_MOVIES_DATA) {
        return {
            ...state,
            movies: {
                ...state.movies,
                data: action.payload
            }
        };
    }
    if (action.type === TYPES.INSERT_ERROR) {
        return {
            ...state,
            error: action.payload
        };
    }
    if (action.type === TYPES.FETCH_MOVIE_LOADING) {
        return {
            ...state,
            movie: {
                ...state.movie,
                loading: true
            }
        };
    }
    if (action.type === TYPES.FETCH_MOVIE_FINISHED) {
        return {
            ...state,
            movie: {
                ...state.movie,
                loading: false
            }
        };
    }
    if (action.type === TYPES.FETCH_MOVIE) {
        return {
            ...state,
            movie: {
                ...state.movie,
                data: action.payload
            }
        };
    }
    if (action.type === TYPES.FETCH_CAST) {
        return {
            ...state,
            movie: {
                ...state.movie,
                cast: action.payload
            }
        };
    }
    if (action.type === TYPES.CLEAR_MOVIE) {
        return {
            ...state,
            movie: {
                loading: true
            }
        };
    }
    return state;
};

const MovieProvider = props => {
    const [state, dispatch] = useReducer(moviesReducer, INITIAL_STATE);

    return (
        <MovieContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {props.children}
        </MovieContext.Provider>
    );
};

export { MovieContext, MovieProvider };
