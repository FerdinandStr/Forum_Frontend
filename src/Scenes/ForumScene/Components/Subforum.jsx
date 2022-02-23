import React, { useEffect, useState } from "react"
import styles from ".././ForumScene.module.css"
import GenericFoldingContainer from "./FoldingContainer/GenericFoldingContainer.jsx"
import { getSubforen } from "../../../api/forenRoutes"
import { Link } from "react-router-dom"

export default function Subforum({ forumData }) {
    const [foren, setForen] = useState()

    useEffect(() => {
        getSubforen(forumData)
            .then((data) => {
                setForen(data)
            })
            .catch((data) => {})
    }, [forumData])

    return (
        <GenericFoldingContainer key={1} initialOpen headlineComponent={<h2>{"Unterforen"}</h2>}>
            {foren ? foren.map((forum) => <Forum forum={forum} key={forum.idForum} />) : null}
        </GenericFoldingContainer>
    )
}

function Forum({ forum }) {
    return (
        <div className={styles.content}>
            <hr />
            <Link to={"/foren/" + forum.idForum}>{forum.name}</Link> -#- xXxAnzahl der Beiträge xXx -#- {forum.createdAt}
            <hr />
        </div>
    )
}
