import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { MovieContext } from "../context/movieContext";
import Logo from "../assets/img/popcorn-logo.jpg";
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
    color: var(--color-lightMiddleBlue);
    padding: 2rem;
    border-right: 1px solid var(--color-lightMiddleBlue);
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
    const { state, dispatch } = useContext(MovieContext);

    const renderDiscover = () => {
        const { staticCategories, selected } = state;
        return staticCategories.map((category, i) => {
            return (
                <CategoryLinkWrp
                    key={i}
                    to={`${process.env.PUBLIC_URL}/discover/${category}`}
                >
                    <MenuItem
                        title={category}
                        selected={category === selected ? true : false}
                    />
                </CategoryLinkWrp>
            );
        });
    };

    const renderGenres = () => {
        const { genres } = state.genres.data;
        const { selected } = state;
        return genres.map(genre => (
            <CategoryLinkWrp
                key={genre.id}
                to={`${process.env.PUBLIC_URL}/genres/${genre.name}`}
            >
                <MenuItem
                    title={genre.name}
                    selected={genre.name === selected ? true : false}
                />
            </CategoryLinkWrp>
        ));
    };

    return (
        <SideBarWrapper>
            <SideBarInner>
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
