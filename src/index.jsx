import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import "./globalStyle.css"
import MainPage from "./MainPage.jsx"
import { ThemeProvider, createTheme } from '@mui/material/styles';

//https://bareynol.github.io/mui-theme-creator/

const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#c7173b',
            light: '#0c14c1',
        },
        secondary: {
            main: '#f50057',
        },
        text: {
            primary: 'rgba(241,235,235,0.87)',
            secondary: 'r#c7173b',
        },
    },
});

ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <MainPage />
        </ThemeProvider>
    </BrowserRouter>,
    document.getElementById("root")
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
    import.meta.hot.accept()
}
