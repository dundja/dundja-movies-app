import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import tmdbAPI from "../api";
import * as TYPES from "../context/types";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import { GenresContext } from "../context/genresContext";
import { MenuContext } from "../context/menuContext";
import { MoviesContext } from "../context/moviesContext";
import { Element } from "react-scroll";

import Header from "../components/Header";
import Loader from "../components/Loader";
import MoviesList from "../components/MoviesList";
import Pagination from "../components/Pagination";
import SortBy from "../components/SortBy";

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-top: 4rem;
    padding: 2rem;
`;

const Genre = ({ match, history, location }) => {
    const [option, setOption] = useState({
        value: "popularity.desc",
        label: "Popularity"
    });
    const { genresState, genresDispatch } = useContext(GenresContext);
    const { menuState, menuDispatch } = useContext(MenuContext);
    const { moviesState, moviesDispatch } = useContext(MoviesContext);
    const { secure_base_url } = genresState.config.images;
    const params = queryString.parse(location.search);
    const query = match.params.name.replace(/\s+/g, "_").toLowerCase();

    useEffect(() => {
        const setSelectedMenu = async (name, genresDispatch, menuDispatch) => {
            const { staticCategories, genres } = genresState;
            if (!name) {
                await genresDispatch({ type: TYPES.REMOVE_SELECTED_MENU });
            } else if (
                staticCategories.find(category => category === name) ||
                genres.data.genres.find(genre => genre.name === name)
            ) {
                await menuDispatch({
                    type: TYPES.SELECTED_MENU,
                    payload: name
                });
            } else {
                history.push(process.env.PUBLIC_URL + "/404");
            }
        };
        setSelectedMenu(match.params.name, genresDispatch, menuDispatch);

        return () => menuDispatch({ type: TYPES.REMOVE_SELECTED_MENU });
    }, [match.params.name]);

    useEffect(() => {
        // get movies
        const getGenreMovies = async (name, page = 1, sort, moviesDispatch) => {
            const { genres } = genresState;
            const { selected } = menuState;
            if (!selected) {
                return;
            }

            moviesDispatch({ type: TYPES.FETCH_MOVIES_LOADING });
            const genreId = genres.data.genres
                .filter(
                    el =>
                        el.name === name.charAt(0).toUpperCase() + name.slice(1)
                )
                .map(el => el.id)
                .join("");
            const res = await tmdbAPI.get("/discover/movie", {
                params: {
                    with_genres: genreId,
                    page,
                    api_key: process.env.REACT_APP_APIKEY,
                    sort_by: sort
                }
            });
            await moviesDispatch({
                type: TYPES.FETCH_MOVIES_DATA,
                payload: res.data
            });

            moviesDispatch({ type: TYPES.FETCH_MOVIES_FINISHED });
        };
        getGenreMovies(query, params.page, option.value, moviesDispatch);

        console.log({ moviesState });

        // return () => moviesDispatch({ type: TYPES.CLEAR_MOVIES });
    }, [query, params.page, option]);

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
            <SortBy option={option} setOption={setOption} />
            <MoviesList
                movies={moviesState.data.results}
                baseUrl={secure_base_url}
            />
            <Pagination movies={moviesState.data} />
        </Wrapper>
    );
};

export default Genre;
