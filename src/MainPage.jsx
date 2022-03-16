import React from "react"
import { Navigate, Route, Routes } from "react-router"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import CreateUnterforum from "./Scenes/CreateUnterforum/CreateUnterforum"
import CreateForeneintrag from "./Scenes/CreateForeneintrag/CreateForeneintrag"
import Beitraege from "./Scenes/Beitraege/Beitraege"
import useLoginStatus from "./hooks/useLoginStatus"
import LoginScene from "./Scenes/Login/LoginScene"
import Forum from "./Scenes/ForumScene"
import AGB from "./Scenes/AGB/AGB"
import Impressum from "./Scenes/Impressum/Impressum"
import Kontakt from "./Scenes/Kontakt/Kontakt"
import Particles from "react-tsparticles"
import UserOverview from "./Scenes/UserOverview/UserOverview"

function MainPage() {
    const useLogin = useLoginStatus()

    // const particlesInit = (main) => {
    //     console.log("INIT", main)

    //     // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // }

    // const particlesLoaded = (container) => {
    //     console.log("LOADED", container)
    // }

    return (
        <div>
            <Particles
                id="tsparticles"
                // init={particlesInit}
                // loaded={particlesLoaded}
                options={{
                    background: {
                        color: {
                            value: "#353c40",
                        },
                    },
                    fpsLimit: 60,
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        links: {
                            color: "#ffffff",
                            distance: 150,
                            enable: true,
                            opacity: 0.3,
                            width: 1,
                        },
                        collisions: {
                            enable: true,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outMode: "bounce",
                            random: false,
                            speed: 0.3,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 80,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "image",
                            image: {
                                src: "/img/LogoMattBlack.svg",
                                width: 10,
                                height: 10,
                            },
                        },
                        size: {
                            // random: true,
                            value: 20,
                        },
                    },
                }}
            />

            <Header useLogin={useLogin} />

            <script src="particles.js"></script>

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

                    <Route path="/profil" element={<UserOverview useLogin={useLogin} />} />
                </Routes>
            </div>

            <Footer />
        </div>
    )
}

export default MainPage
