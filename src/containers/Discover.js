import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import tmdbAPI from "../api";
import * as TYPES from "../context/types";
import { Helmet } from "react-helmet";
import queryString from "query-string";
import { MenuContext } from "../context/menuContext";
import { MoviesContext } from "../context/moviesContext";
import { GenresContext } from "../context/genresContext";
import { Element } from "react-scroll";

import Header from "../components/Header";
import Loader from "../components/Loader";
import MoviesList from "../components/MoviesList";
import Pagination from "../components/Pagination";

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-top: 4rem;
    padding: 2rem;
`;

const Discover = ({ match, history, location }) => {
    const { menuState, menuDispatch } = useContext(MenuContext);
    const { moviesState, moviesDispatch } = useContext(MoviesContext);
    const { genresState, genresDispatch } = useContext(GenresContext);
    const { secure_base_url } = genresState.config.images;
    const params = queryString.parse(location.search);
    const query = match.params.name.replace(/\s+/g, "_").toLowerCase();

    useEffect(() => {
        const setSelectedMenu = async (name, menuDispatch) => {
            const { staticCategories, genres } = genresState;
            if (!name) {
                await menuDispatch({ type: TYPES.REMOVE_SELECTED_MENU });
            } else if (
                staticCategories.find(category => category === name) ||
                genres.genres.find(genre => genre.name === name)
            ) {
                await menuDispatch({
                    type: TYPES.SELECTED_MENU,
                    payload: name
                });
            } else {
                history.push(process.env.PUBLIC_URL + "/404");
            }
        };
        setSelectedMenu(match.params.name, menuDispatch);

        return () => menuDispatch({ type: TYPES.REMOVE_SELECTED_MENU });
    }, [match.params.name]);

    useEffect(() => {
        // get movies
        const getDiscoverMovies = async (name, page = 1, moviesDispatch) => {
            const { selected } = menuState;
            if (!selected) {
                return;
            }

            moviesDispatch({ type: TYPES.FETCH_MOVIES_LOADING });
            const res = await tmdbAPI.get(`/movie/${name}`, {
                params: {
                    page,
                    api_key: process.env.REACT_APP_APIKEY
                }
            });
            await moviesDispatch({
                type: TYPES.FETCH_MOVIES_DATA,
                payload: res.data
            });
            moviesDispatch({ type: TYPES.FETCH_MOVIES_FINISHED });
        };
        getDiscoverMovies(query, params.page, moviesDispatch);

        // return () => moviesDispatch({ type: TYPES.CLEAR_MOVIES });
    }, [query, params.page]);

    if (moviesState.loading) {
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`${menuState.selected} Movies`}</title>
            </Helmet>
            <Element name="scroll-to-element" />
            <Header title={menuState.selected} subtitle="movies" full />
            <MoviesList
                movies={moviesState.data.results}
                baseUrl={secure_base_url}
            />
            <Pagination movies={moviesState.data} />
        </Wrapper>
    );
};

export default Discover;
