import React, { useEffect, useState } from "react"
import style from "./Kontakt.module.css"
import { AiFillHome } from 'react-icons/ai'
import { AiFillClockCircle } from 'react-icons/ai'
import { AiTwotonePhone } from 'react-icons/ai'

export default function Kontakt() {

    return (
        <div >
            <div className={'defaultPageContainer', style.defaultPageContainerKontakt}>
                <h1>Wir sind für Sie da</h1>
                <div className={style.IconContainerKontak}>
                    <div className={style.Kontakticon1} ><AiFillHome size={100} /> <br />
                        <h3> Adresse:</h3>
                        <p>CoGo GmbH<br />Marienstraße 20 <br />89518 Heidenheim </p>
                        <p> 07321/86903 <br />support@cogo.de</p>
                    </div>
                </div>

                <h1>Wir sind für Sie da</h1>
                <div className={style.BitmojiContainerKontakt}>
                    <div className={style.BitmojiContainer}>
                        <img className={style.rund} src='./BitManni.jpeg' />
                        <p>"There is always a lighthouse, there's always a man, there's always a city."</p>
                    </div>
                    <div className={style.BitmojiContainer}>
                        <img className={style.rund} src='./BitFerd.png' />
                        <p>"Nothing happend here ...."</p>
                    </div>
                    <div className={style.BitmojiContainer}>
                        <img className={style.rund} src='./BitTimo.jpeg' />
                        <p> !!!#+#1!*05***11D5</p>
                    </div>
                    <div className={style.BitmojiContainer}>
                        <img className={style.rund} src='./BitLenny.jpeg' />
                        <p>"Wo war Gondor ?"</p>
                    </div>
                </div>
            </div>
        </div >
    )
}
