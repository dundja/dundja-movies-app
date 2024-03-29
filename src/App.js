import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { Switch, Route, Redirect } from "react-router-dom";
import * as TYPES from "./context/types";
import tmdbAPI from "./api";
import { GenresContext } from "./context/genresContext";
import { MenuContext } from "./context/menuContext";
import { ThemeContext } from "./context/themeContext";
import { Element } from "react-scroll";

import Sidebar from "./containers/Sidebar";
import Loader from "./components/Loader";
import Genre from "./containers/Genre";
import Discover from "./containers/Discover";
import NotFound from "./components/NotFound";
import Movie from "./containers/Movie";
import Search from "./containers/Search";
import Person from "./containers/Person";
import MenuMobile from "./containers/MenuMobile";

const OuterLayout = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
    background-color: ${props =>
        props.dark
            ? "var(--color-darkMainWhite)"
            : "var(--color-lightFeatured)"};
`;

const Layout = styled.div`
    height: 100%;
    max-width: 120rem;
    width: 100%;
    margin: 0 auto;
    background-color: ${props =>
        props.dark
            ? "var(--color-darkDarkBlue)"
            : "var(--color-darkMainWhite)"};
`;

const AppWrapper = styled.main`
    display: flex;
    flex-direction: ${props => (props.isMobile ? "column" : "row")};
    justify-content: space-between;
    width: 100%;
    height: 100%;
    position: relative;
    background-color: ${props =>
        props.dark
            ? "var(--color-darkDarkBlue)"
            : "var(--color-darkMainWhite)"};
`;

function App() {
    const { genresState, genresDispatch } = useContext(GenresContext);
    const { menuState, menuDispatch } = useContext(MenuContext);
    const { theme } = useContext(ThemeContext);
    const [isMobile, setisMobile] = useState(null);

    // Get genres from API
    const getGenres = async (genresDispatch, menuDispatch) => {
        const res = await tmdbAPI.get("/genre/movie/list", {
            params: {
                api_key: process.env.REACT_APP_APIKEY
            }
        });
        genresDispatch({
            type: TYPES.FETCH_GENRES,
            payload: res.data
        });
        menuDispatch({
            type: TYPES.SELECTED_MENU,
            payload: "Popular"
        });
    };

    const getConfig = async genresDispatch => {
        const res = await tmdbAPI.get("/configuration", {
            params: {
                api_key: process.env.REACT_APP_APIKEY
            }
        });
        genresDispatch({
            type: TYPES.GET_CONFIG,
            payload: res.data
        });
    };

    const changeMobile = () => {
        window.matchMedia("(max-width: 1000px)").matches
            ? setisMobile(true)
            : setisMobile(false);
    };

    useEffect(() => {
        // When app inits
        const init = async (genresDispatch, menuDispatch) => {
            genresDispatch({ type: TYPES.FETCH_GENRES_LOADING });
            await getGenres(genresDispatch, menuDispatch);
            await getConfig(genresDispatch);
            genresDispatch({ type: TYPES.FETCH_GENRES_FINISHED });
        };
        init(genresDispatch, menuDispatch);
    }, []);

    useEffect(() => {
        changeMobile();
        window.addEventListener("resize", changeMobile);
        return () => window.removeEventListener("resize", changeMobile);
    }, []);

    return genresState.genres.loading ? (
        <OuterLayout dark={theme.dark}>
            <Layout>
                <AppWrapper>
                    <Loader />
                </AppWrapper>
            </Layout>
        </OuterLayout>
    ) : (
        <OuterLayout dark={theme.dark}>
            <Layout>
                <AppWrapper dark={theme.dark} isMobile={isMobile}>
                    {isMobile ? (
                        <MenuMobile
                            genresState={genresState}
                            menuState={menuState}
                            dark={theme.dark}
                        />
                    ) : (
                        <Sidebar />
                    )}
                    <Element />
                    <Switch>
                        <Route
                            path={process.env.PUBLIC_URL + "/"}
                            exact
                            render={() => (
                                <Redirect
                                    from={process.env.PUBLIC_URL + "/"}
                                    to={
                                        process.env.PUBLIC_URL +
                                        "/discover/Popular"
                                    }
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
                            path={process.env.PUBLIC_URL + "/person/:id"}
                            exact
                            component={Person}
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
            </Layout>
        </OuterLayout>
    );
}

export default App;
