import React, { createContext, useReducer } from "react";
import * as TYPES from "./types";

const MoviesContext = createContext(null);

const INITIAL_STATE = {
    loading: true
};

const moviesReducer = (state, action) => {
    switch (action.type) {
        case TYPES.FETCH_MOVIES_LOADING:
            return {
                ...state,
                loading: true
            };
        case TYPES.FETCH_MOVIES_FINISHED:
            return {
                ...state,
                loading: false
            };
        case TYPES.FETCH_MOVIES_DATA:
            return {
                ...state,
                data: {
                    ...action.payload
                }
            };
        case TYPES.FETCH_MOVIES_RECOMMENDED:
            return {
                ...state,
                recomended: {
                    ...action.payload
                }
            };
        case TYPES.CLEAR_MOVIES:
            return {
                loading: true
            };
        default:
            return state;
    }
};

const MoviesProvider = props => {
    const [moviesState, moviesDispatch] = useReducer(
        moviesReducer,
        INITIAL_STATE
    );

    return (
        <MoviesContext.Provider
            value={{
                moviesState,
                moviesDispatch
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};

export { MoviesContext, MoviesProvider };
