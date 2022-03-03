import React from "react"
import { Navigate, Route, Routes } from "react-router"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import { SideMenu, useSideMenuState } from "./components/SideMenu/SideMenu"
import CreateUnterforum from "./Scenes/CreateUnterforum/CreateUnterforum"
import CreateForeneintrag from "./Scenes/CreateForeneintrag/CreateForeneintrag"
import Beitraege from "./Scenes/Beitraege/Beitraege"
import useLoginStatus from "./hooks/useLoginStatus"
import LoginScene from "./Scenes/Login/LoginScene"
import Forum from "./Scenes/ForumScene/Forum"
import AGB from "./Scenes/AGB/AGB"
import Impressum from "./Scenes/Impressum/Impressum"
import Kontakt from "./Scenes/Kontakt/Kontakt"

function MainPage() {
    const useLogin = useLoginStatus()

    const sideMenuState = useSideMenuState()
    const [isSideMenuOpen, setSideMenuOpen] = sideMenuState

    return (
        <div>
            <Header useLogin={useLogin} setSideMenuOpen={setSideMenuOpen} />
            <SideMenu state={sideMenuState} />

            <div className={"defaultPageContainer"}>
                <Routes>
                    <Route path="/" element={<Navigate to="/foren" />} />
                    <Route path="/login" element={<LoginScene useLogin={useLogin} />} />
                    <Route path="foren" element={<Forum />}>
                        <Route path=":idForum" element={<Forum />} />
                    </Route>
                    <Route path="/foren/:idForum/addForum" element={<CreateUnterforum />} />
                    <Route path="/foren/:idForum/addForeneintrag" element={<CreateForeneintrag />} />
                    <Route path="/foren/:idForum/foreneintraege/:idForeneintrag" element={<Beitraege />} />

                    <Route path="/kontakt" element={<Kontakt />} />
                    <Route path="/agb" element={<AGB />} />
                    <Route path="/impressum" element={<Impressum />} />
                </Routes>
            </div>

            <Footer />
        </div>
    )
}

export default MainPage
