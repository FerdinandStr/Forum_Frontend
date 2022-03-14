import React, { useEffect, useState } from "react"
import styles from "./Foreneintraege.module.css"
import { Link } from "react-router-dom"
import { MdAddCircle } from "react-icons/md"
import { useNavigate } from "react-router"

import { countForeneintraegeInForum, getForeneintraegeInForum } from "../../../api/forenRoutes"
import Pagination, { usePaginationState } from "../../../components/Pagination/Pagination"
import { Button } from "@mui/material"

import { RiDiscussLine } from "react-icons/ri"
import { AiOutlineClockCircle } from "react-icons/ai"

import Blockies from "react-blockies"

export default function Foreneintraege({ idForum }) {
    const navigate = useNavigate()

    const [forneneintraegeCount, setForneneintraegeCount] = useState(0)
    const paginationState = usePaginationState(forneneintraegeCount)
    const { limit, offset } = paginationState[0]

    const [forneneintraege, setForeneintraege] = useState()
    useEffect(() => {
        countForeneintraegeInForum(idForum).then((count) => {
            setForneneintraegeCount(count)
        })

        getForeneintraegeInForum(idForum, limit, offset)
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
                {forneneintraegeCount ? <Pagination externalPaginationState={paginationState} /> : null}
            </div>

            <div className={styles.EintreageContainer}>
                <div className={styles.EintreageHeaderDiv}>
                    <div className={styles.HeaderForeneintrag}>{"Foreneinträge"}</div>
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
    const { ersteller, createdAt } = foreneintrag.lastBeitrag
    return (
        <div className={styles.ForeneintragDiv}>
            <div className={styles.ForeneintragLink}>
                <Link to={"/foren/" + foreneintrag.idForum + "/foreneintraege/" + foreneintrag.idForeneintrag}>
                    <h3>{foreneintrag.name}</h3>
                </Link>
            </div>

            <p className={styles.BeitraegeCount}> {foreneintrag.countBeitrag}</p>

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
