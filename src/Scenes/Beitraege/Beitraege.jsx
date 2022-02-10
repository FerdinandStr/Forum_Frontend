import React, { useEffect, useState } from "react"
import styles from "./Beitraege.module.css"
import { getBeitraegeForForeneintrag, getForeneintraegeById } from "../../api/foreneintragRoutes"
import { useParams } from "react-router-dom"
import Beitrag from "./Beitrag"
import BeitragCreator from "./BeitragCreator"
import parseMdToHtml from "../../helper/parseMdToHtml"
import useForceUpdate from "../../hooks/useForceUpdate"

export default function Beitraege() {
    let { idForum, idForeneintrag } = useParams()

    const [akForenbeitrag, setakForenbeitrag] = useState()
    const [beitragList, setBeitragList] = useState()
    const [trigger, forceUpdate] = useForceUpdate()

    useEffect(() => {
        function getData() {
            getBeitraegeForForeneintrag(idForeneintrag)
                .then((data) => {
                    setBeitragList(data)
                    console.log(data)
                })
                .catch((data) => {})

            getForeneintraegeById({ idForum: idForum, idForeneintrag: idForeneintrag })
                .then((data) => {
                    setakForenbeitrag(data)
                    console.log(data)
                })
                .catch((data) => {})
        }

        getData()
    }, [idForum, idForeneintrag, trigger])

    return (
        <div className={styles.dummyDiv}>
            <div> DHBW-Heidenheim -> Wirtschaftsinformatik -> B -> Webprogramierung -> Props</div>

            <h1>{akForenbeitrag ? akForenbeitrag[0].name : null}</h1>
            <div className={styles.content}>
                {beitragList
                    ? beitragList.map((beitrag) => <Beitrag key={beitrag.idBeitrag} parseMdToHtml={parseMdToHtml} beitragData={beitrag} />)
                    : console.log(beitragList)}
            </div>

            <BeitragCreator parseMdToHtml={parseMdToHtml} forceUpdateBeitraege={forceUpdate} idForum={idForum} idForeneintrag={idForeneintrag} />
        </div>
    )
}
