import React, { useEffect, useState } from 'react'
import styles from "./Home.module.css"
import GenericFoldingContainer from "./Components/FoldingContainer/GenericFoldingContainer.jsx"
import ReactMarkdown from 'react-markdown'
import { getForeneintraegeById } from "../../api/foreneintragRoutes"
import { getForenById } from "../../api/forenRoutes"
import { useParams, Link } from "react-router-dom";
export default function Home() {

    let { forumId } = useParams();

    const [foren, setForen] = useState() //{ idParentForum: "", name: "", ersteller: "", createdAt: "", updatedAt: "" }
    const [eintraege, setEintraege] = useState()//{ idParentForum: "", name: "", ersteller: "", createdAt: "", updatedAt: "" }

    useEffect((() => {
        getForenById({ idParentForum: forumId })
            .then((data) => { setForen(data); })
            //.then(console.log(foren))
            .catch((data) => { })

        getForeneintraegeById({ idForum: forumId, idKategorie: "", idForeneintrag: "" })
            .then((data) => { console.log(data); setEintraege(data); })
            .catch((data) => { })
    }), [forumId])//foren, eintraege

    return <div className={styles.dummyDiv}>
        <div> DHBW-Heidenheim -> Wirtschaftsinformatik -> B -> Webprogramierung -> Props</div>
        <GenericFoldingContainer key={1} headlineComponent={<h2>{"Unterforen"}</h2>}>

            {foren
                ? foren.map(forum =>
                    <div className={styles.content}>
                        <hr />
                        <Link to={'/home/' + forum.idForum}>{forum.name}</Link> -#-   xXxAnzahl der Beiträge xXx  -#- {forum.createdAt}
                        <hr />
                    </div>
                )
                : console.log(foren)
            }


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
                {eintraege
                    ? eintraege.map(eintrag =>
                        <div className={styles.content}>
                            <hr />
                            {eintrag.name} -#-  {eintrag.ersteller}  -#- {eintrag.createdAt}
                            <hr />
                        </div>
                    )
                    : console.log(eintraege)
                }
            </div>
        </GenericFoldingContainer>
    </div>
}
