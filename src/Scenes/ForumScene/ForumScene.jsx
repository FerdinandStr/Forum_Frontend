import React, { useState } from "react"
import { useParams } from "react-router-dom"

import Subforum from "./Components/Subforen"
import Foreneintraege from "./Components/Foreneintraege"
import DrillDownPath from "../../components/DrillDownPath/DrillDownPath"
import styles from "./ForumScene.module.css"

export default function Forum() {
    let { idForum } = useParams()
    idForum = idForum || 1

    const [forumName, setForumName] = useState()

    return (
        <>
            <DrillDownPath idForum={idForum} returnActiveForumName={(forum) => setForumName(forum)} />
            <h1 className={styles.ForumHeader}>{forumName || "Forenname fehlt"}</h1>
            <Subforum idForum={idForum} />
            <Foreneintraege idForum={idForum} />
        </>
    )
}
