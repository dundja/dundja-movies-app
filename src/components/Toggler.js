import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { ThemeContext } from "../context/themeContext";

const travel = keyframes`
    0% {
      transform: rotate(-45deg) translateX(70px);
    }
  
    50% {
      transform: rotate(-45deg) translateX(-20px);
      box-shadow: 5px 0px 6px 1px #FFF;
    }
  
    100% {
      transform: rotate(-45deg) translateX(-30px);
      width: 2px;
      height: 2px;
      opacity: 0;
      box-shadow: none;
    }
`;

const move = keyframes`
    0% {
      transform: none;
    }
    
    25% {
      transform: translateX(2px);
    }
    
    100% {
      transform: translateX(-2px);
    }
`;

const Wrapper = styled.div`
    width: 70px;
    height: 40px;
`;

const Toggle = styled.label`
    position: relative;
    cursor: pointer;
    display: inline-block;
    width: 70px;
    height: 40px;
    background: #211042;
    border-radius: 50px;
    transition: 500ms;
    overflow: hidden;
`;

const ToggleButton = styled.span`
    position: absolute;
    display: inline-block;
    top: 7px;
    left: 6px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #faeaf1;
    overflow: hidden;
    box-shadow: 0 0 35px 4px rgba(255, 255, 255);
    transition: all 500ms ease-out;
`;

const Crater = styled.span`
    position: absolute;
    display: inline-block;
    background: #faeaf1;
    border-radius: 50%;
    transition: 500ms;
`;

const Crater1 = styled(Crater)`
    background: #fffff9;
    width: 25px;
    height: 25px;
    left: 3px;
    bottom: 2px;
`;

const Crater2 = styled(Crater)`
    width: 5px;
    height: 5px;
    top: 7px;
    left: 7px;
`;

const Crater3 = styled(Crater)`
    width: 4px;
    height: 4px;
    top: 20px;
    right: 9px;
`;

const Crater4 = styled(Crater)`
    width: 3px;
    height: 3px;
    top: 16px;
    left: 19px;
`;

const Crater5 = styled(Crater)`
    width: 7px;
    height: 7px;
    top: 7px;
    left: 16px;
`;

const Star = styled.span`
    position: absolute;
    display: inline-block;
    border-radius: 50%;
    background: #fff;
    box-shadow: 1px 0 2px 2px rgba(255, 255, 255);
`;

const Star1 = styled(Star)`
    width: 6px;
    height: 6px;
    right: -3px;
    bottom: 31px;
`;

const Star2 = styled(Star)`
    width: 8px;
    height: 8px;
    right: 70px;
    top: 10px;
`;

const Star3 = styled(Star)`
    width: 5px;
    height: 5px;
    right: 60px;
    bottom: 15px;
`;

const Star4 = styled(Star)`
    width: 3px;
    height: 3px;
    right: 40px;
    bottom: 50px;
`;

const Star5 = styled(Star)`
    width: 4px;
    height: 4px;
    right: 10px;
    bottom: 35px;
`;

const Star6 = styled(Star)`
    width: 10px;
    height: 2px;
    border-radius: 2px;
    transform: rotate(-45deg);
    box-shadow: 5px 0px 4px 1px #fff;
    animation-name: ${travel};
    animation-duration: 1.5s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;

    right: 65px;
    bottom: -8px;
    animation-delay: -2s;
`;

const Star7 = styled(Star)`
    width: 10px;
    height: 2px;
    border-radius: 2px;
    transform: rotate(-45deg);
    box-shadow: 5px 0px 4px 1px #fff;
    animation-name: ${travel};
    animation-duration: 1.5s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;

    right: 47px;
    bottom: -16px;
`;

const Star8 = styled(Star)`
    width: 10px;
    height: 2px;
    border-radius: 2px;
    transform: rotate(-45deg);
    box-shadow: 5px 0px 4px 1px #fff;
    animation-name: ${travel};
    animation-duration: 1.5s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;

    right: 25px;
    top: 37px;
    animation-delay: -4s;
`;

const HideCheckbox = styled.input`
    opacity: 0;
    height: 0;
    width: 0;

    &:checked + ${Toggle} {
        background: #24d7f7;
    }

    &:checked + ${Toggle} ${ToggleButton} {
        background: #f7ffff;
        transform: translateX(30px);
        box-shadow: 0 0 35px 5px rgba(255, 255, 255);
    }

    &:checked + ${Toggle} ${ToggleButton} ${Crater} {
        transform: rotate(-45deg) translateX(70px);
    }

    &:checked + ${Toggle} ${Star} {
        animation: ${move} 2s infinite;
        transform: none;
        box-shadow: none;
    }

    &:checked + ${Toggle} ${Star1} {
        width: 4px;
        height: 4px;
        border-radius: 10px;
        background: #fff;
        left: 10px;
        top: 25px;
        box-shadow: none;
    }

    &:checked + ${Toggle} ${Star2} {
        width: 6px;
        height: 6px;
        background: #fff;
        left: 11px;
        top: 23px;
        box-shadow: -1px 0 2px 0 rgba(0, 0, 0, 0.1);
    }

    &:checked + ${Toggle} ${Star3} {
        width: 8px;
        height: 8px;
        background: #fff;
        left: 13px;
        top: 21px;
        box-shadow: -1px 0 2px 0 rgba(0, 0, 0, 0.1);
    }

    &:checked + ${Toggle} ${Star4} {
        width: 6px;
        height: 6px;
        background: #fff;
        left: 17px;
        top: 23px;
        box-shadow: -1px 0 2px 0 rgba(0, 0, 0, 0.1);
    }

    &:checked + ${Toggle} ${Star5} {
        width: 4px;
        height: 4px;
        border-radius: 15px;
        background: #fff;
        left: 15px;
        bottom: 20px;
        box-shadow: none;
    }

    &:checked + ${Toggle} ${Star6} {
        width: 6px;
        height: 6px;
        background: #fff;
        border-radius: 50%;
        left: 16px;
        bottom: 20px;
        box-shadow: -1px 0 2px 0 rgba(0, 0, 0, 0.1);
    }

    &:checked + ${Toggle} ${Star7} {
        width: 8px;
        height: 8px;
        background: #fff;
        border-radius: 50%;
        left: 18px;
        bottom: 20px;
        box-shadow: -1px 0 2px 0 rgba(0, 0, 0, 0.1);
    }

    &:checked + ${Toggle} ${Star8} {
        width: 6px;
        height: 6px;
        background: #fff;
        border-radius: 50%;
        left: 22px;
        top: 9px;
        box-shadow: -1px 0 2px 0 rgba(0, 0, 0, 0.1);
    }
`;

const Toggler = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    const changeTheme = () => {
        setTheme({
            dark: !theme.dark
        });
    };

    return (
        <Wrapper>
            <HideCheckbox
                defaultChecked={theme.dark}
                type="checkbox"
                id="hide-checkbox"
                onClick={() => changeTheme()}
            />
            <Toggle htmlFor="hide-checkbox">
                <ToggleButton>
                    <Crater1 />
                    <Crater2 />
                    <Crater3 />
                    <Crater4 />
                    <Crater5 />
                </ToggleButton>
                <Star1 />
                <Star2 />
                <Star3 />
                <Star4 />
                <Star5 />
                <Star6 />
                <Star7 />
                <Star8 />
            </Toggle>
        </Wrapper>
    );
};

export default Toggler;
