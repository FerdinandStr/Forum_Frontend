import React, { useEffect, useState } from "react"
import styles from ".././ForumScene.module.css"
import GenericFoldingContainer from "./FoldingContainer/GenericFoldingContainer.jsx"
import { getBeitraegeForForeneintrag } from "../../../api/foreneintragRoutes"
import { Link } from "react-router-dom"

export default function Foreneintraege({ forumData }) {

    const [eintraege, setEintraege] = useState()
    useEffect(() => {
        getBeitraegeForForeneintrag(forumData)
            .then((data) => {
                setEintraege(data)
            })
            .catch((data) => { })
    }, [forumData])

    return (
        <GenericFoldingContainer key={2} headlineComponent={<h2>{"Diskussionen"} </h2>}>
            <div className={styles.content}>
                <div className={styles.item}>
                    <div className={styles.user}>
                    </div>
                </div>
                {eintraege
                    ? eintraege.map((eintrag) => (
                        <Foreneintrag eintrag={eintrag} key={eintrag.idForum} />
                    ))
                    : console.log(eintraege)}
            </div>
        </GenericFoldingContainer>)
}

function Foreneintrag({ eintrag }) {
    return (
        <div className={styles.content}>
            <hr />
            <Link to={"/foren/" + eintrag.idForum + "/foreneintraege/" + eintrag.idForeneintrag}>{eintrag.name} </Link>-#-{" "}
            {eintrag.ersteller} -#- {eintrag.createdAt}
            <hr />
        </div>
    )
}