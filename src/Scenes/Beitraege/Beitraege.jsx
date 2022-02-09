import React, { useEffect, useState } from 'react'
import styles from "./Beitraege.module.css"
import ReactMarkdown from 'react-markdown'
import { getForeneintraegeById } from "../../api/foreneintragRoutes"
import { getForenById } from "../../api/forenRoutes"
import { useParams, Link } from "react-router-dom";
import { getBeitraege, postBeitraege } from "../../api/beitragRoutes"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Beitraege() {

    let { idForum, idForeneintrag } = useParams();

    const [akForenbeitrag, setakForenbeitrag] = useState()
    const [neuerBeitrag, setNeuerBeitrag] = useState()
    const [eintraege, setEintraege] = useState()

    const handleChangeinitNeuerBeitrag = (e) => {
        setNeuerBeitrag(e.target.value)
    }

    const createBeitrag = (e) => {
        let data_beitrag = {
            "idForum": parseInt(idForum),
            "idForeneintrag": parseInt(idForeneintrag),
            "inhalt": neuerBeitrag

        }
        if (neuerBeitrag) {
            postBeitraege(data_beitrag);
        }

    }

    useEffect((() => {
        let params_Beitrag = {
            "idBeitrag": null,
            "idForum": idForum,
            "idForeneintrag": idForeneintrag,
            "ersteller": null
        }
        getBeitraege(params_Beitrag)
            .then((data) => { setEintraege(data); console.log(data) })
            .catch((data) => { })

        let params_ForneEint = {
            "idForum": idForum,
            "idForeneintrag": idForeneintrag,
            "idKategorie": null
        }
        getForeneintraegeById(params_ForneEint)
            .then((data) => { setakForenbeitrag(data); console.log(data) })
            .catch((data) => { })

        const interval = setInterval(() => {
            let params_Beitrag = {
                "idBeitrag": null,
                "idForum": idForum,
                "idForeneintrag": idForeneintrag,
                "ersteller": null
            }
            getBeitraege(params_Beitrag)
                .then((data) => { setEintraege(data); console.log(data) })
                .catch((data) => { })

            let params_ForneEint = {
                "idForum": idForum,
                "idForeneintrag": idForeneintrag,
                "idKategorie": null
            }
            getForeneintraegeById(params_ForneEint)
                .then((data) => { setakForenbeitrag(data); console.log(data) })
                .catch((data) => { })
        }, 10000)
        return () => clearInterval(interval)
    }), [idForum, idForeneintrag])

    return <div className={styles.dummyDiv}>
        <div> DHBW-Heidenheim -> Wirtschaftsinformatik -> B -> Webprogramierung -> Props</div>
        <br />
        <br />
        <br />
        <h1>{akForenbeitrag ? akForenbeitrag[0].name : null}</h1>
        <div className={styles.content}>
            {eintraege
                ? eintraege.map(eintrag =>
                    <div className={styles.content} key={eintrag.idBeitrag}>
                        <hr />
                        {eintrag.name} -#-  {eintrag.ersteller} -#- {eintrag.createdAt}   -#- {eintrag.inhalt}
                        <hr />
                    </div>
                )
                : console.log(eintraege)
            }
        </div>
        <TextField
            id="outlined-disabled"
            label="Beschreibung"
            onChange={handleChangeinitNeuerBeitrag}
        />

        <Button variant="contained" onClick={createBeitrag}>Erstellen</Button>
    </div>
}
