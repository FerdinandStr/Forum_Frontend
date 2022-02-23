import React, { useEffect, useState } from "react"
import styles from ".././ForumScene.module.css"
import GenericFoldingContainer from "./FoldingContainer/GenericFoldingContainer.jsx"
import { getBeitraegeForForeneintrag } from "../../../api/foreneintragRoutes"
import { Link } from "react-router-dom"
import IconButton from "@mui/material/IconButton"
import { MdAddCircle } from "react-icons/md"
import { useNavigate } from "react-router"

import { basePath } from "../../../controller/rest"

export default function Foreneintraege({ idForum }) {
    const navigate = useNavigate()

    const [eintraege, setEintraege] = useState()
    useEffect(() => {
        console.log(idForum)
        getBeitraegeForForeneintrag(idForum)
            .then((data) => {
                setEintraege(data)
                console.log(data)
            })
            .catch((data) => {})
    }, [idForum])

    //onClick={changeToAddForenEintrag()}
    const changeToAddForenEintrag = (e) => {
        navigate("/foren/" + idForum + "/addForeneintrag")
    }

    console.log(eintraege)

    return (
        <GenericFoldingContainer
            key={2}
            // cooool neu, standard open
            initialOpen
            headlineComponent={
                <div>
                    <h2>{"Diskussionen"} </h2>
                    <Link to={`/foren/${idForum}/addForeneintrag`}>
                        <IconButton
                            color="primary"
                            aria-label="add Unterforum"
                            component="span"
                            onClick={(event) => {
                                // stop click event from going up to parent element (Nicht benötigt wenn weitergeleitet wird)
                                event.stopPropagation()
                                console.log("Grüße Manni", event)
                                //TODO entweder navigate hier oder <Link> benutzen
                                //Berechtigung? => Am besten Button garnicht rein reichen in headlineComponent
                            }}
                        >
                            {/* Icons, auch MaterialDesign von https://react-icons.github.io/react-icons/search?q=addcircle */}
                            <MdAddCircle />
                        </IconButton>
                    </Link>
                </div>
            }
        >
            <div className={styles.content}>
                {eintraege ? eintraege.map((eintrag) => <Foreneintrag eintrag={eintrag} key={eintrag.idForum} />) : null}
            </div>
        </GenericFoldingContainer>
    )
}

function Foreneintrag({ eintrag }) {
    return (
        <div className={styles.item} key={eintrag.idForum}>
            <div>
                <img src={basePath + eintrag.ersteller.pfad} alt="NIF" className={styles.userPic} />
            </div>
            <div className={styles.userInfo}>
                <div>Beitrag von </div>
                <div> {eintrag.ersteller.erstellerName}</div>
                <div>{eintrag.ersteller.studiengangKuerzel} </div>
                <div> {eintrag.ersteller.studiengangKuerzel}</div>
                <div> erstellt am {eintrag.createdAt} </div>
            </div>
            <div className={styles.topic}>
                <Link to={"/foren/" + eintrag.idForum + "/foreneintraege/" + eintrag.idForeneintrag}>{eintrag.inhalt} </Link>
                {eintrag.ersteller.name} {eintrag.createdAt}
            </div>
        </div>
    )
}
