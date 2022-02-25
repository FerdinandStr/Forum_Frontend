import React, { useEffect, useState } from "react"
import styles from "./Beitraege.module.css"
import { getBeitraegeForForeneintrag, getForeneintraegeById } from "../../api/foreneintragRoutes"
import { useParams } from "react-router-dom"
import Beitrag from "./Beitrag"
import BeitragCreator from "./BeitragCreator"
import parseMdToHtml from "../../helper/parseMdToHtml"
import useForceUpdate from "../../hooks/useForceUpdate"
import DrillDownPath from "../../components/DrillDownPath/DrillDownPath"
import Pagination from "../../components/Pagination/Pagination"

export default function Beitraege() {
    let { idForum, idForeneintrag } = useParams()

    const [foreneintragData, setForeneintragData] = useState()
    const [beitragList, setBeitragList] = useState()
    const [trigger, forceUpdate] = useForceUpdate()
    //pagination data
    const [limitOffset, setLimitOffset] = useState({ limit: 10, offset: 0 })

    useEffect(() => {
        function getData() {
            getBeitraegeForForeneintrag(idForeneintrag, limitOffset.limit, limitOffset.offset)
                .then((data) => {
                    setBeitragList(data)
                    console.log(data)
                })
                .catch((err) => {
                    console.log("ERRROR", err)
                    setBeitragList()
                })
        }

        getData()
    }, [idForeneintrag, trigger, limitOffset])

    useEffect(() => {
        getForeneintraegeById({ idForum: idForum, idForeneintrag: idForeneintrag })
            .then((data) => {
                setForeneintragData(data)
                console.log(data)
            })
            .catch((data) => {})
    }, [idForum, idForeneintrag])

    return (
        <div>
            <DrillDownPath forumData={idForum} />

            <h1>{foreneintragData ? foreneintragData[0].name : null}</h1>
            <Pagination
                defaultLimit={limitOffset.limit}
                elementCount={61}
                handleChange={(limit, offset) => {
                    setLimitOffset({ limit, offset })
                }}
            />
            <div className={styles.content}>
                {beitragList
                    ? beitragList.map((beitrag) => <Beitrag key={beitrag.idBeitrag} parseMdToHtml={parseMdToHtml} beitragData={beitrag} />)
                    : console.log(beitragList)}
            </div>

            <BeitragCreator parseMdToHtml={parseMdToHtml} forceUpdateBeitraege={forceUpdate} idForum={idForum} idForeneintrag={idForeneintrag} />
        </div>
    )
}
