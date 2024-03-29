import React, { createContext, useReducer } from "react";
import * as TYPES from "./types";

const MovieContext = createContext(null);

const INITIAL_STATE = {
    loading: true
};

const moviesReducer = (state, action) => {
    switch (action.type) {
        case TYPES.FETCH_MOVIE_LOADING:
            return {
                ...state,
                loading: true
            };
        case TYPES.FETCH_MOVIE_FINISHED:
            return {
                ...state,
                loading: false
            };
        case TYPES.FETCH_MOVIE:
            return {
                ...state,
                data: {
                    ...action.payload
                }
            };
        case TYPES.CLEAR_MOVIE:
            return {
                loading: true
            };
        default:
            return state;
    }
};

const MovieProvider = props => {
    const [movieState, movieDispatch] = useReducer(
        moviesReducer,
        INITIAL_STATE
    );

    return (
        <MovieContext.Provider
            value={{
                movieState,
                movieDispatch
            }}
        >
            {props.children}
        </MovieContext.Provider>
    );
};

export { MovieContext, MovieProvider };
