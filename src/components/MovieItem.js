import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import { ThemeContext } from "../context/themeContext";

import NothingSvg from "../assets/img/not-found.png";
// import Rating from '../components/Rating';
import Loading from "./Loading";
import Rating from "./Rating";

const MovieWrapper = styled(Link)`
    display: flex;
    flex-direction: column;
    text-decoration: none;
    background-color: transparent;
    border-radius: 0.8rem;
    transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
    position: relative;
    transition: all 300ms cubic-bezier(0.215, 0.61, 0.355, 1);

    &:hover {
        transform: scale(1.03);

        ::after {
            transform: scaleY(1);
            opacity: 1;
        }
    }

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 0.8rem;
        transform: scaleY(0);
        transform-origin: top;
        opacity: 0;
        background-color: ${props =>
            props.dark
                ? "var(--color-darkFeatured)"
                : "var(--color-darkDarkBlue)"};
        z-index: -99;
        box-shadow: 0rem 2rem 5rem var(--shadow-color-dark);
        transition: all 100ms cubic-bezier(0.215, 0.61, 0.355, 1);
    }
`;

const MovieImg = styled.img`
    width: 100%;
    height: 38rem;
    object-fit: ${props => (props.error ? "contain" : "cover")};
    border-radius: 0.8rem;
    padding: ${props => (props.error ? "2rem" : "")};
    box-shadow: 0rem 2rem 5rem var(--shadow-color);
    transition: all 100ms cubic-bezier(0.645, 0.045, 0.355, 1);

    ${MovieWrapper}:hover & {
        border-radius: 0.8rem 0.8rem 0rem 0rem;
        box-shadow: none;
    }

    @media ${props => props.theme.mediaQueries.small} {
        height: 28rem;
    }
`;

const ImgLoading = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 300px;
    border-radius: 0.8rem;
    box-shadow: 0rem 2rem 5rem var(--shadow-color);
    transition: all 100ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const DetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 3rem;

    @media ${props => props.theme.mediaQueries.smaller} {
        padding: 1.5rem 1.5rem;
    }
`;

const RatingsWrapper = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    margin-bottom: 0.5rem;
    color: ${props =>
        props.dark
            ? "var(--color-lightLightBlue)"
            : "var(--color-darkDarkBlue)"};

    ${MovieWrapper}:hover & {
        color: ${props =>
            props.dark
                ? "var(--color-darkMiddleBlue)"
                : "var(--color-lightMainWhite)"};
    }
`;

const Title = styled.h2`
    text-align: center;
    font-size: 1.3rem;
    font-weight: 400;
    color: ${props =>
        props.dark
            ? "var(--color-lightMiddleBlue)"
            : "var(--color-darkDarkBlue)"};
    margin-bottom: 1rem;
    line-height: 1.4;
    transition: color 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

    ${MovieWrapper}:hover & {
        color: ${props =>
            props.dark
                ? "var(--color-darkMiddleBlue)"
                : "var(--color-lightMainWhite)"};
    }
`;

const Tooltip = styled.span`
    visibility: hidden;
    opacity: 0;
    width: 120px;
    font-weight: 500;
    font-size: 1.1rem;
    background-color: ${props =>
        props.dark
            ? "var(--color-darkDarkBlue)"
            : "var(--color-lightMainWhite)"};
    color: ${props =>
        props.dark
            ? "var(--color-lightDarkBlue)"
            : "var(--color-darkDarkBlue)"};
    text-align: center;
    border-radius: 6px;
    padding: 1rem;
    position: absolute;
    z-index: 999;
    bottom: 150%;
    left: 50%;
    margin-left: -60px;
    transition: all 200ms cubic-bezier(0.645, 0.045, 0.355, 1);

    &::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        transition: all 200ms cubic-bezier(0.645, 0.045, 0.355, 1);
        border-color: ${props =>
            props.dark
                ? "var(--color-darkDarkBlue) transparent transparent transparent"
                : "var(--color-lightMainWhite) transparent transparent transparent"};
    }

    ${RatingsWrapper}:hover & {
        visibility: visible;
        opacity: 1;
    }
`;

// Function to render list of movies
const MovieItem = ({ movie, baseUrl }) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        return () => setLoaded(false);
    }, []);

    return (
        <LazyLoad height={200} offset={200}>
            <MovieWrapper
                dark={theme.dark}
                to={`${process.env.PUBLIC_URL}/movie/${movie.id}`}
            >
                {!loaded ? (
                    <ImgLoading>
                        <Loading />
                    </ImgLoading>
                ) : null}
                <MovieImg
                    error={error ? 1 : 0}
                    onLoad={() => setLoaded(true)}
                    style={!loaded ? { display: "none" } : {}}
                    src={`${baseUrl}w342${movie.poster_path}`}
                    // If no image, error will occurr, we set error to true
                    // And only change the src to the nothing svg if it isn't already, to avoid infinite callback
                    onError={e => {
                        setError(true);
                        if (e.target.src !== `${NothingSvg}`) {
                            e.target.src = `${NothingSvg}`;
                        }
                    }}
                />
                <DetailsWrapper>
                    <Title dark={theme.dark}>{movie.title}</Title>
                    <RatingsWrapper dark={theme.dark}>
                        <Rating rating={movie.vote_average / 2} />
                        <Tooltip dark={theme.dark}>
                            {movie.vote_average} average rating on{" "}
                            {movie.vote_count} votes
                        </Tooltip>
                    </RatingsWrapper>
                </DetailsWrapper>
            </MovieWrapper>
        </LazyLoad>
    );
};

export default MovieItem;
