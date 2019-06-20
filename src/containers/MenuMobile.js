import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import StickyBox from "react-sticky-box";
import { stack as Menu } from "react-burger-menu";

import SearchBar from "../components/SearchBar";
import MenuItem from "../components/MenuItem";

const WrapperStickyBox = styled(StickyBox)`
    width: 100%;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    background-color: ${props =>
        props.dark
            ? "var(--color-lightDarkBlue)"
            : "var(--color-darkDarkBlue)"};
    box-shadow: 0 2px 40px var(--shadow-color);
`;

const Hamburguer = styled.div`
    border: none;
    outline: none;
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-content: space-around;
    width: 25px;
    line-height: 1;
    height: auto;
    background-color: transparent;
    cursor: pointer;
`;

const Bar = styled.span`
    transition: all 0.3s;
    border-radius: 10px;
    margin: 2px 0;
    height: 4px;
    width: 100%;
    display: inline-block;
    background-color: ${props =>
        props.dark
            ? "var(--color-darkDarkBlue)"
            : "var(--color-lightDarkBlue)"};
`;

const Heading = styled.h2`
    font-weight: 700;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: -0.5px;
    margin: 0 0 1rem 1rem;
    &:not(:first-child) {
        margin-top: 4rem;
    }
    color: ${props =>
        props.dark
            ? "var(--color-darkDarkBlue)"
            : "var(--color-lightMainWhite)"};
`;

const LinkWrap = styled(Link)`
    text-decoration: none;
    display: block;
    outline: none;
    margin-bottom: 0.5rem;
    color: ${props =>
        props.dark
            ? "var(--color-darkDarkBlue)"
            : "var(--color-lightMiddleBlue)"};
`;

const CopyRight = styled.div`
    display: flex;
    align-self: center;
    align-items: center;
    color: ${props =>
        props.dark
            ? "var(--color-darkDarkBlue)"
            : "var(--color-lightMainWhite)"};
    margin-bottom: 2rem;
`;

const StyledLink = styled.a`
    text-decoration: none;
    font-weight: 500;
    margin-left: 4px;
    color: inherit;
`;

var styles = {
    bmBurgerButton: {
        display: "none"
    },
    bmCrossButton: {
        height: "24px",
        width: "24px",
        marginRight: "1rem"
    },
    bmCross: {
        background: "#fafafa"
    },
    bmMenuWrap: {
        position: "fixed",
        height: "100%",
        top: 0,
        left: 0
    },
    bmMenu: {
        background: "#263238",
        overflowY: "scroll",
        padding: "2.5em 1.5em"
    },
    bmItemList: {
        color: "#fafafa",
        padding: "0.8rem"
    },
    bmItem: {
        outline: "none"
    },
    bmOverlay: {
        top: 0,
        background: "rgba(0, 0, 0, 0.3)"
    }
};

const MenuMobile = ({ genresState, menuState, dark }) => {
    const [isOpened, setisOpened] = useState(false);

    const isMenuOpen = ({ isOpened }) => {
        setisOpened(isOpened);
    };

    return (
        <React.Fragment>
            <WrapperStickyBox dark={dark}>
                <Hamburguer onClick={() => setisOpened(true)}>
                    <Bar dark={dark} />
                    <Bar dark={dark} />
                    <Bar dark={dark} />
                </Hamburguer>
            </WrapperStickyBox>
            <Menu isOpen={isOpened} onStateChange={isMenuOpen} styles={styles}>
                <Heading>Discover</Heading>
                {renderStatic(
                    genresState.staticCategories,
                    menuState.selected,
                    setisOpened
                )}
                <Heading>Genres</Heading>
                {renderGenres(
                    genresState.genres.data.genres,
                    menuState.selected,
                    setisOpened
                )}
                <CopyRight mobile={true}>
                    Copyright ©
                    <StyledLink href="https://google.com">Dundja</StyledLink>
                </CopyRight>
            </Menu>
        </React.Fragment>
    );
};

function renderStatic(categories, selected, setisOpened) {
    return categories.map((category, i) => (
        <LinkWrap
            to={`${process.env.PUBLIC_URL}/discover/${category}`}
            key={i}
            onClick={setisOpened ? () => setisOpened(false) : null}
        >
            <MenuItem
                mobile={setisOpened ? 1 : 0}
                title={category}
                selected={category === selected ? true : false}
            />
        </LinkWrap>
    ));
}

function renderGenres(genres, selected, setisOpened) {
    return genres.map(genre => (
        <LinkWrap
            to={`${process.env.PUBLIC_URL}/genres/${genre.name}`}
            key={genre.id}
            onClick={setisOpened ? () => setisOpened(false) : null}
        >
            <MenuItem
                mobile={setisOpened ? 1 : 0}
                title={genre.name}
                selected={genre.name === selected ? true : false}
            />
        </LinkWrap>
    ));
}

export default MenuMobile;
