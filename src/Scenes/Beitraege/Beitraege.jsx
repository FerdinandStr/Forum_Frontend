import React, { useEffect, useRef, useState } from "react"
import styles from "./Beitraege.module.css"
import { getBeitraegeForForeneintrag, getForeneintraegeById } from "../../api/foreneintragRoutes"
import { useParams, useSearchParams } from "react-router-dom"
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
    const [beitragCount, setBeitragCount] = useState(0)

    //Pagination//
    //searchParams are updated inside the Pagination Component
    const [searchParams] = useSearchParams()
    const page = parseInt(searchParams.get("page"))
    const limit = parseInt(searchParams.get("limit"))
    const offset = limit * (page - 1)
    //to sync the 2 Pagination Components and load startPage and startLimit
    const paginationState = usePaginationState(beitragCount, page, limit)
    //---//

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
                    setBeitragCount(0)
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
            <DrillDownPath idForum={idForum} />

            <h1 className={styles.BeitragHeader}>{foreneintragData ? foreneintragData[0].name : null}</h1>

            <div className={styles.PaginationBar}>
                <Button variant="contained" onClick={() => myRef.current.scrollIntoView()}>
                    Neuer Beitrag
                </Button>
                <Pagination useURL externalPaginationState={paginationState} />
            </div>
            <div className={styles.BeitraegeContainer}>
                {beitragList ? (
                    beitragList.map((beitrag, i) => {
                        const beitragNumber = i + offset + 1
                        return <Beitrag key={beitrag.idBeitrag} beitragNumber={beitragNumber} parseMdToHtml={parseMdToHtml} beitragData={beitrag} />
                    })
                ) : (
                    <div>Fehler, keine Beiträge</div>
                )}
            </div>

            <div className={styles.PaginationBar}>
                <div />
                <Pagination useURL externalPaginationState={paginationState} />
            </div>
            <div ref={myRef}>
                <BeitragCreator parseMdToHtml={parseMdToHtml} forceUpdateBeitraege={forceUpdate} idForum={idForum} idForeneintrag={idForeneintrag} />
            </div>
        </div>
    )
}
