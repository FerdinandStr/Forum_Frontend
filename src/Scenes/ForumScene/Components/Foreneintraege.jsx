import React, { useEffect, useState } from "react"
import styles from ".././ForumScene.module.css"
import GenericFoldingContainer from "../../../components/FoldingContainer/GenericFoldingContainer.jsx"
import { Link } from "react-router-dom"
import IconButton from "@mui/material/IconButton"
import { MdAddCircle } from "react-icons/md"
import { useNavigate } from "react-router"

import { basePath } from "../../../controller/rest"
import { getForeneintraegeByForum } from "../../../api/forenRoutes"
import Pagination, { usePaginationState } from "../../../components/Pagination/Pagination"
import { countBeitraege } from "../../../api/beitragRoutes"

export default function Foreneintraege({ idForum }) {
    const navigate = useNavigate()

    const [beitragCount, setBeitragCount] = useState(0)
    const paginationState = usePaginationState(beitragCount)
    const { limit, offset } = paginationState[0]

    const [forneneintraege, setForeneintraege] = useState()
    useEffect(() => {
        getForeneintraegeByForum(idForum, limit, offset)
            .then((data) => {
                console.log(data)
                setForeneintraege(data)
            })
            .catch((err) => {
                console.log("ERRROR!!!!", err)
                setForeneintraege()
            })
    }, [idForum, limit, offset])

    //onClick={changeToAddForenEintrag()}
    const changeToAddForenEintrag = (e) => {
        navigate("/foren/" + idForum + "/addForeneintrag")
    }

    return (
        <div>
            <Pagination externalPaginationState={paginationState} />
            <div className={styles.ContainerHeader}>
                <h2>{"Diskussionen"} </h2>
                <Link to={`/foren/${idForum}/addForeneintrag`}>
                    <IconButton
                        color="primary"
                        aria-label="add Unterforum"
                        component="span"
                    >
                        {/* Icons, auch MaterialDesign von https://react-icons.github.io/react-icons/search?q=addcircle */}
                        <MdAddCircle />
                    </IconButton>
                </Link>
            </div>
            <div className={styles.content}>
                {forneneintraege
                    ? forneneintraege.map((forneneintrag) => <Foreneintrag forneneintrag={forneneintrag} key={"fe" + forneneintrag.idForeneintrag} />)
                    : null}
            </div>
            <Pagination externalPaginationState={paginationState} />
        </div>


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
