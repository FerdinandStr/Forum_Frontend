import React, { useEffect, useState } from "react"
import styles from "./Foreneintraege.module.css"
import { Link } from "react-router-dom"
import { MdAddCircle } from "react-icons/md"
import { useNavigate } from "react-router"

import { basePath } from "../../../controller/rest"
import { countForeneintraegeInForum, getForeneintraegeInForum } from "../../../api/forenRoutes"
import Pagination, { usePaginationState } from "../../../components/Pagination/Pagination"
import { Button } from "@mui/material"
import Blockies from "react-blockies"

import { RiDiscussLine } from "react-icons/ri"
import { AiOutlineClockCircle } from "react-icons/ai"

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
        <div className={styles.EintreageArea}>
            <div className={styles.EintreagePaginationBar}>
                <Link to={`/foren/${idForum}/addForeneintrag`}>
                    <Button variant="contained" startIcon={<MdAddCircle />}>
                        Neuer Foreneintrag
                    </Button>
                </Link>
                {forneneintraegeCount > limit ? <Pagination externalPaginationState={paginationState} /> : null}
            </div>

            <div className={styles.EintreageContainer}>
                <div className={styles.EintreageHeaderDiv}>
                    <p className={styles.pEintreageEntryDiv}>
                        Diskussionen <RiDiscussLine size={20} /> <AiOutlineClockCircle size={20} />
                    </p>
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
    console.log("UPDATED ENDPOINT!!!", foreneintrag)
    return (
        <div className={styles.EintreageEntryDiv}>
            <div className={styles.ForeneintragInfo}>
                <div>
                    <Link to={"/foren/" + foreneintrag.idForum + "/foreneintraege/" + foreneintrag.idForeneintrag}>{foreneintrag.name} </Link>
                </div>

                <div> {foreneintrag.countBeitrag}</div>

                <div>
                    {new Date(foreneintrag.lastBeitrag.createdAt).toLocaleString([], {
                        weekday: "long",
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                    })}
                </div>
            </div>
        </div>
    )
}
