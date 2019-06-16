import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";
import * as TYPES from "../context/types";
import { Link } from "react-router-dom";
import { MovieContext } from "../context/movieContext";
import tmdbAPI from "../api";
import { Helmet } from "react-helmet";
import queryString from "query-string";
import history from "../history";
import LazyLoad from "react-lazyload";
import { Element, animateScroll as scroll } from "react-scroll";
import { FaPlay } from "react-icons/fa";

import NotFoundImg from "../assets/img/not-found.png";
import imdbLogo from "../assets/img/imdb-seeklogo.com.svg";
import Loader from "../components/Loader";
import Toggler from "../components/Toggler";
import Cast from "../components/Cast";
import Loading from "../components/Loading";
import Button from "../components/Button";

const Wrapper = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    flex-direction: column;
    margin-top: 4rem;
    padding: 2rem;
    overflow: hidden;
`;

const MovieHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 3rem;
`;

const PosterWrapper = styled.figure`
    position: relative;
    z-index: 10;
    -webkit-filter: sepia(0.3);
    filter: sepia(0.3);

    &:after,
    &:before {
        content: "";
        display: block;
        height: 99.5%;
        width: 100%;
        top: 0;
        left: 0;
        position: absolute;
        pointer-events: none;
    }
    &:before {
        z-index: 12;
    }
    &:after {
        z-index: 13;
    }
    &::after {
        background: -webkit-radial-gradient(
            circle,
            #e6e7e0 40%,
            rgba(43, 42, 161, 0.6) 110%
        );
        background: radial-gradient(
            circle,
            #e6e7e0 40%,
            rgba(43, 42, 161, 0.6) 110%
        );
        mix-blend-mode: color-burn;
    }
`;

const Poster = styled.img`
    width: 100%;
    height: 100%;
    z-index: 11;
`;

const MovieDetailsWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 1.5rem;
    /* margin-top: -5rem; */
    background-color: ${props =>
        props.dark
            ? "var(--color-lightDarkBlue)"
            : "var(--color-darkDarkBlue)"};
`;

const MovieTitle = styled.h2`
    font-size: 3.5rem;
    color: var(--color-lightMainWhite);
    text-transform: capitalize;
    display: block;
    margin-bottom: 1rem;
`;

const MainDetailsWrapper = styled.div`
    display: flex;
    width: 60%;
`;

const MainDetails = styled.div`
    position: relative;
    padding: 0.5rem 1rem;
    color: white;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    &:after {
        content: "";
        background-color: white;
        position: absolute;
        right: 0;
        margin-left: 1rem;
        height: 60%;
        width: 1px;
    }
`;

const MainDetailsTextLink = styled(Link)`
    font-size: 1.4rem;
    position: relative;
    transition: all 0.3s ease-in-out;
    color: inherit;

    &:after {
        content: "";
        position: absolute;
        left: 0;
        top: 100%;
        width: 0;
        height: 1px;
        background-color: white;
        transition: all 0.3s ease-in-out;
    }

    &:hover {
        &:after {
            width: 100%;
        }
    }
`;

const MainDetailsText = styled.span`
    font-size: 1.4rem;
`;

const PegiAdult = styled.span`
    border: 1px solid white;
    font-size: 1.3rem;
    padding: 0.3rem 0.5rem;
`;

const ImdbLogo = styled.img`
    width: 2.5rem !important;
    height: 1.5rem !important;
`;

const ImdbRaiting = styled.a`
    background-color: transparent;
    color: #999;
    font-size: 1rem;
    position: relative;
    display: flex;
    align-items: center;

    & > span {
        font-size: 1.4rem;
        color: white;
        margin-left: 0.5rem;
    }
`;

const InnerWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin-top: 3rem;
    padding-bottom: 2rem;
`;

const Line = styled.div`
    margin: 0 2.5rem;
    height: 7rem;
    width: 0.1rem;
    border-bottom: 1px solid white;
    border-radius: 1rem;
    background-color: white;
`;

const InnerDesc = styled.div`
    width: 50%;
    flex: 1;
    height: 100%;

    & p {
        font-size: 1.4rem;
        color: white;
    }
`;

const InnerDescTagline = styled.h2`
    font-size: 2.2rem;
    font-weight: 300;
    color: ${props =>
        props.dark
            ? "var(--color-lightDarkBlue)"
            : "var(--color-lightDarkBlue)"};
    margin-bottom: 1.5rem;
`;

const InnerStats = styled.div`
    max-width: 50%;
    width: 50%;
    flex: 1;
    position: relative;
`;

const StatsHeader = styled.h2`
    font-size: 1.6rem;
    color: ${props =>
        props.dark
            ? "var(--color-lightDarkBlue)"
            : "var(--color-lightDarkBlue)"};
`;

const StatsInner = styled.div`
    width: 100%;
    height: 5rem;
    margin-bottom: 0.8rem;
`;

