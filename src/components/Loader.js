import React from "react";
import styled, { keyframes } from "styled-components";

const skRotate = keyframes`
  100% { transform: rotate(360deg); -webkit-transform: rotate(360deg) }
`;

const skBounce = keyframes`
  0%, 100% { 
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% { 
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
`;

const Spinner = styled.div`
    margin: 100px auto;
    width: 40px;
    height: 40px;
    position: relative;
    text-align: center;

    position: absolute;
    top: 30%;
    left: 60%;

    -webkit-animation: ${skRotate} 2s infinite linear;
    animation: ${skRotate} 2s infinite linear;
`;

const Dot1 = styled.div`
    width: 60%;
    height: 60%;
    display: inline-block;
    position: absolute;
    top: 0;
    background-color: var(--color-darkDarkBlue);
    border-radius: 100%;

    -webkit-animation: ${skBounce} 2s infinite ease-in-out;
    animation: ${skBounce} 2s infinite ease-in-out;
`;

const Dot2 = styled(Dot1)`
    top: auto;
    bottom: 0;
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
`;

const Loader = () => {
    return (
        <Spinner>
            <Dot1 />
            <Dot2 />
        </Spinner>
    );
};

export default Loader;
