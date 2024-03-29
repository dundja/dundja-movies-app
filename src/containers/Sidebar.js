import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { GenresContext } from "../context/genresContext";
import { MenuContext } from "../context/menuContext";
import { ThemeContext } from "../context/themeContext";
import Logo from "../assets/img/cat-logo.png";
import MenuItem from "../components/MenuItem";

const SideBarWrapper = styled.div`
    position: sticky;
    top: 0;
`;

const SideBarInner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25rem;
    margin-top: 4rem;
    color: ${props =>
        props.dark
            ? "var(--color-lightMiddleBlue)"
            : "var(--color-darkDarkBlue)"};
    padding: 2rem;
    border-right: ${props =>
        props.dark
            ? "1px solid var(--color-lightMiddleBlue)"
            : "1px solid var(--color-darkDarkBlue)"};
`;

const LogoImg = styled.img`
    width: 20rem;
    height: 15rem;
`;

const CategoryDiv = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top: 4rem;
`;

const CategoryHeader = styled.h2`
    font-weight: 700;
    font-size: 1.4rem;
    letter-spacing: -0.05rem;
    text-transform: uppercase;
`;

const CategoryLinkWrp = styled(Link)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-bottom: 0.5rem;
    color: var(--color--lightMiddleBlue);
`;

const Sidebar = () => {
    const { genresState } = useContext(GenresContext);
    const { menuState } = useContext(MenuContext);
    const { theme } = useContext(ThemeContext);

    const renderDiscover = () => {
        const { staticCategories } = genresState;
        const { selected } = menuState;
        return staticCategories.map((category, i) => {
            return (
                <CategoryLinkWrp
                    key={i}
                    to={`${process.env.PUBLIC_URL}/discover/${category}`}
                >
                    <MenuItem
                        dark={theme.dark}
                        title={category}
                        selected={category === selected ? true : false}
                    />
                </CategoryLinkWrp>
            );
        });
    };

    const renderGenres = () => {
        const { genres } = genresState.genres.data;
        const { selected } = menuState;
        return genres.map(genre => (
            <CategoryLinkWrp
                key={genre.id}
                to={`${process.env.PUBLIC_URL}/genres/${genre.name}`}
            >
                <MenuItem
                    dark={theme.dark}
                    title={genre.name}
                    selected={genre.name === selected ? true : false}
                />
            </CategoryLinkWrp>
        ));
    };

    return (
        <SideBarWrapper>
            <SideBarInner dark={theme.dark}>
                <a href="/">
                    <LogoImg src={Logo} alt="logo" />
                </a>
                {/* Discover */}
                <CategoryDiv>
                    <CategoryHeader>Discover</CategoryHeader>
                    {renderDiscover()}
                </CategoryDiv>
                {/* Genres */}
                <CategoryDiv>
                    <CategoryHeader>Genres</CategoryHeader>
                    {renderGenres()}
                </CategoryDiv>
            </SideBarInner>
        </SideBarWrapper>
    );
};

export default Sidebar;
