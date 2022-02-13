import React from "react"
import { Navigate, Route, Routes } from "react-router"
import Footer from "./components/Footer"
import Header from "./components/Header/Header"
import { SideMenu, useSideMenuState } from "./components/SideMenu/SideMenu"
import useSearchResult from "./hooks/useSearchResult"
import CreateUnterforum from "./Scenes/CreateUnterforum/CreateUnterforum"
import CreateForeneintrag from "./Scenes/CreateForeneintrag/CreateForeneintrag"
import Beitraege from "./Scenes/Beitraege/Beitraege"
import useLoginStatus from "./hooks/useLoginStatus"
import LoginScene from "./Scenes/Login/LoginScene"
import Forum from "./Scenes/ForumScene/Forum"

function MainPage() {
    const useLogin = useLoginStatus()

    const { items, setSearchInput } = useSearchResult()
    const sideMenuState = useSideMenuState()
    const [isSideMenuOpen, setSideMenuOpen] = sideMenuState

    return (
        <div>
            <Header useLogin={useLogin} setSearchInput={setSearchInput} setSideMenuOpen={setSideMenuOpen} />
            <SideMenu state={sideMenuState} />

            <Routes>
                <Route path="/" element={<Navigate to="/foren" />} />
                <Route path="/login" element={<LoginScene useLogin={useLogin} />} />
                <Route path="foren" element={<Forum />}>
                    <Route path=":idForum" />
                </Route>
                <Route path="/foren/:idForum/addForum" element={<CreateUnterforum />} />
                <Route path="/foren/:idForum/addForeneintrag" element={<CreateForeneintrag />} />
                <Route path="/foren/:idForum/foreneintraege/:idForeneintrag" element={<Beitraege />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default MainPage
