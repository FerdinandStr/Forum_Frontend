import React, { useEffect, useState } from "react"
import styles from "./Beitraege.module.css"
import ReactMarkdown from "react-markdown"
import { getBeitraegeForForeneintrag, getForeneintraegeById } from "../../api/foreneintragRoutes"
import { getForenById } from "../../api/forenRoutes"
import { useParams, Link } from "react-router-dom"
import { getBeitraege, postBeitraege } from "../../api/beitragRoutes"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Beitrag from "./Beitrag"

export default function Beitraege() {
    let { idForum, idForeneintrag } = useParams()

    const [akForenbeitrag, setakForenbeitrag] = useState()
    const [neuerBeitrag, setNeuerBeitrag] = useState()
    const [beitragList, setBeitragList] = useState()

    const handleChangeinitNeuerBeitrag = (e) => {
        setNeuerBeitrag(e.target.value)
    }

    const createBeitrag = (e) => {
        let data_beitrag = {
            idForum: parseInt(idForum),
            idForeneintrag: parseInt(idForeneintrag),
            inhalt: neuerBeitrag,
        }
        if (neuerBeitrag) {
            postBeitraege(data_beitrag)
        }
    }

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

        const interval = setInterval(() => {
            getData()
        }, 10000)
        return () => clearInterval(interval)
    }, [idForum, idForeneintrag])

    return (
        <div className={styles.dummyDiv}>
            <div> DHBW-Heidenheim -> Wirtschaftsinformatik -> B -> Webprogramierung -> Props</div>
            <br />
            <br />
            <br />
            <h1>{akForenbeitrag ? akForenbeitrag[0].name : null}</h1>
            <div className={styles.content}>
                {beitragList ? beitragList.map((beitrag) => <Beitrag key={beitrag.idBeitrag} beitragData={beitrag} />) : console.log(beitragList)}
            </div>
            <TextField id="outlined-disabled" label="Beschreibung" onChange={handleChangeinitNeuerBeitrag} />

            <Button variant="contained" onClick={createBeitrag}>
                Erstellen
            </Button>
        </div>
    )
}
