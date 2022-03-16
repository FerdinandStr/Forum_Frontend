import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import "./globalStyle.css"
import MainPage from "./MainPage.jsx"
import { ThemeProvider } from "@mui/material/styles"
import { theme } from "./muiTheme"
import CssBaseline from "@mui/material/CssBaseline"
import { AlertContextProvider } from "./helper/AlertContext"

ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AlertContextProvider>
                <MainPage />
            </AlertContextProvider>
        </ThemeProvider>
    </BrowserRouter>,
    document.getElementById("root")
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
    import.meta.hot.accept()
}
