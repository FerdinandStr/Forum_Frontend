import React, { useEffect, useState, useContext } from "react"
import styles from "./Foreneintraege.module.css"
import { Link } from "react-router-dom"
import { MdAddCircle } from "react-icons/md"

import { countForeneintraegeInForum, getForeneintraegeInForum } from "../../../api/forenRoutes"
import Pagination, { usePaginationState } from "../../../components/Pagination/Pagination"
import { Button } from "@mui/material"

import { RiDiscussLine } from "react-icons/ri"
import { AiOutlineClockCircle, AiOutlineTag } from "react-icons/ai"

import Blockies from "react-blockies"
import { getKategorie } from "../../../api/kategorieRoutes"

import { AlertContext } from "../../../helper/AlertContext"

export default function Foreneintraege({ idForum }) {
    const [forneneintraegeCount, setForneneintraegeCount] = useState(0)
    const paginationState = usePaginationState(forneneintraegeCount)
    const { limit, offset } = paginationState[0]
    const { sendAlert } = useContext(AlertContext)

    const [kategorieList, setKategorieList] = useState()

    const [forneneintraege, setForeneintraege] = useState()
    useEffect(() => {
        countForeneintraegeInForum(idForum).then((count) => {
            setForneneintraegeCount(count)
        })

        getForeneintraegeInForum(idForum, limit, offset)
            .then((data) => {
                setForeneintraege(data)
            })
            .catch((e) => {
                sendAlert(e.error, "error")
                setForeneintraege()
            })
    }, [idForum, limit, offset])

    useEffect(() => {
        getKategorie()
            .then((data) => {
                setKategorieList(data)
            })
            .catch((e) => {
                sendAlert(e.error, "error")
            })
    }, [idForum])

    return (
        <div className={styles.EintreageArea}>
            <div className={styles.EintreagePaginationBar}>
                <Link to={`/foren/${idForum}/addForeneintrag`}>
                    <Button variant="contained" startIcon={<MdAddCircle />}>
                        Neuer Foreneintrag
                    </Button>
                </Link>
                {forneneintraegeCount ? <Pagination externalPaginationState={paginationState} /> : null}
            </div>

            <div className={styles.EintreageContainer}>
                <div className={styles.EintreageHeaderDiv}>
                    <div className={styles.HeaderForeneintrag}>{"Foreneinträge"}</div>
                    <AiOutlineTag className={styles.HeaderKategorie} size={20} />
                    <RiDiscussLine className={styles.HeaderCount} size={20} />
                    <AiOutlineClockCircle className={styles.HeaderLetzterBeitrag} size={20} />
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
    const { idForum, idForeneintrag, name, countBeitrag, kategorieName } = foreneintrag
    const { ersteller, createdAt } = foreneintrag.lastBeitrag
    return (
        <div className={styles.ForeneintragDiv}>
            <div className={styles.ForeneintragLink}>
                <Link to={"/foren/" + idForum + "/foreneintraege/" + idForeneintrag}>
                    <h3>{name}</h3>
                </Link>
            </div>

            <p className={styles.KategorieName}>{kategorieName}</p>

            <p className={styles.BeitraegeCount}> {countBeitrag}</p>

            <div className={styles.LetzterBeitragDiv}>
                <ErstellerProfil ersteller={ersteller} />
                <div className={styles.LetzterBeitragInfo}>
                    <p>
                        von <span className={styles.ErstellerName}>{ersteller.erstellerName}</span>
                    </p>
                    <p>
                        {new Date(createdAt).toLocaleString([], {
                            weekday: "long",
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                        })}
                    </p>
                </div>
            </div>
        </div>
    )
}

function ErstellerProfil({ ersteller }) {
    const { idErsteller, erstellerName } = ersteller

    return <Blockies seed={idErsteller + erstellerName} size={10} scale={5} className={styles.BlockieProfil} />
}
