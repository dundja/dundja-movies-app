import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import tmdbAPI from "../api";
import * as TYPES from "../context/types";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import { MovieContext } from "../context/movieContext";
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
    const { state, dispatch } = useContext(MovieContext);
    const { secure_base_url } = state.config.images;
    const params = queryString.parse(location.search);
    const query = match.params.name.replace(/\s+/g, "_").toLowerCase();

    useEffect(() => {}, [match.params.name]);

    // If loading
    if (state.movies.loading) {
        return <Loader />;
    }

    //If there are no results
    else if (state.movies.total_results === 0) {
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
                    <title>{`${state.selected} Movies`}</title>
                </Helmet>
                <Element name="scroll-to-element" />
                <Header title={state.selected} subtitle="movies" />
                <MoviesList
                    movies={state.movies.data.results}
                    baseUrl={secure_base_url}
                />
                <Pagination movies={state.movies.data} />
            </Wrapper>
        );
    }
};

export default Genre;
