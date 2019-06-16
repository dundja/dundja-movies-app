import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import tmdbAPI from "../api";
import * as TYPES from "../context/types";
import { Helmet } from "react-helmet";
import queryString from "query-string";
import { MovieContext } from "../context/movieContext";
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
    const { state, dispatch } = useContext(MovieContext);
    const { secure_base_url } = state.config.images;
    const params = queryString.parse(location.search);
    const query = match.params.name.replace(/\s+/g, "_").toLowerCase();

    useEffect(() => {
        console.log("Discover mounted", state);
        const setSelectedMenu = async (name, dispatch) => {
            const { staticCategories, genres } = state;
            if (!name) {
                await dispatch({ type: TYPES.REMOVE_SELECTED_MENU });
            } else if (
                staticCategories.find(category => category === name) ||
                genres.genres.find(genre => genre.name === name)
            ) {
                await dispatch({
                    type: TYPES.SELECTED_MENU,
                    payload: name
                });
            } else {
                history.push(process.env.PUBLIC_URL + "/404");
            }
        };
        setSelectedMenu(match.params.name, dispatch);

        // return () => setSelectedMenu();
    }, [match.params.name]);

    useEffect(() => {
        // get movies
        const getDiscoverMovies = async (name, page = 1, dispatch) => {
            const { selected } = state;
            if (!selected) {
                return;
            }

            dispatch({ type: TYPES.FETCH_MOVIES_LOADING });
            const res = await tmdbAPI.get(`/movie/${name}`, {
                params: {
                    page,
                    api_key: process.env.REACT_APP_APIKEY
                }
            });
            await dispatch({
                type: TYPES.FETCH_MOVIES_DATA,
                payload: res.data
            });
            dispatch({ type: TYPES.FETCH_MOVIES_FINISHED });
        };
        getDiscoverMovies(query, params.page, dispatch);

        // return () => getDiscoverMovies();
    }, [query, params.page]);

    if (state.movies.loading) {
        return (
            <Wrapper>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{`${state.selected} Movies`}</title>
                </Helmet>
                <Header title={state.selected} subtitle="movies" />
                <Loader />
            </Wrapper>
        );
    }

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        swipeToSlide: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

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
};

export default Discover;
