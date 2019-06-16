import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/themeContext";

import Toggler from "./Toggler";
import SearchBar from "./SearchBar";

const Title = styled.h1`
    font-size: ${props => (props.size === "2" ? "4rem" : "2.5rem")};
    font-weight: 200;
    line-height: ${props => (props.size === "2" ? "1.2" : "1")};
    color: ${props =>
        props.dark
            ? "var(--color-lightMiddleBlue)"
            : "var(--color-darkDarkBlue)"};
    letter-spacing: -0.5px;
    text-transform: uppercase;
    margin-bottom: 0.5rem;

    @media ${props => props.theme.mediaQueries.medium} {
        font-size: ${props => (props.size === "2" ? "2.7rem" : "2.2rem")};
    }

    @media ${props => props.theme.mediaQueries.small} {
        font-size: ${props => (props.size === "2" ? "2.2rem" : "2rem")};
    }
`;

const Subtitle = styled.h2`
    text-transform: uppercase;
    line-height: ${props => (props.size === "2" ? "1.5" : "1")};
    color: ${props =>
        props.dark
            ? "var(--color-lightMiddleBlue)"
            : "var(--color-darkDarkBlue)"};
    font-size: ${props => (props.size === "2" ? "1.7rem" : "1.2rem")};
    font-weight: 700;

    @media ${props => props.theme.mediaQueries.medium} {
        font-size: ${props => (props.size === "2" ? "1.3rem" : "1.1rem")};
    }
`;

const HeaderWrapper = styled.div`
    margin-bottom: 2rem;
    display: flex;
`;

const TitleWrapper = styled.div`
    flex: 1;
`;

const Header = ({ title, subtitle, size }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <HeaderWrapper>
            <TitleWrapper>
                <Title dark={theme.dark} size={size}>
                    {title}
                </Title>
                <Subtitle dark={theme.dark} size={size}>
                    {subtitle}
                </Subtitle>
            </TitleWrapper>
            <SearchBar />
            <Toggler />
        </HeaderWrapper>
    );
};

export default Header;
