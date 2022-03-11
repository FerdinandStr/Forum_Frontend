import React, { useEffect, useState } from "react"
import styles from "./CreateForeneintrag.module.css"
import { postForeneintraege } from "../../api/foreneintragRoutes"
import { getKategorie } from "../../api/kategorieRoutes"
import { postBeitraege } from "../../api/beitragRoutes"
import { useParams, Link } from "react-router-dom"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import { useNavigate } from "react-router"

import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"

import parseMdToHtml from "../../helper/parseMdToHtml"
import MdEditor from "react-markdown-editor-lite"
// Achtung !!!! ParentID Muss Numeric sein + Name muss min. 5 Zeichen lang sein
// TODO !!!!!!

//https://mui.com/components/selects/

export default function CreateForeneintrag() {
    /*-------------------------Weiter zum Komentarbereich----------------------------- */
    const navigate = useNavigate()
    /*-------------------------Weiter zum Komentarbereich----------------------------- */

    let { idForum } = useParams()

    const [name, setName] = useState()
    const [kategories, setKategories] = useState()
    const [selectedKategorie, setSelectedKategorie] = useState({ id_kategorie: null, name: "" })
    const [mdText, setMdText] = useState("")

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
                beitragInhalt: mdText,
            }
            postForeneintraege(data_forum).then((res) => {
                let data_beitrag = {
                    idForum: paresedId,
                    idForeneintrag: res.idForeneintrag,
                    inhalt: initBeitrag,
                }
                postBeitraege(data_beitrag).then((data) => {
                    navigate("/foren/" + idForum + "/foreneintraege/" + data.idBeitrag)
                })
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
        <div className={styles.CFContainer}>
            <div className={styles.CFElement}> Foreneintrag erstellen</div>
            <div className={styles.CFElement}>
                <TextField id="outlined-disabled" label="Name" onChange={handleChangeName} />
            </div>
            <div className={styles.ElementCF}>
                <InputLabel id="demo-simple-select-label">Kategorie</InputLabel>
            </div>
            <div className={styles.CFElement}>
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
            </div>
            <div className={styles.CFElement}>
                <TextField id="outlined-disabled" label="Beschreibung" onChange={handleChangeinitBeitrag} />
            </div>

            <div className="forum-md-editor">
                <MdEditor
                    id={"MdEditor"}
                    style={{ minHeight: "300px" }}
                    value={mdText}
                    renderHTML={(text) => parseMdToHtml(text)}
                    onChange={(e) => setMdText(e.text)}
                />
            </div>

            <div className={styles.defaultPageContainerButtons}>
                <Button variant="contained" onClick={createForeneintrag}>
                    Erstellen
                </Button>
                <Link to={`/foren/${idForum}`}>
                    <Button variant="outlined">Abbrechen</Button>
                </Link>
            </div>
        </div>
    )
}
