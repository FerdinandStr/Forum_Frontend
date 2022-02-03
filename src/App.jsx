import React from "react"
import { Route, Routes } from "react-router"
import MainPage from "./MainPage"
import useLoginStatus from "./hooks/useLoginStatus"
import LoginScene from "./Scenes/Login/LoginScene"
//import DateAdapter from "@mui/lab/AdapterDateFns"
import { LocalizationProvider } from "@mui/lab"
import { BrowserRouter } from "react-router-dom"

function App() {
    //TODO hier login auskommentieren bis Login für SQL/auf neuem Endpoint gebaut wurde
    const useLogin = useLoginStatus()

    return (
        <div stlye="width=100%">
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginScene useLogin={useLogin} />} />
                    <Route path="/*" element={<MainPage useLogin={useLogin} />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
