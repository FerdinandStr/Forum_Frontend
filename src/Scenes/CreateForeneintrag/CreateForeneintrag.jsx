import React, { useEffect, useState } from "react"
import styles from "./CreateForeneintrag.module.css"
import { postForeneintraege } from "../../api/foreneintragRoutes"
import { getKategorie } from "../../api/kategorieRoutes"
import { postBeitraege } from "../../api/beitragRoutes"
import { useParams, Link } from "react-router-dom"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"

import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
// Achtung !!!! ParentID Muss Numeric sein + Name muss min. 5 Zeichen lang sein
// TODO !!!!!!

//https://mui.com/components/selects/

export default function CreateForeneintrag() {
    /*-------------------------Weiter zum Komentarbereich----------------------------- */
    const history = useHistory()
    const routeChange = () => {
        let path = "/home"
        history.push(path)
    }
    /*-------------------------Weiter zum Komentarbereich----------------------------- */

    let { idForum } = useParams()

    const [name, setName] = useState()
    const [kategories, setKategories] = useState()
    const [selectedKategorie, setSelectedKategorie] = useState({ id_kategorie: null, name: "" })

    const [initBeitrag, setInitBeitrag] = useState()

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeinitBeitrag = (e) => {
        setInitBeitrag(e.target.value)
    }

    const handleChangeSelectedKategorie = async (e) => {
        console.log(e.target.value)
        setSelectedKategorie(e.target.value)
    }

    const createForeneintrag = (e) => {
        let paresedId = parseInt(idForum)
        if (!isNaN(paresedId) || name || initBeitrag) {
            let data_forum = {
                idForum: paresedId,
                name: name,
                idKategorie: selectedKategorie.id_kategorie,
            }
            postForeneintraege(data_forum).then((res) => {
                let data_beitrag = {
                    idForum: paresedId,
                    idForeneintrag: res.idForeneintrag,
                    inhalt: initBeitrag,
                }
                postBeitraege(data_beitrag)
            })
        }
    }

    useEffect(() => {
        getKategorie([]).then((data) => {
            console.log(data)
            setKategories(data)
        })
    }, [idForum])

    return (
        <div>
            <div> Foreneintrag erstellen</div>

            <TextField id="outlined-disabled" label="Name" onChange={handleChangeName} />

            <InputLabel id="demo-simple-select-label">Kategorie</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedKategorie}
                label="Age"
                onChange={handleChangeSelectedKategorie}
            >
                {kategories
                    ? kategories.map((kat) => {
                          return (
                              <MenuItem key={kat.idKategorie} value={kat}>
                                  {kat.name}
                              </MenuItem>
                          )
                      })
                    : null}
            </Select>

            <TextField id="outlined-disabled" label="Beschreibung" onChange={handleChangeinitBeitrag} />

            <Button variant="contained" onClick={createForeneintrag}>
                Erstellen
            </Button>
            <Button variant="outlined">Abbrechen</Button>
        </div>
    )
}
