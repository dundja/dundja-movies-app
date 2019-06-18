import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import tmdbAPI from "../api";
import * as TYPES from "../context/types";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import { MoviesContext } from "../context/moviesContext";
import { GenresContext } from "../context/genresContext";
import { ErrorContext } from "../context/errorContext";
import { MenuContext } from "../context/menuContext";
import { Element } from "react-scroll";

import Header from "../components/Header";
import Loader from "../components/Loader";
import MoviesList from "../components/MoviesList";
import Pagination from "../components/Pagination";
import NotFound from "../components/NotFound";

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-top: 4rem;
    padding: 2rem;
`;

const Genre = ({ match, history, location }) => {
    const { moviesState, moviesDispatch } = useContext(MoviesContext);
    const { genresState, genresDispatch } = useContext(GenresContext);
    const { errorState, errorDispatch } = useContext(ErrorContext);
    const { menuState, menuDispatch } = useContext(MenuContext);
    const { secure_base_url } = genresState.config.images;
    const params = queryString.parse(location.search);
    const { query } = match.params;

    useEffect(() => {
        const getSearchMovies = async (query, page, moviesDispatch) => {
            moviesDispatch({ type: TYPES.FETCH_MOVIES_LOADING });
            try {
                const res = await tmdbAPI.get(`/search/movie`, {
                    params: {
                        query,
                        page,
                        api_key: process.env.REACT_APP_APIKEY
                    }
                });
                moviesDispatch({
                    type: TYPES.FETCH_MOVIES_DATA,
                    payload: res.data
                });
                moviesDispatch({ type: TYPES.FETCH_MOVIES_FINISHED });
            } catch (err) {
                errorDispatch({
                    type: TYPES.INSERT_ERROR,
                    payload: err.response
                });
                history.push(process.env.PUBLIC_URL + "/error");
            }
        };

        getSearchMovies(query, params, moviesDispatch);

        return () => moviesDispatch({ type: TYPES.CLEAR_MOVIES });
    }, [query, params.page]);

    // If loading
    if (moviesState.loading) {
        return <Loader />;
    }

    //If there are no results
    else if (moviesState.total_results === 0) {
        return (
            <NotFound
                title="Sorry!"
                subtitle={`There were no results for ${query}...`}
            />
        );
    } else {
        return (
            <Wrapper>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{`Search Movies`}</title>
                </Helmet>
                <Element name="scroll-to-element" />
                <Header title="Search" subtitle="movies" full />
                <MoviesList
                    movies={moviesState.data.results}
                    baseUrl={secure_base_url}
                />
                <Pagination movies={moviesState.data} />
            </Wrapper>
        );
    }
};

export default Genre;
