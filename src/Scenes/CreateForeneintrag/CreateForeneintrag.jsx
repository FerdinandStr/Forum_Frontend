import React, { useEffect, useState } from "react"
import styles from "./CreateForeneintrag.module.css"
import { postForeneintraege } from "../../api/foreneintragRoutes"
import { getKategorie } from "../../api/kategorieRoutes"
import { postBeitraege } from "../../api/beitragRoutes"
import { getForenById } from "../../api/forenRoutes"
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

    const { idForum } = useParams()

    const [name, setName] = useState()
    const [kategories, setKategories] = useState([{ idKategorie: 0, name: "Keine Kategorie" }])
    const [selectedKategorie, setSelectedKategorie] = useState(0)
    const [mdText, setMdText] = useState("")
    const [parentforumInfo, setParentforumInfo] = useState()

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeSelectedKategorie = async (e) => {
        setSelectedKategorie(e.target.value)
    }

    const createForeneintrag = () => {
        let paresedId = parseInt(idForum)
        if (!isNaN(paresedId) || name || mdText) {
            const kat = selectedKategorie == 0 ? null : selectedKategorie

            const data_forum = {
                idForum: paresedId,
                name: name,
                idKategorie: kat,
                beitragInhalt: mdText,
            }
            postForeneintraege(data_forum)
                .then((res) => {
                    console.log("RESULT", res.idForeneintrag)
                    navigate("/foren/" + idForum + "/foreneintraege/" + res.idForeneintrag)
                })
                .catch((e) => {
                    console.log("ERROR", e)
                })
        }
    }

    useEffect(() => {
        getKategorie().then((data) => {
            setKategories([...kategories, ...data])
        })

        getForenById({ idForum: idForum }).then((data) => {
            console.log(data)
            console.log(data[0])
            setParentforumInfo(data[0].name)
        })
    }, [idForum])

    return (
        <div className={styles.CFContainer}>
            <div className={styles.CUElement}>
                <h1>Foreneintrag in {parentforumInfo}</h1>
            </div>
            <p className={styles.CFElement}> Foreneintrag erstellen</p>
            <div className={styles.CFElement}>
                <TextField id="outlined-disabled" label="Name" className={styles.Textfield} onChange={handleChangeName} />
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
                    className={styles.Textfield}
                >
                    {kategories
                        ? kategories.map((kat) => {
                              return (
                                  <MenuItem key={kat.idKategorie} value={kat.idKategorie}>
                                      {kat.name}
                                  </MenuItem>
                              )
                          })
                        : null}
                </Select>
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
                <div className={styles.ButtonStyle}>
                    <Button variant="contained" onClick={createForeneintrag}>
                        Erstellen
                    </Button>
                </div>
                <div className={styles.ButtonStyle}>
                    <Link to={`/foren/${idForum}`}>
                        <Button variant="outlined">Abbrechen</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
