import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
// styled components theme
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./utils/globalStyles";
import history from "./history";
import theme from "./utils/theme";
import App from "./App";

import * as serviceWorker from "./serviceWorker";
// providers
import { MovieProvider } from "./context/movieContext";
import { MoviesProvider } from "./context/moviesContext";
import { CastProvider } from "./context/castContext";
import { ErrorProvider } from "./context/errorContext";
import { GenresProvider } from "./context/genresContext";
import { MenuProvider } from "./context/menuContext";
import { PersonProvider } from "./context/personContext";
// my theme
import { ThemeContextProvider } from "./context/themeContext";

ReactDOM.render(
    <Router history={history}>
        <ThemeContextProvider>
            <MovieProvider>
                <MoviesProvider>
                    <CastProvider>
                        <ErrorProvider>
                            <GenresProvider>
                                <MenuProvider>
                                    <PersonProvider>
                                        <ThemeProvider theme={theme}>
                                            <>
                                                <App />
                                                <GlobalStyles />
                                            </>
                                        </ThemeProvider>
                                    </PersonProvider>
                                </MenuProvider>
                            </GenresProvider>
                        </ErrorProvider>
                    </CastProvider>
                </MoviesProvider>
            </MovieProvider>
        </ThemeContextProvider>
    </Router>,
    document.getElementById("root")
);

serviceWorker.unregister();
