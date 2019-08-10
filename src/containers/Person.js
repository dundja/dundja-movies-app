import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import * as TYPES from "../context/types";
import { GenresContext } from "../context/genresContext";
import { PersonContext } from "../context/personContext";
import { ErrorContext } from "../context/errorContext";
import tmdbAPI from "../api";
import { Helmet } from "react-helmet";
import queryString from "query-string";
import history from "../history";
import LazyLoad from "react-lazyload";
import { Element, animateScroll as scroll } from "react-scroll";

import NotFoundImg from "../assets/img/not-found.png";
import Loader from "../components/Loader";
import PersonGallery from "../components/PersonGallery";
import MoviesList from "../components/MoviesList";
import Header from "../components/Header";
import SortBy from "../components/SortBy";

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

    @media ${props => props.theme.mediaQueries.larger} {
        flex-direction: column;
    }
`;

const PosterWrapper = styled.div`
    width: 40%;
    flex: 1 1 40%;
    padding: 3rem;

    @media ${props => props.theme.mediaQueries.larger} {
        flex: 1;
        width: 50%;
    }

    @media ${props => props.theme.mediaQueries.small} {
        width: 90%;
    }
`;

const Poster = styled.img`
    max-height: 100%;
    width: 100%;
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

    @media ${props => props.theme.mediaQueries.small} {
        width: 100%;
    }
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

const MainDetailsText = styled.span`
    font-size: 1.4rem;

    @media ${props => props.theme.mediaQueries.small} {
        font-size: 1.2rem;
    }
`;

const InnerWrapper = styled.div`
    width: 100%;
    margin-top: 3rem;
    padding-bottom: 2rem;
`;

const InnerDesc = styled.div`
    height: 100%;
`;

const InnerDescText = styled.p`
    font-size: 1.4rem;
    color: white;
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
const SliderWrapper = styled.div`
    flex: 1;
    width: 80%;
    display: flex;
    justify-content: center;
`;

const SliderImg = styled.img`
    width: 10rem;
    height: 15rem;
    margin: 0 0.5rem 0.5rem 0.5rem;

    @media ${props => props.theme.mediaQueries.small} {
        width: 7rem;
        height: 11rem;
        margin: 0 0.5rem 0.5rem 0.5rem;
    }