const StatsText = styled.p`
    font-size: 1.4rem;
    color: ${props =>
        props.dark
            ? "var(--color-lightMainWhite)"
            : "var(--color-lightMainWhite)"};
`;
// Movie component
const Movie = ({ location, match }) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const { state, dispatch } = useContext(MovieContext);
    const movieId = match.params.id;
    const { secure_base_url } = state.config.images;
    const { base_url } = state.config.images;
    const { poster_sizes } = state.config.images;

    useEffect(() => {
        scroll.scrollToTop({
            smooth: true
        });

        const getMovie = async (id, dispatch) => {
            dispatch({ type: TYPES.FETCH_MOVIE_LOADING });
            const res = await tmdbAPI.get(`/movie/${id}`, {
                params: {
                    api_key: process.env.REACT_APP_APIKEY,
                    append_to_response: "videos"
                }
            });
            dispatch({ type: TYPES.FETCH_MOVIE, payload: res.data });
            dispatch({ type: TYPES.FETCH_MOVIE_FINISHED });
        };

        const getCast = async (id, dispatch) => {
            const res = await tmdbAPI.get(`/movie/${id}/credits`, {
                params: {
                    api_key: process.env.REACT_APP_APIKEY
                }
            });
            dispatch({ type: TYPES.FETCH_CAST, payload: res.data.cast });
        };

        getMovie(movieId, dispatch);
        getCast(movieId, dispatch);

        return () => {
            dispatch({ type: TYPES.CLEAR_MOVIE });
            setLoaded(false);
        };
    }, [match.params.id]);

    useEffect(() => {
        console.log({ state });
    }, [loaded]);

    // Render Trailer button. On click triggers state to open modal of trailer
    function renderYouTube(videos) {
        if (videos.length === 0) {
            return;
        }
        const { key } = videos.find(
            video => video.type === "Trailer" && video.site === "YouTube"
        );

        const opts = {
            height: "390px",
            width: "640px"
        };

        return (
            <div>
                <YouTube videoId={key} opts={opts} />
            </div>
        );
    }

    if (state.movie.loading && !state.movie.data && !loaded) {
        return <Loader />;
    }

    if (state.movie.status_code) {
        history.push(process.env.PUBLIC_URL + "/404");
    }

    return (
        <Wrapper>
            <Helmet>
                <title>{`${state.movie.data.title} - Movie Library`}</title>
            </Helmet>
            <LazyLoad height={800}>
                <Element name="scroll-to-element" />
                <Toggler />
                <MovieHeaderWrapper>
                    <PosterWrapper>
                        <Poster
                            style={!loaded ? { display: "none" } : {}}
                            src={`${base_url}/${poster_sizes[3]}/${
                                state.movie.data.poster_path
                            }`}
                            alt="movie poster"
                            onLoad={() => setLoaded(true)}
                            onError={e => {
                                setError(true);
                                if (e.target.src !== `${NotFoundImg}`) {
                                    e.target.src = `${NotFoundImg}`;
                                }
                            }}
                        />
                    </PosterWrapper>
                    {/* right side header */}
                    {renderYouTube(state.movie.data.videos.results)}
                </MovieHeaderWrapper>
                <MovieDetailsWrapper>
                    <MovieTitle>{state.movie.data.title}</MovieTitle>
                    <MainDetailsWrapper>
                        <MainDetails>
                            <MainDetailsText>
                                {handleReleseDate(
                                    state.movie.data.release_date
                                )}
                            </MainDetailsText>
                        </MainDetails>
                        <MainDetails>
                            {handleGenres(state.movie.data.genres)}
                        </MainDetails>
                        <MainDetailsText>
                            <MainDetails>
                                {handlePEGI(state.movie.data.adult)}
                            </MainDetails>
                        </MainDetailsText>
                        <MainDetails>
                            {handleIMDB(
                                state.movie.data.imdb_id,
                                state.movie.data.vote_average
                            )}
                        </MainDetails>
                    </MainDetailsWrapper>
                    {/* Inner details */}
                    <InnerWrapper>
                        {/* left side */}
                        <InnerDesc>
                            <InnerDescTagline>
                                {state.movie.data.tagline}
                            </InnerDescTagline>
                            <p>{state.movie.data.overview}</p>
                        </InnerDesc>
                        {/* line */}
                        <Line />
                        {/* right side */}
                        <InnerStats>
                            {/* Cast */}
                            <Cast
                                cast={state.movie.cast}
                                baseUrl={secure_base_url}
                            />
                            {/* Language */}
                            <StatsInner>
                                <StatsHeader>Language</StatsHeader>
                                <StatsText>
                                    {state.movie.data.original_language.toUpperCase()}
                                </StatsText>
                            </StatsInner>
                            {/* Length */}
                            <StatsInner>
                                <StatsHeader>Length</StatsHeader>
                                <StatsText>
                                    {state.movie.data.runtime} min.
                                </StatsText>
                            </StatsInner>
                            {/* Budget */}
                            <StatsInner>
                                <StatsHeader>Budget</StatsHeader>
                                <StatsText>
                                    {handleBudget(state.movie.data.budget)}
                                </StatsText>
                            </StatsInner>
                        </InnerStats>
                    </InnerWrapper>
                </MovieDetailsWrapper>
            </LazyLoad>
        </Wrapper>
    );
};

// handle release date
const handleReleseDate = fullDate => {
    const date = fullDate.split("-");
    return date[0];
};

// handle genres
const handleGenres = genresArr => {
    return genresArr.map(genre => (
        <MainDetailsTextLink
            to={`${process.env.PUBLIC_URL}/genres/${genre.name}`}
            key={genre.id}
        >
            {genre.name},{" "}
        </MainDetailsTextLink>
    ));
};

// handle PEGI
const handlePEGI = isAdult => {
    if (!isAdult) {
        return <PegiAdult>12+</PegiAdult>;
    } else {
        return <PegiAdult>18+</PegiAdult>;
    }
};

// handle IMDB
const handleIMDB = (id, avgVote) => {
    return (
        <ImdbRaiting target="_blank" href={`https://www.imdb.com/title/${id}`}>
            <ImdbLogo src={imdbLogo} alt="imdb logo" />
            <span>{avgVote}</span>
            <b>/ 10</b>
        </ImdbRaiting>
    );
};

const handleBudget = budget => {
    return `$ ${budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export default Movie;
