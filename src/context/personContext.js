import React, { createContext, useReducer } from "react";
import * as TYPES from "./types";

const PersonContext = createContext(null);

const INITIAL_STATE = {
    loading: true
};

const personReducer = (state, action) => {
    switch (action.type) {
        case TYPES.FETCH_PERSON:
            return {
                ...state,
                data: {
                    ...action.payload
                }
            };
        case TYPES.FETCH_PERSON_LOADING:
            return {
                ...state,
                loading: true
            };
        case TYPES.FETCH_PERSON_FINISHED:
            return {
                ...state,
                loading: false
            };
        case TYPES.FETCH_PERSON_IMAGES:
            return {
                ...state,
                images: {
                    ...state.images,
                    data: {
                        ...action.payload
                    }
                }
            };
        case TYPES.FETCH_PERSON_IMAGES_LOADING:
            return {
                ...state,
                images: {
                    ...state.images,
                    loading: true
                }
            };
        case TYPES.FETCH_PERSON_IMAGES_FINISHED:
            return {
                ...state,
                images: {
                    ...state.images,
                    loading: false
                }
            };
        case TYPES.FETCH_MOVIESPERSON:
            return {
                ...state,
                movies: {
                    ...state.movies,
                    data: {
                        ...action.payload
                    }
                }
            };
        case TYPES.FETCH_MOVIESPERSON_LOADING:
            return {
                ...state,
                movies: {
                    ...state.movies,
                    loading: true
                }
            };
        case TYPES.FETCH_MOVIESPERSON_FINISHED:
            return {
                ...state,
                movies: {
                    ...state.movies,
                    loading: false
                }
            };
        case TYPES.CLEAR_PERSON:
            return {
                loading: true
            };
        default:
            return state;
    }
};

const PersonProvider = props => {
    const [personState, personDispatch] = useReducer(
        personReducer,
        INITIAL_STATE
    );

    return (
        <PersonContext.Provider
            value={{
                personState,
                personDispatch
            }}
        >
            {props.children}
        </PersonContext.Provider>
    );
};

export { PersonContext, PersonProvider };
