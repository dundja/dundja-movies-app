import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";
import * as TYPES from "../context/types";
import { Link } from "react-router-dom";
import { GenresContext } from "../context/genresContext";
import { MovieContext } from "../context/movieContext";
import { CastContext } from "../context/castContext";
import { ThemeContext } from "../context/themeContext";
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
import Header from "../components/Header";

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
    color: ${props =>
        props.dark
            ? "var(--color-darkDarkBlue)"
            : "var(--color-darkMainWhite)"};
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
    display: flex;
    align-items: center;
    justify-content: flex-start;

    &:after {
        content: "";
        background-color: ${props =>
            props.dark
                ? "var(--color-darkDarkBlue)"
                : "var(--color-darkMainWhite)"};
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
    color: ${props =>
        props.dark
            ? "var(--color-darkDarkBlue)"
            : "var(--color-darkMainWhite)"};

    &:after {
        content: "";
        position: absolute;
        left: 0;
        top: 100%;
        width: 0;
        height: 1px;
        background-color: ${props =>
            props.dark
                ? "var(--color-darkDarkBlue)"
                : "var(--color-darkMainWhite)"};
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
    color: ${props =>
        props.dark
            ? "var(--color-darkDarkBlue)"
            : "var(--color-darkMainWhite)"};
`;

const PegiAdult = styled.span`
    border: ${props =>
        props.dark
            ? "1px solid var(--color-darkDarkBlue)"
            : " 1px solid var(--color-darkMainWhite)"};
    font-size: 1.3rem;
    padding: 0.3rem 0.5rem;
    color: ${props =>
        props.dark
            ? "var(--color-darkDarkBlue)"
            : "var(--color-darkMainWhite)"};
`;

const ImdbLogo = styled.img`
    width: 2.5rem !important;
    height: 1.5rem !important;
`;

const ImdbRaiting = styled.a`
    background-color: transparent;
    color: ${props =>
        props.dark ? "var(--color-darkFeatured)" : "var(--color-darkFeatured)"};
    font-size: 1rem;
    position: relative;
    display: flex;
    align-items: center;

    & > span {
        font-size: 1.4rem;
        color: ${props =>
            props.dark
                ? "var(--color-darkDarkBlue)"
                : "var(--color-darkMainWhite)"};
        margin-left: 0.5rem;
        font-weight: 600;
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
    background-color: ${props =>
        props.dark
            ? "var(--color-darkDarkBlue)"
            : "var(--color-darkMainWhite)"};
`;

const InnerDesc = styled.div`
    width: 50%;
    flex: 1;
    height: 100%;

    & p {
        font-size: 1.4rem;
        color: ${props =>
            props.dark
                ? "var(--color-darkDarkBlue)"
                : "var(--color-darkMainWhite)"};
    }
`;

const InnerDescTagline = styled.h2`
    font-size: 2.2rem;
    font-weight: 300;
    color: ${props =>
        props.dark
            ? "var(--color-lightFeatured)"
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
            ? "var(--color-darkDarkBlue)"
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
    const { genresState, genresDispatch } = useContext(GenresContext);
    const { movieState, movieDispatch } = useContext(MovieContext);
    const { castState, castDispatch } = useContext(CastContext);
    const { theme } = useContext(ThemeContext);
    const movieId = match.params.id;
    const { secure_base_url } = genresState.config.images;
    const { base_url } = genresState.config.images;
    const { poster_sizes } = genresState.config.images;

    useEffect(() => {
        scroll.scrollToTop({
            smooth: true
        });

        const getMovieData = () => {
            getMovie(movieId, movieDispatch);
            getCast(movieId, castDispatch);
        };

        getMovieData();

        return () => {
            movieDispatch({ type: TYPES.CLEAR_MOVIE });
            castDispatch({ type: TYPES.CLEAR_CAST });
            setLoaded(false);
        };
    }, [match.params.id]);

    // Render Trailer button. On click triggers state to open modal of trailer
    function renderYouTube(videos) {
        if (videos.length === 0) {
            return;
        }
        const { key } = videos.find(
            video => video.type === "Trailer" && video.site === "YouTube"
        );

        const opts = {
            height: "300px",
            width: "500px"
        };

        return (
            <div>
                <YouTube videoId={key} opts={opts} />
            </div>
        );
    }

    if (movieState.loading && !movieState.data) {
        return <Loader />;
    }

    if (movieState.status_code) {
        history.push(process.env.PUBLIC_URL + "/404");
    }

    return (
        <Wrapper>
            <Helmet>
                <title>{`${movieState.data.title} - Movie Library`}</title>
            </Helmet>
            <LazyLoad height={800}>
                <Element name="scroll-to-element" />
                <Header title="Movie" full />
                <MovieHeaderWrapper>
                    <PosterWrapper>
                        <Poster
                            style={!loaded ? { display: "none" } : {}}
                            src={`${base_url}/${poster_sizes[3]}/${
                                movieState.data.poster_path
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
                    {renderYouTube(movieState.data.videos.results)}
                </MovieHeaderWrapper>
                <MovieDetailsWrapper dark={theme.dark}>
                    <MovieTitle dark={theme.dark}>
                        {movieState.data.title}
                    </MovieTitle>
                    <MainDetailsWrapper>
                        <MainDetails dark={theme.dark}>
                            <MainDetailsText dark={theme.dark}>
                                {handleReleseDate(movieState.data.release_date)}
                            </MainDetailsText>
                        </MainDetails>
                        <MainDetails dark={theme.dark}>
                            {handleGenres(movieState.data.genres, theme.dark)}
                        </MainDetails>
                        <MainDetailsText>
                            <MainDetails dark={theme.dark}>
                                {handlePEGI(movieState.data.adult, theme.dark)}
                            </MainDetails>
                        </MainDetailsText>
                        <MainDetails dark={theme.dark}>
                            {handleIMDB(
                                movieState.data.imdb_id,
                                movieState.data.vote_average,
                                theme.dark
                            )}
                        </MainDetails>
                    </MainDetailsWrapper>
                    {/* Inner details */}
                    <InnerWrapper>
                        {/* left side */}
                        <InnerDesc dark={theme.dark}>
                            <InnerDescTagline dark={theme.dark}>
                                {movieState.data.tagline}
                            </InnerDescTagline>
                            <p>{movieState.data.overview}</p>
                        </InnerDesc>
                        {/* line */}
                        <Line dark={theme.dark} />
                        {/* right side */}
                        <InnerStats>
                            {/* Cast */}
                            <Cast
                                cast={castState.data}
                                baseUrl={secure_base_url}
                            />
                            {/* Language */}
                            <StatsInner>
                                <StatsHeader dark={theme.dark}>
                                    Language
                                </StatsHeader>
                                <StatsText dark={theme.dark}>
                                    {movieState.data.original_language.toUpperCase()}
                                </StatsText>
                            </StatsInner>
                            {/* Length */}
                            <StatsInner>
                                <StatsHeader dark={theme.dark}>
                                    Length
                                </StatsHeader>
                                <StatsText dark={theme.dark}>
                                    {movieState.data.runtime} min.
                                </StatsText>
                            </StatsInner>
                            {/* Budget */}
                            <StatsInner>
                                <StatsHeader dark={theme.dark}>
                                    Budget
                                </StatsHeader>
                                <StatsText dark={theme.dark}>
                                    {handleBudget(movieState.data.budget)}
                                </StatsText>
                            </StatsInner>
                        </InnerStats>
                    </InnerWrapper>
                </MovieDetailsWrapper>
            </LazyLoad>
        </Wrapper>
    );
};

// data fetch on component mount
const getMovie = async (id, movieDispatch) => {
    movieDispatch({ type: TYPES.FETCH_MOVIE_LOADING });
    const res = await tmdbAPI.get(`/movie/${id}`, {
        params: {
            api_key: process.env.REACT_APP_APIKEY,
            append_to_response: "videos"
        }
    });
    movieDispatch({ type: TYPES.FETCH_MOVIE, payload: res.data });
    movieDispatch({ type: TYPES.FETCH_MOVIE_FINISHED });
};

const getCast = async (id, castDispatch) => {
    castDispatch({ type: TYPES.FETCH_CAST_LOADING });
    const res = await tmdbAPI.get(`/movie/${id}/credits`, {
        params: {
            api_key: process.env.REACT_APP_APIKEY
        }
    });
    castDispatch({
        type: TYPES.FETCH_CAST,
        payload: [res.data.cast]
    });
    castDispatch({ type: TYPES.FETCH_CAST_FINISHED });
};

// handle release date
const handleReleseDate = fullDate => {
    const date = fullDate.split("-");
    return date[0];
};

// handle genres
const handleGenres = (genresArr, dark) => {
    return genresArr.map(genre => (
        <MainDetailsTextLink
            dark={dark}
            to={`${process.env.PUBLIC_URL}/genres/${genre.name}`}
            key={genre.id}
        >
            {genre.name},{" "}
        </MainDetailsTextLink>
    ));
};

// handle PEGI
const handlePEGI = (isAdult, dark) => {
    if (!isAdult) {
        return <PegiAdult dark={dark}>12+</PegiAdult>;
    } else {
        return <PegiAdult dark={dark}>18+</PegiAdult>;
    }
};

// handle IMDB
const handleIMDB = (id, avgVote, dark) => {
    return (
        <ImdbRaiting
            dark={dark}
            target="_blank"
            href={`https://www.imdb.com/title/${id}`}
        >
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
