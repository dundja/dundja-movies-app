import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { Switch, Route, Redirect } from "react-router-dom";
import * as TYPES from "./context/types";
import tmdbAPI from "./api";
import { MovieContext } from "./context/movieContext";
import { ThemeContext } from "./context/themeContext";

import Sidebar from "./containers/Sidebar";
import Loader from "./components/Loader";
import Genre from "./containers/Genre";
import Discover from "./containers/Discover";
import NotFound from "./components/NotFound";
import Movie from "./containers/Movie";
import Search from "./containers/Search";

const AppWrapper = styled.main`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    position: relative;
    background-color: ${props =>
        props.dark ? "var(--color-darkDarkBlue)" : "var(--color-lightWhite)"};
`;

function App() {
    const { state, dispatch } = useContext(MovieContext);
    const { theme, dispatchTheme } = useContext(ThemeContext);

    // Get genres from API
    const getGenres = async dispatch => {
        const res = await tmdbAPI.get("/genre/movie/list", {
            params: {
                api_key: process.env.REACT_APP_APIKEY
            }
        });
        dispatch({
            type: TYPES.FETCH_GENRES,
            payload: res.data
        });
        dispatch({
            type: TYPES.SELECTED_MENU,
            payload: "Popular"
        });
    };

    const getConfig = async dispatch => {
        const res = await tmdbAPI.get("/configuration", {
            params: {
                api_key: process.env.REACT_APP_APIKEY
            }
        });
        dispatch({
            type: TYPES.GET_CONFIG,
            payload: res.data
        });
    };

    useEffect(() => {
        // When app inits
        const init = async dispatch => {
            dispatch({ type: TYPES.FETCH_GENRES_LOADING });
            await getGenres(dispatch);
            await getConfig(dispatch);
            dispatch({ type: TYPES.FETCH_GENRES_FINISHED });
        };
        init(dispatch);
    }, []);

    return state.genres.loading ? (
        <AppWrapper>
            <Loader />
        </AppWrapper>
    ) : (
        <AppWrapper dark={theme.dark}>
            <Sidebar />
            <Switch>
                <Route
                    path={process.env.PUBLIC_URL + "/"}
                    exact
                    render={() => (
                        <Redirect
                            from={process.env.PUBLIC_URL + "/"}
                            to={process.env.PUBLIC_URL + "/discover/Popular"}
                        />
                    )}
                />
                <Route
                    path={process.env.PUBLIC_URL + "/genres/:name"}
                    exact
                    component={Genre}
                />
                <Route
                    path={process.env.PUBLIC_URL + "/discover/:name"}
                    exact
                    component={Discover}
                />
                <Route
                    path={process.env.PUBLIC_URL + "/movie/:id"}
                    exact
                    component={Movie}
                />
                <Route
                    path={process.env.PUBLIC_URL + "/search/:query"}
                    exact
                    component={Search}
                />
                <Route
                    path="/404"
                    component={() => (
                        <NotFound
                            title="Upps!"
                            subtitle={`This doesn't exist...`}
                        />
                    )}
                />
                <Route
                    component={() => (
                        <NotFound
                            title="Upps!"
                            subtitle={`This doesn't exist...`}
                        />
                    )}
                />
            </Switch>
        </AppWrapper>
    );
}

export default App;
