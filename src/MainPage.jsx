import React, { useState } from "react"
import { Navigate, Route, Routes, useNavigate } from "react-router"
import Footer from "./components/Footer"
import Header from "./components/Header/Header"
import { SideMenu, useSideMenuState } from "./components/SideMenu/SideMenu"
import useSearchResult from "./hooks/useSearchResult"
import DummyScene from "./Scenes/Dummy/DummyScene"
import Home from "./Scenes/Home/Home"

function MainPage(props) {
    const { useLogin } = props

    //page after Login
    //login handle with App.js
    const { items, setSearchInput } = useSearchResult()
    const sideMenuState = useSideMenuState()
    const [isSideMenuOpen, setSideMenuOpen] = sideMenuState

    return (
        <div>
            <Header useLogin={useLogin} setSearchInput={setSearchInput} setSideMenuOpen={setSideMenuOpen} />
            <SideMenu state={sideMenuState} />

            <Routes>
                <Route index element={<DummyScene />} />
                <Route path="/home" element={<Home />} />
                {/* <Route path="/items" element={<ItemOverview items={items} />} />
                <Route path="/items/new" element={<NewItemScene />} />
                <Route path="/items/:itemId" element={<ViewItemScene useLogin={useLogin} />} /> */}
            </Routes>
            <Footer />
        </div>
    )
}

export default MainPage
