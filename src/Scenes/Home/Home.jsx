import React, { useEffect, useState } from 'react'
import styles from "./Home.module.css"
import GenericFoldingContainer from "./Components/FoldingContainer/GenericFoldingContainer.jsx"
import ReactMarkdown from 'react-markdown'
import { getForeneintraegeById } from "../../api/foreneintragRoutes"
import { getForenById } from "../../api/forenRoutes"

export default function Home() {

    const [foren, setForen] = useState({ idParentForum: "", name: "", ersteller: "", createdAt: "", updatedAt: "" })
    const [eintraege, setEintraege] = useState({ idForeneintrag: "", idForum: "", name: "", idKategorie: "", ersteller: "", createdAt: "", updatedAt: "" })

    useEffect((() => {
        getForenById({ idParentForum: 1 })
            .then((data) => { console.log(data) })
            .catch((data) => { })

        getForeneintraegeById({ idForum: 1, idKategorie: "", idForeneintrag: "" })
            .then((data) => { console.log(data) })
            .catch((data) => { })
    }), [foren, eintraege])

    return <div className={styles.dummyDiv}>
        <div> DHBW-Heidenheim -> Wirtschaftsinformatik -> B -> Webprogramierung -> Props</div>
        <GenericFoldingContainer key={1} headlineComponent={<h2>{"Unterforen"}</h2>}>
            <div className={styles.content}>
                <ReactMarkdown>{"Test 123"}</ReactMarkdown>
            </div>
        </GenericFoldingContainer>

        <GenericFoldingContainer key={2} headlineComponent={<h2>{"Kommentare"}</h2>}>
            <div className={styles.content}>
                <div className={styles.item}>
                    <img src="https://www.belloflostsouls.net/wp-content/uploads/2021/10/Hawkeye-hawkeye-disney-Lucky-Pizza-Dog-on-set.jpg" alt="NIF" className={styles.userPic} />
                    <div className={styles.user}>
                        <div>Ersteller: Timo O.</div>
                        <div>Erstellt am 12.12.12 19:30</div>
                    </div>

                    <div>Wie kann ich Variablen an ein Übergerodnetes Objekt zurückgeben bzw. dort ändern ?</div>
                </div>
                <ReactMarkdown>{"Test 123"}</ReactMarkdown>
                <ReactMarkdown>{"Test 456"}</ReactMarkdown>
                <ReactMarkdown>{"Test 789"}</ReactMarkdown>
            </div>
        </GenericFoldingContainer>
    </div>
}
