import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import "./globalStyle.css"
import MainPage from "./MainPage.jsx"

ReactDOM.render(
    <BrowserRouter>
        <MainPage />
    </BrowserRouter>,
    document.getElementById("root")
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
    import.meta.hot.accept()
}
