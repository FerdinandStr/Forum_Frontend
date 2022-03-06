import React, { useEffect, useState } from "react"
import styles from "./Foreneintraege.module.css"
import { Link } from "react-router-dom"
import { MdAddCircle } from "react-icons/md"
import { useNavigate } from "react-router"

import { basePath } from "../../../controller/rest"
import { getForeneintraegeByForum } from "../../../api/forenRoutes"
import Pagination, { usePaginationState } from "../../../components/Pagination/Pagination"
import { Button } from "@mui/material"
import Blockies from "react-blockies"

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
            <div className={styles.ErstellerDiv}>
                <Ersteller ersteller={foreneintrag.ersteller} />
            </div>
            <div className={styles.ForeneintragInfo}>
                <div className={styles.ForeneintragHeader}>
                    <Link to={"/foren/" + foreneintrag.idForum + "/foreneintraege/" + foreneintrag.idForeneintrag}>{foreneintrag.name} </Link>
                </div>
                <div className={styles.userInfo}>
                    <div className={styles.ForeneintragInhalt}>
                        <div>{/* <img src={basePath + foreneintrag.ersteller.pfad} alt="NIF" className={styles.ForeneintragInhalt} /> */}</div>
                        <div title={foreneintrag.idErsteller}>Erstellt von {foreneintrag.ersteller.erstellerName}</div>
                        <div> erstellt am {foreneintrag.createdAt} </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Ersteller({ ersteller }) {
    const { idErsteller, erstellerName, studiengangKuerzel, studiengangName } = ersteller

    return (
        <div className={styles.ErstellerDiv}>
            <div>
                <Blockies seed={idErsteller + erstellerName} size={10} scale={7} className={styles.BlockieProfil} />
            </div>
        </div>
    )
}
