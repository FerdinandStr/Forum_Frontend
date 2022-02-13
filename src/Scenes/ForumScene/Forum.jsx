import React, { useEffect, useState } from "react"
import styles from "./ForumScene.module.css"
import GenericFoldingContainer from "./Components/FoldingContainer/GenericFoldingContainer.jsx"
import { getForeneintraegeById } from "../../api/foreneintragRoutes"
import { getForenById } from "../../api/forenRoutes"
import { useParams, Link } from "react-router-dom"

export default function Forum() {
    let { idForum } = useParams()
    idForum = idForum || 1

    const [foren, setForen] = useState() //{ idParentForum: "", name: "", ersteller: "", createdAt: "", updatedAt: "" }
    const [eintraege, setEintraege] = useState() //{ idParentForum: "", name: "", ersteller: "", createdAt: "", updatedAt: "" }

    useEffect(() => {
        getForenById({ idParentForum: idForum })
            .then((data) => {
                setForen(data)
            })
            .catch((data) => {})

        getForeneintraegeById({ idForum: idForum, idKategorie: "", idForeneintrag: "" })
            .then((data) => {
                setEintraege(data)
                console.log(data)
            })
            .catch((data) => {})
    }, [idForum]) //foren, eintraege

    return (
        <div>
            <GenericFoldingContainer key={1} headlineComponent={<h2>{"Unterforen"}</h2>}>
                {foren
                    ? foren.map((forum) => (
                          <div className={styles.content}>
                              <hr />
                              <Link to={"/foren/" + forum.idForum}>{forum.name}</Link> -#- xXxAnzahl der Beiträge xXx -#- {forum.createdAt}
                              <hr />
                          </div>
                      ))
                    : null}

                <div className={styles.content}>"Test 123"</div>
            </GenericFoldingContainer>

            <GenericFoldingContainer key={2} headlineComponent={<h2>{"Diskussionen"}</h2>}>
                <div className={styles.content}>
                    <div className={styles.item}>
                        <img
                            src="https://www.belloflostsouls.net/wp-content/uploads/2021/10/Hawkeye-hawkeye-disney-Lucky-Pizza-Dog-on-set.jpg"
                            alt="NIF"
                            className={styles.userPic}
                        />
                        <div className={styles.user}>
                            <div>Ersteller: Timo O.</div>
                            <div>Erstellt am 12.12.12 19:30</div>
                        </div>

                        <div>Wie kann ich Variablen an ein Übergerodnetes Objekt zurückgeben bzw. dort ändern ?</div>
                    </div>
                    {eintraege
                        ? eintraege.map((eintrag) => (
                              <div className={styles.content}>
                                  <hr />
                                  <Link to={"/foren/" + eintrag.idForum + "/foreneintraege/" + eintrag.idForeneintrag}>{eintrag.name} </Link>-#-{" "}
                                  {eintrag.ersteller} -#- {eintrag.createdAt}
                                  <hr />
                              </div>
                          ))
                        : console.log(eintraege)}
                </div>
            </GenericFoldingContainer>
        </div>
    )
}
