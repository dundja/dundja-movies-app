const theme = {
    light: {
        mainWhite: `#F1FAEE`,
        lightBlue: `#8CB5CE`,
        middleBlue: `#6B8FB2`,
        darkBlue: `#737E9E`,
        featured: `#BBB1D1`,
        white: `#FFFFFF`,
        black: `#000000`
    },

    dark: {
        mainWhite: `#FDFDFD`,
        lightBlue: `#4182AD`,
        middleBlue: `#103859`,
        darkBlue: `#1C2630`,
        featured: `#BED5DD`,
        white: `#FFFFFF`,
        black: `#000000`
    },

    size: {
        smallest: "25em", //275px
        smaller: "31.25em", //500px
        small: "37.5em", //600px
        medium: "56.25em", //900px
        large: "80em", //1300px
        larger: "90em", //1300px
        largest: "97em" //1500px
    },

    mediaQueries: {
        smallest: `only screen and (max-width: 300px)`,
        smaller: "only screen and (max-width: 500px)",
        small: "only screen and (max-width: 600px)",
        medium: "only screen and (max-width: 900px)",
        large: "only screen and (max-width: 1000px)",
        larger: "only screen and (max-width: 1200px)",
        largest: "only screen and (max-width: 1500px)"
    }
};

export default theme;
