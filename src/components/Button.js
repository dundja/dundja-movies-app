import React, { useContext } from "react";
import styled from "styled-components";

import { ThemeContext } from "../context/themeContext";

const StyledButton = styled.button`
    display: flex;
    flex-direction: ${props => (props.left ? "row" : "row-reverse")};
    align-items: center;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    padding: 1.2rem 3rem;
    margin-top: 0.5rem;
    line-height: 1;
    font-weight: 500;
    font-size: 1.3rem;
    justify-content: space-around;
    width: ${props => (props.size === "small" ? "11rem" : "12rem")};
    height: ${props => (props.size === "small" ? "4rem" : "4rem")};
    flex-grow: 0;
    color: ${props =>
        props.dark
            ? "var(--color-darkDarkBlue)"
            : "var(--color-darkMainWhite)"};
    border: ${props =>
        props.dark
            ? "1px solid var(--color-lightLightBlue)"
            : "1px solid var(--color-darkLightBlue)"};
    background-color: ${props =>
        props.dark
            ? "var(--color-lightMiddleBlue)"
            : "var(--color-darkDarkBlue)"};
    border-radius: 5rem;
    transition: all 600ms cubic-bezier(0.075, 0.82, 0.165, 1);

    &:hover {
        transform: translateY(-3px);
        transition: all 600ms cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    @media ${props => props.theme.mediaQueries.large} {
        padding: 1.2rem 2rem;
    }

    @media ${props => props.theme.mediaQueries.small} {
        padding: 1.3rem 1.6rem;
    }

    @media ${props => props.theme.mediaQueries.smaller} {
        padding: 1rem 1.3rem;
    }

    &:active {
        transform: translateY(2px);
    }
`;

const Button = ({ title, icon, left, size }) => {
    const { theme } = useContext(ThemeContext);

    const Img = styled(icon)`
        height: 1rem;
        width: 1rem;
    `;

    return (
        <StyledButton size={size} left={left ? 1 : 0} dark={theme.dark}>
            <Img alt="button image" />
            {title}
        </StyledButton>
    );
};

export default Button;
