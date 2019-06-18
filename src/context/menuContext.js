import React, { createContext, useReducer } from "react";
import * as TYPES from "./types";

const MenuContext = createContext(null);

const INITIAL_STATE = {};

const menuReducer = (state, action) => {
    switch (action.type) {
        case TYPES.SELECTED_MENU:
            return {
                selected: action.payload
            };
        case TYPES.REMOVE_SELECTED_MENU:
            return {};
        default:
            return state;
    }
};

const MenuProvider = props => {
    const [menuState, menuDispatch] = useReducer(menuReducer, INITIAL_STATE);

    return (
        <MenuContext.Provider
            value={{
                menuState,
                menuDispatch
            }}
        >
            {props.children}
        </MenuContext.Provider>
    );
};

export { MenuProvider, MenuContext };
