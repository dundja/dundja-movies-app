import React from "react";
import { scroller } from "react-scroll";
import styled from "styled-components";
import { FaAngleDoubleUp } from "react-icons/fa";

const ReturnButton = styled.button`
    position: absolute;
    top: 98%;
    right: 2rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    padding: 1rem;
    font-weight: 500;
    font-size: 1.3rem;
    width: 5rem;
    height: 5rem;
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
    border-radius: 50%;
    transition: all 600ms cubic-bezier(0.075, 0.82, 0.165, 1);

    &:hover {
        transform: translateY(-3px);
        transition: all 600ms cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    @media ${props => props.theme.mediaQueries.largest} {
        padding: 1.2rem;
        width: 3rem;
        height: 3rem;
    }

    @media only screen and (max-width: 1300px) {
        display: none;
    }

    &:active {
        transform: translateY(2px);
    }
`;

const StyledIcon = styled(FaAngleDoubleUp)`
    width: 2rem;
    height: 2rem;
`;

const ReturnToTop = () => {
    const scrollTo = () => {
        scroller.scrollTo("scroll-to-element", {
            duration: 1500,
            smooth: "easeInOutQuart",
            offset: -50
        });
    };

    return (
        <ReturnButton onClick={scrollTo}>
            <StyledIcon />
        </ReturnButton>
    );
};

export default ReturnToTop;
