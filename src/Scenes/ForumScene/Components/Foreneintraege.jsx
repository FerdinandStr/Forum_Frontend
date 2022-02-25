import React, { useEffect, useState } from "react"
import styles from ".././ForumScene.module.css"
import GenericFoldingContainer from "../../../components/FoldingContainer/GenericFoldingContainer.jsx"
import { Link } from "react-router-dom"
import IconButton from "@mui/material/IconButton"
import { MdAddCircle } from "react-icons/md"
import { useNavigate } from "react-router"

import { basePath } from "../../../controller/rest"
import { getForeneintraegeByForum } from "../../../api/forenRoutes"

export default function Foreneintraege({ idForum }) {
    const navigate = useNavigate()

    const [forneneintraege, setForeneintraege] = useState()
    useEffect(() => {
        getForeneintraegeByForum(idForum)
            .then((data) => {
                setForeneintraege(data)
            })
            .catch((err) => {
                console.log("ERRROR!!!!", err)
                setForeneintraege()
            })
    }, [idForum])

    //onClick={changeToAddForenEintrag()}
    const changeToAddForenEintrag = (e) => {
        navigate("/foren/" + idForum + "/addForeneintrag")
    }

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
                {forneneintraege
                    ? forneneintraege.map((forneneintrag) => <Foreneintrag forneneintrag={forneneintrag} key={"fe" + forneneintrag.idForeneintrag} />)
                    : null}
            </div>
        </GenericFoldingContainer>
    )
}

function Foreneintrag({ forneneintrag }) {
    return (
        <div className={styles.item}>
            <div className={styles.topic}>
                <Link to={"/foren/" + forneneintrag.idForum + "/foreneintraege/" + forneneintrag.idForeneintrag}>{forneneintrag.name} </Link>
            </div>
            <div className={styles.userInfo}>
                <div>
                    <div>
                        <img src={basePath + forneneintrag.ersteller.pfad} alt="NIF" className={styles.userPic} />
                    </div>
                    <p>Beitrag von </p>
                    <p title={forneneintrag.idErsteller}>{forneneintrag.erstellerName}</p>
                    <p title={forneneintrag.studiengangName}>{forneneintrag.studiengangKuerzel}</p>
                    <p> erstellt am {forneneintrag.createdAt} </p>
                </div>
            </div>
        </div>
    )
}
