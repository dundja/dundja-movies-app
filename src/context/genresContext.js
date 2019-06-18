import React, { createContext, useReducer } from "react";
import * as TYPES from "./types";

const GenresContext = createContext(null);

const INITIAL_STATE = {
    staticCategories: ["Popular", "Top Rated", "Upcoming"],
    genres: {
        loading: true
    }
};

const genresReducer = (state, action) => {
    switch (action.type) {
        case TYPES.GET_CONFIG:
            return {
                ...state,
                config: action.payload
            };
        case TYPES.FETCH_GENRES:
            return {
                ...state,
                genres: {
                    ...state.genres,
                    data: action.payload
                }
            };
        case TYPES.FETCH_GENRES_LOADING:
            return {
                ...state,
                genres: {
                    ...state.genres,
                    loading: true
                }
            };
        case TYPES.FETCH_GENRES_FINISHED:
            return {
                ...state,
                genres: {
                    ...state.genres,
                    loading: false
                }
            };
        default:
            return state;
    }
};

const GenresProvider = props => {
    const [genresState, genresDispatch] = useReducer(
        genresReducer,
        INITIAL_STATE
    );

    return (
        <GenresContext.Provider
            value={{
                genresState,
                genresDispatch
            }}
        >
            {props.children}
        </GenresContext.Provider>
    );
};

export { GenresContext, GenresProvider };
