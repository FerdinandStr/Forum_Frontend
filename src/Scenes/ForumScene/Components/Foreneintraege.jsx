import React, { useEffect, useState } from "react"
import styles from ".././ForumScene.module.css"
import GenericFoldingContainer from "./FoldingContainer/GenericFoldingContainer.jsx"
import { getBeitraegeForForeneintrag } from "../../../api/foreneintragRoutes"
import { Link } from "react-router-dom"
import IconButton from '@mui/material/IconButton';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useNavigate } from "react-router"

export default function Foreneintraege({ forumData }) {

    const navigate = useNavigate()

    const [eintraege, setEintraege] = useState()
    useEffect(() => {
        console.log(forumData)
        getBeitraegeForForeneintrag(forumData)
            .then((data) => {
                setEintraege(data)
                console.log(data)
            })
            .catch((data) => { })
    }, [forumData])

    //onClick={changeToAddForenEintrag()}
    const changeToAddForenEintrag = (e) => {
        navigate("/foren/" + forumData + "/addForeneintrag")
    }

    return (
        <GenericFoldingContainer key={2} headlineComponent={<div><h2>{"Diskussionen"} </h2>
            <IconButton color="primary" aria-label="add Unterforum" component="span" > <AddCircleRoundedIcon /></IconButton></div>
        }>
            <div className={styles.content}>
                <div className={styles.item}>
                    <div className={styles.user}>
                    </div>
                </div>
                {eintraege
                    ? eintraege.map((eintrag) => (
                        <Foreneintrag eintrag={eintrag} key={eintrag.idForum} />
                    ))
                    : null}
            </div>
        </GenericFoldingContainer>)
}

function Foreneintrag({ eintrag }) {
    return (
        <div className={styles.content} key={eintrag.idForum}>
            <hr />
            <Link to={"/foren/" + eintrag.idForum + "/foreneintraege/" + eintrag.idForeneintrag}>{eintrag.name} </Link>-#-{" "}
            {eintrag.ersteller.name} -#- {eintrag.createdAt}
            <hr />
        </div>
    )
}