import React, { createContext, useReducer } from "react";
import * as TYPES from "./types";

const CastContext = createContext(null);

const INITIAL_STATE = {
    loading: true
};

const castReducer = (state, action) => {
    switch (action.type) {
        case TYPES.FETCH_CAST_LOADING:
            return {
                ...state,
                loading: true
            };
        case TYPES.FETCH_CAST_FINISHED:
            return {
                ...state,
                loading: false
            };
        case TYPES.FETCH_CAST:
            return {
                ...state,
                data: {
                    ...action.payload
                }
            };
        case TYPES.CLEAR_CAST:
            return {
                loading: true
            };
        default:
            return state;
    }
};

const CastProvider = props => {
    const [castState, castDispatch] = useReducer(castReducer, INITIAL_STATE);

    return (
        <CastContext.Provider
            value={{
                castState,
                castDispatch
            }}
        >
            {props.children}
        </CastContext.Provider>
    );
};

export { CastContext, CastProvider };
