import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./utils/globalStyles";
import history from "./history";
import theme from "./utils/theme";
import App from "./App";

import * as serviceWorker from "./serviceWorker";
import { MovieProvider } from "./context/movieContext";
import { ThemeContextProvider } from "./context/themeContext";

ReactDOM.render(
    <Router history={history}>
        <ThemeContextProvider>
            <MovieProvider>
                <ThemeProvider theme={theme}>
                    <>
                        <App />
                        <GlobalStyles />
                    </>
                </ThemeProvider>
            </MovieProvider>
        </ThemeContextProvider>
    </Router>,
    document.getElementById("root")
);

serviceWorker.unregister();
