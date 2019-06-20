import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
  }
  *:focus {
  outline: 0;
  outline: none;
  }
  html {
    font-size: 62.5%;
    box-sizing: border-box;
    background-color: ${props =>
        props.dark ? props.theme.light.featured : props.theme.dark.darkBlue};
    /* universal colors */
    --color-white: ${props => props.theme.light.white};
    --color-black: ${props => props.theme.light.black};
    /* light colors */
    --color-lightMainWhite: ${props => props.theme.light.mainWhite};
    --color-lightLightBlue: ${props => props.theme.light.lightBlue};
    --color-lightMiddleBlue: ${props => props.theme.light.middleBlue};
    --color-lightDarkBlue: ${props => props.theme.light.darkBlue};
    --color-lightFeatured: ${props => props.theme.light.featured};
    /* dark colors */
    --color-darkMainWhite: ${props => props.theme.dark.mainWhite};
    --color-darkLightBlue: ${props => props.theme.dark.lightBlue};
    --color-darkMiddleBlue: ${props => props.theme.dark.middleBlue};
    --color-darkDarkBlue: ${props => props.theme.dark.darkBlue};
    --color-darkFeatured: ${props => props.theme.dark.featured};
    /* shadows */
    --shadow-color: rgba(0, 0, 0, 0.2);
    --shadow-color-dark: rgba(0, 0, 0, 0.25);
      
    @media ${props => props.theme.mediaQueries.small} {
      font-size: 60%;
    }
    @media ${props => props.theme.mediaQueries.smallest} {
      font-size: 55%;
    }
  }
  body {
    font-family: 'Montserrat', sans-serif;
  }
  a, button {
    cursor: pointer;
  }
  a, input, textarea, button {
    outline: none;
    text-decoration: none;
    font-family: inherit;
  }

 /* slider helpers */
  .slick-slider {
    position: relative;
    display: block;
  }

  .slick-list {
    overflow: hidden;
    margin: 0;
    display: flex;
    padding: 0;
    position: relative;
  }

  .slick-track {
    display: flex;
    /* width: 500px !important; */
  }

  .slick-slide {
    /* height: 5rem !important;
    width: 5rem !important; */
  }
`;
