import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import history from "../history";

import { FaSearch } from "react-icons/fa";

const Form = styled.form`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1.5rem;
    box-shadow: 0 4px 8px var(--shadow-color);
    background-color: ${props =>
        props.dark
            ? "var(--color-lightMiddleBlue)"
            : "var(--color-darkDarkBlue)"};
    border: 1px solid var(--color-primary);
    width: ${props => (props.state ? "30rem" : "3rem")};
    cursor: ${props => (props.state ? "auto" : "pointer")};
    padding: 2rem;
    height: 2rem;
    outline: none;
    border-radius: 10rem;
    transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

    @media ${props => props.theme.mediaQueries.large} {
        background-color: ${props =>
            props.dark
                ? "var(--color-lightMiddleBlue)"
                : "var(--color-darkDarkBlue)"};
        border: 1px solid transparent;
        padding: 1.5rem;
    }

    @media ${props => props.theme.mediaQueries.smallest} {
        max-width: 25rem;
    }
`;

const Input = styled.input`
    font-size: 14px;
    line-height: 1;
    font-weight: 300;
    background-color: transparent;
    width: 100%;
    margin-left: ${props => (props.state ? "1rem" : "0rem")};
    color: ${props =>
        props.dark
            ? "var(--color-darkDarkBlue)"
            : "var(--color-lightMiddleBlue)"};
    border: none;
    transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

    @media ${props => props.theme.mediaQueries.large} {
        font-size: 13px;
    }

    @media ${props => props.theme.mediaQueries.medium} {
        font-size: 12px;
    }

    @media ${props => props.theme.mediaQueries.small} {
        font-size: 11px;
    }

    &:focus,
    &:active {
        outline: none;
    }

    &::placeholder {
        color: ${props =>
            props.dark
                ? "var(--color-lightFeatured)"
                : "var(--color-darkFeatured)"};
    }
`;

const Button = styled.button`
    line-height: 1;
    pointer-events: ${props => (props.state ? "auto" : "none")};
    cursor: ${props => (props.state ? "pointer" : "none")};
    background-color: transparent;
    border: none;
    outline: none;
    color: ${props =>
        props.dark
            ? "var(--color-darkDarkBlue)"
            : "var(--color-lightMiddleBlue)"};

    @media ${props => props.theme.mediaQueries.large} {
        color: var(--text-color);
        font-size: 10px;
    }

    @media ${props => props.theme.mediaQueries.small} {
        color: var(--text-color);
        font-size: 8px;
    }
`;

const StyledIcon = styled(FaSearch)`
    width: 2rem;
    height: 2rem;
`;

const SearchBar = () => {
    const [input, setInput] = useState("");
    const [state, setState] = useState(false);
    const node = useRef();
    const inputFocus = useRef();

    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // cleanup event when unmounted
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    // On click outside, change input state to false
    const handleClick = e => {
        if (node.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setState(false);
    };

    function onFormSubmit(e) {
        e.preventDefault();
        if (input.length === 0) {
            return;
        }
        setInput("");
        setState(false);
        history.push(`${process.env.PUBLIC_URL}/search/${input}`);
    }

    return (
        <Form
            state={state}
            onClick={() => {
                setState(true);
                inputFocus.current.focus();
            }}
            onSubmit={onFormSubmit}
            ref={node}
        >
            <Button type="submit" state={state}>
                <StyledIcon />
            </Button>
            <Input
                onChange={e => setInput(e.target.value)}
                ref={inputFocus}
                value={input}
                state={state}
                placeholder="Search for a movie..."
            />
        </Form>
    );
};

export default SearchBar;
