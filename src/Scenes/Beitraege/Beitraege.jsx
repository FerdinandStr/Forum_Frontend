import React, { useEffect, useRef, useState } from "react"
import styles from "./Beitraege.module.css"
import { getBeitraegeForForeneintrag, getForeneintraegeById } from "../../api/foreneintragRoutes"
import { useParams } from "react-router-dom"
import Beitrag from "./Beitrag"
import BeitragCreator from "./MD/BeitragCreator"
import parseMdToHtml from "../../helper/parseMdToHtml"
import useForceUpdate from "../../hooks/useForceUpdate"
import DrillDownPath from "../../components/DrillDownPath/DrillDownPath"
import Pagination, { usePaginationState } from "../../components/Pagination/Pagination"
import { countBeitraege } from "../../api/beitragRoutes"
import { Button } from "@mui/material"

export default function Beitraege() {
    let { idForum, idForeneintrag } = useParams()

    const [foreneintragData, setForeneintragData] = useState()
    const [beitragList, setBeitragList] = useState()
    const [trigger, forceUpdate] = useForceUpdate()
    //pagination data
    const [beitragCount, setBeitragCount] = useState(0)
    const paginationState = usePaginationState(beitragCount)
    const { limit, offset } = paginationState[0]

    useEffect(() => {
        function getData() {
            countBeitraege({ idForeneintrag }).then((count) => setBeitragCount(count))

            getBeitraegeForForeneintrag(idForeneintrag, limit, offset)
                .then((data) => {
                    setBeitragList(data)
                })
                .catch((err) => {
                    console.log("ERRROR", err)
                    setBeitragList()
                })
        }

        getData()
    }, [idForeneintrag, trigger, limit, offset])

    useEffect(() => {
        getForeneintraegeById({ idForeneintrag: idForeneintrag })
            .then((data) => {
                setForeneintragData(data)
            })
            .catch((data) => {})
    }, [idForum, idForeneintrag])

    //ref for scrolling to Markdown component
    const myRef = useRef(null)

    return (
        <div>
            <DrillDownPath forumData={idForum} />

            <h1 className={styles.BeitragHeader}>{foreneintragData ? foreneintragData[0].name : null}</h1>

            <div className={styles.PaginationBar}>
                <Button variant="contained" onClick={() => myRef.current.scrollIntoView()}>
                    Neuer Beitrag
                </Button>
                <Pagination externalPaginationState={paginationState} />
            </div>
            <div className={styles.BeitraegeContainer}>
                {beitragList ? (
                    beitragList.map((beitrag) => <Beitrag key={beitrag.idBeitrag} parseMdToHtml={parseMdToHtml} beitragData={beitrag} />)
                ) : (
                    <div>Fehler, keine Beiträge</div>
                )}
            </div>

            <div className={styles.PaginationBar}>
                <div />
                <Pagination externalPaginationState={paginationState} />
            </div>
            <div ref={myRef}>
                <BeitragCreator parseMdToHtml={parseMdToHtml} forceUpdateBeitraege={forceUpdate} idForum={idForum} idForeneintrag={idForeneintrag} />
            </div>
        </div>
    )
}
