import React, { createContext, useReducer } from "react";
import * as TYPES from "./types";

const ErrorContext = createContext(null);

const INITIAL_STATE = {};

const errorReducer = (state, action) => {
    switch (action.type) {
        case TYPES.INSERT_ERROR:
            return {
                error: action.payload
            };
        case TYPES.CLEAR_ERROR:
            return {};
        default:
            return state;
    }
};

const ErrorProvider = props => {
    const [errorState, errorDispatch] = useReducer(errorReducer, INITIAL_STATE);

    return (
        <ErrorContext.Provider
            value={{
                errorState,
                errorDispatch
            }}
        >
            {props.children}
        </ErrorContext.Provider>
    );
};

export { ErrorProvider, ErrorContext };