`;
// Person component
const Person = ({ location, match }) => {
    const [option, setOption] = useState({
        value: "popularity.desc",
        label: "Popularity"
    });
    const [isMobile, setisMobile] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const { genresState } = useContext(GenresContext);
    const { personState, personDispatch } = useContext(PersonContext);
    const { errorDispatch } = useContext(ErrorContext);
    const params = queryString.parse(location.search);
    const {
        secure_base_url,
        logo_sizes,
        poster_sizes
    } = genresState.config.images;

    useEffect(() => {
        scroll.scrollToTop({
            smooth: true
        });

        const getPersonData = () => {
            getPerson(match.params.id, personDispatch, errorDispatch);
            getPersonImages(match.params.id, personDispatch, errorDispatch);
        };

        getPersonData();

        return () => personDispatch({ type: TYPES.CLEAR_PERSON });
    }, [match.params.id]);

    useEffect(() => {
        getPersonMovies(
            match.params.id,
            params.page,
            option.value,
            personDispatch,
            errorDispatch
        );
    }, [option]);

    useEffect(() => {
        changeMobile();
        window.addEventListener("resize", changeMobile);
        return () => window.removeEventListener("resize", changeMobile);
    }, []);

    const changeMobile = () => {
        window.matchMedia("(max-width: 1200px)").matches
            ? setisMobile(true)
            : setisMobile(false);
    };

    const renderGallery = (isMobile, images) => {
        if (!isMobile && !images) {
            return (
                <div style={{ flex: 1 }}>
                    <Loader />
                </div>
            );
        } else if (!isMobile && images) {
            return <PersonGallery images={personState.images.data.profiles} />;
        } else if (isMobile && images) {
            const mobileGalleryImages = personState.images.data.profiles.slice(
                0,
                3
            );
            return (
                <SliderWrapper>
                    {mobileGalleryImages.map(img => (
                        <SliderImg
                            src={`${secure_base_url}/${logo_sizes[3]}/${
                                img.file_path
                            }`}
                            alt="actor photo"
                        />
                    ))}
                </SliderWrapper>
            );
        }
    };

    if (personState.loading) {
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        );
    } else {
        return (
            <Wrapper>
                <Helmet>
                    <title>
                        {personState.data &&
                            `${personState.data.name} - Movie Library`}
                    </title>
                </Helmet>
                <LazyLoad height={800}>
                    <Element name="scroll-to-element" />
                    <Header
                        title={handleGender(personState.data.gender)}
                        full
                    />
                    <MovieHeaderWrapper>
                        <PosterWrapper>
                            <Poster
                                style={!loaded ? { display: "none" } : {}}
                                src={`${secure_base_url}/${poster_sizes[3]}/${
                                    personState.data.profile_path
                                }`}
                                alt="person poster"
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
                        {renderGallery(isMobile, personState.images.data)}
                    </MovieHeaderWrapper>
                    <MovieDetailsWrapper>
                        <MovieTitle>{personState.data.name}</MovieTitle>
                        <MainDetailsWrapper>
                            {personState.data.birthday ? (
                                <MainDetails>
                                    <MainDetailsText>
                                        {personState.data.birthday}{" "}
                                        {personState.data.deathday &&
                                            `- ${personState.data.deathday}`}
                                    </MainDetailsText>
                                </MainDetails>
                            ) : null}
                            {personState.data.place_of_birth ? (
                                <MainDetailsText>
                                    <MainDetails>
                                        {personState.data.place_of_birth}
                                    </MainDetails>
                                </MainDetailsText>
                            ) : null}
                        </MainDetailsWrapper>
                        {/* Inner details */}
                        <InnerWrapper>
                            {/* left side */}
                            <InnerDesc>
                                <InnerDescTagline>Bio</InnerDescTagline>
                                <InnerDescText>
                                    {personState.data.biography}
                                </InnerDescText>
                            </InnerDesc>
                        </InnerWrapper>
                    </MovieDetailsWrapper>
                </LazyLoad>
                <Header title="Also enters in" subtitle="movies" />
                <SortBy option={option} setOption={setOption} />
                {!personState.movies.data ? (
                    <Loader />
                ) : (
                    <MoviesList
                        movies={personState.movies.data.results}
                        baseUrl={secure_base_url}
                    />
                )}
            </Wrapper>
        );
    }
};

// fetch data
const getPerson = async (id, personDispatch, errorDispatch) => {
    personDispatch({ type: TYPES.FETCH_PERSON_LOADING });
    try {
        const res = await tmdbAPI.get(`/person/${id}`, {
            params: {
                api_key: process.env.REACT_APP_APIKEY
            }
        });
        personDispatch({ type: TYPES.FETCH_PERSON, payload: res.data });
    } catch (err) {
        errorDispatch({ type: TYPES.INSERT_ERROR, payload: err.response });
        history.push(process.env.PUBLIC_URL + "/error");
    }
    personDispatch({ type: TYPES.FETCH_PERSON_FINISHED });
};

const getPersonImages = async (id, personDispatch, errorDispatch) => {
    personDispatch({ type: TYPES.FETCH_PERSON_IMAGES_LOADING });
    try {
        const res = await tmdbAPI.get(`/person/${id}/images`, {
            params: {
                api_key: process.env.REACT_APP_APIKEY
            }
        });
        personDispatch({
            type: TYPES.FETCH_PERSON_IMAGES,
            payload: res.data
        });
    } catch (err) {
        errorDispatch({ type: TYPES.INSERT_ERROR, payload: err.response });
        history.push(process.env.PUBLIC_URL + "/error");
    }
    personDispatch({ type: TYPES.FETCH_PERSON_IMAGES_FINISHED });
};

// fetch person movies
const getPersonMovies = async (
    id,
    page,
    sort,
    personDispatch,
    errorDispatch
) => {
    try {
        personDispatch({ type: TYPES.FETCH_MOVIESPERSON_LOADING });
        const res = await tmdbAPI.get(`/discover/movie`, {
            params: {
                with_cast: id,
                page,
                sort_by: sort,
                api_key: process.env.REACT_APP_APIKEY
            }
        });
        personDispatch({
            type: TYPES.FETCH_MOVIESPERSON,
            payload: res.data
        });
        personDispatch({ type: TYPES.FETCH_MOVIESPERSON_FINISHED });
    } catch (err) {
        errorDispatch({ type: TYPES.INSERT_ERROR, payload: err.response });
        history.push(process.env.PUBLIC_URL + "/error");
    }
};

const handleGender = genNum => {
    return genNum === 1 ? "Actress" : "Actor";
};

export default Person;
