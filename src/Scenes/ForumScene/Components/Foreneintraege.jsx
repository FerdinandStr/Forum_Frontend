import React, { useEffect, useState } from "react"
import styles from "./Foreneintraege.module.css"
import { Link } from "react-router-dom"
import { MdAddCircle } from "react-icons/md"
import { useNavigate } from "react-router"

import { basePath } from "../../../controller/rest"
import { getForeneintraegeByForum } from "../../../api/forenRoutes"
import Pagination, { usePaginationState } from "../../../components/Pagination/Pagination"
import { Button } from "@mui/material"

export default function Foreneintraege({ idForum }) {
    const navigate = useNavigate()

    const [beitragCount, setBeitragCount] = useState(0)
    const paginationState = usePaginationState(beitragCount)
    const { limit, offset } = paginationState[0]

    const [forneneintraege, setForeneintraege] = useState()
    useEffect(() => {
        getForeneintraegeByForum(idForum, limit, offset)
            .then((data) => {
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
        <div className={styles.EintreageArea}>
            <div className={styles.EintreagePaginationBar}>
                <Link to={`/foren/${idForum}/addForeneintrag`}>
                    <Button variant="contained" startIcon={<MdAddCircle />}>
                        Neuer Foreneintrag
                    </Button>
                </Link>
                <Pagination externalPaginationState={paginationState} />
            </div>


            <div className={styles.EintreageContainer}>
                <div className={styles.EintreageHeaderDiv}>
                    <p>Diskussionen</p>
                </div>

                <div className={styles.EintreageList}>
                    {forneneintraege
                        ? forneneintraege.map((foreneintrag) => <Foreneintrag foreneintrag={foreneintrag} key={"fe" + foreneintrag.idForeneintrag} />)
                        : null}
                </div>
            </div>
        </div>
    )
}

function Foreneintrag({ foreneintrag }) {
    console.log(foreneintrag)
    return (
        <div className={styles.EintreageEntryDiv}>
            <div className={styles.topic}>
                <Link to={"/foren/" + foreneintrag.idForum + "/foreneintraege/" + foreneintrag.idForeneintrag}>{foreneintrag.name} </Link>
            </div>
            <div className={styles.userInfo}>
                <div>
                    <div>{/* <img src={basePath + foreneintrag.ersteller.pfad} alt="NIF" className={styles.userPic} /> */}</div>
                    <p>Beitrag von </p>
                    <p title={foreneintrag.idErsteller}>{foreneintrag.erstellerName}</p>
                    <p title={foreneintrag.studiengangName}>{foreneintrag.studiengangKuerzel}</p>
                    <p> erstellt am {foreneintrag.createdAt} </p>
                </div>
            </div>
        </div>
    )
}
