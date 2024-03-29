import React from "react";
import styled from "styled-components";

import MovieItem from "./MovieItem";

const MoviesWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 25rem));
    justify-content: space-evenly;
    align-content: space-between;
    align-items: start;
    padding: 4rem 0;
    grid-gap: 4rem 2rem;

    @media ${props => props.theme.mediaQueries.small} {
        grid-template-columns: repeat(auto-fit, minmax(10rem, 23rem));
        justify-content: space-around;
        grid-gap: 4rem 1.5rem;
    }

    @media ${props => props.theme.mediaQueries.smaller} {
        grid-template-columns: repeat(auto-fit, minmax(10rem, 17rem));
        grid-gap: 4rem 1rem;
    }
`;

const MoviesList = ({ movies, baseUrl }) => {
    if (movies.length === 0) {
        return null;
    }

    return (
        <React.Fragment>
            <MoviesWrapper>
                {movies.map(movie => (
                    <MovieItem movie={movie} key={movie.id} baseUrl={baseUrl} />
                ))}
            </MoviesWrapper>
        </React.Fragment>
    );
};

export default MoviesList;
