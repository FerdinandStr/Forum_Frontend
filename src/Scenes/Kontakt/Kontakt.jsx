import React, { useEffect, useState } from "react"
import style from "./Kontakt.module.css"
import { AiFillHome } from "react-icons/ai"
import { AiFillClockCircle } from "react-icons/ai"
import { AiFillPhone } from "react-icons/ai"

export default function Kontakt() {
    return (
        <div>
            <div className={("defaultPageContainer", style.defaultPageContainerKontakt)}>
                <h1>Wir sind für Sie da</h1>

                <div className={("defaultPageContainer", style.InfoItemContainer)}>
                    <div className={style.IconContainerKontakt}>
                        <div className={style.Kontakticon1}>
                            <AiFillHome size={100} />
                            <h3> Adresse:</h3>
                            <p>
                                DHBW-Forum n.eV
                                <br />
                                Marienstraße 20 <br />
                                89518 Heidenheim{" "}
                            </p>
                        </div>
                    </div>
                    <div className={style.IconContainerKontakt}>
                        <div className={style.Kontakticon1}>
                            <AiFillClockCircle size={100} />
                            <h3>Geschäftszeiten:</h3>
                            <p>
                                Montag - Sonntag (8:00 - 24:00 Uhr) <br></br>An Feiertagen (0:00 - 24:00 Uhr)
                            </p>
                        </div>
                    </div>
                    <div className={style.IconContainerKontakt}>
                        <div className={style.Kontakticon1}>
                            <AiFillPhone size={100} />
                            <h3>Support erreichbar unter:</h3>
                            <p>
                                {" "}
                                07321/86903 <br />
                                <a href="mailto:support@dhbw-forum.cz">support@dhbw-forum.cz</a>
                            </p>
                        </div>
                    </div>
                </div>

                <h1>Wir sind für Sie da</h1>
                <div className={style.BitmojiContainerKontakt}>
                    <div className={style.BitmojiContainer}>
                        <img className={style.rund} src="./BitManni.jpeg" />
                        <p>"There is always a lighthouse, there's always a man, there's always a city."</p>
                    </div>
                    <div className={style.BitmojiContainer}>
                        <img className={style.rund} src="./BitFerd.png" />
                        <p>"Nothing happend here ...."</p>
                    </div>
                    <div className={style.BitmojiContainer}>
                        <img className={style.rund} src="./BitTimo.jpeg" />
                        <p> !!!#+#1!*05***11D5</p>
                    </div>
                    <div className={style.BitmojiContainer}>
                        <img className={style.rund} src="./BitLenny.jpeg" />
                        <p>"Wo war Gondor ?"</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
