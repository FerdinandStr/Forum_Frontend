import React from "react"
import Particles from "react-tsparticles"

export default function ParticlesBg() {
    // const particlesInit = (main) => {
    //     console.log("INIT", main)

    //     // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // }

    // const particlesLoaded = (container) => {
    //     console.log("LOADED", container)
    // }

    return (
        <>
            <script src="particles.js"></script>
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
        </>
    )
}
