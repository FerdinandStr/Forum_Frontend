import React, { useEffect, useState, useContext } from "react"
import styles from "./CreateUnterforum.module.css"
import { postForen } from "../../api/forenRoutes"
import { useParams, Link } from "react-router-dom"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { useNavigate } from "react-router"
import { getForenById } from "../../api/forenRoutes"
import { AlertContext } from "../../helper/AlertContext"
// Achtung !!!! ParentID Muss Numeric sein + Name muss min. 3 Zeichen lang sein
// TODO !!!!!!

export default function CreateUnterforum() {
    let { idForum } = useParams()
    const { sendAlert } = useContext(AlertContext)

    const navigate = useNavigate()

    const [name, setName] = useState()
    const [parentforumInfo, setParentforumInfo] = useState()

    const handleChangeName = (e) => {
        setName(e.target.value)
    }
    const createForum = (e) => {
        let paresedId = parseInt(idForum)

        let data = {
            name: name,
            idParentForum: paresedId,
        }
        postForen(data)
            .then((data) => {
                navigate("/foren/" + data.idForum)
            })
            .catch((e) => {
                sendAlert(e.error, "error")
            })
    }

    useEffect(() => {
        getForenById({ idForum: idForum })
            .then((data) => {
                setParentforumInfo(data[0].name)
            })
            .catch((e) => {
                sendAlert(e.error, "error")
            })
    }, [idForum])

    return (
        <div className={styles.CUContainer}>
            <div className={styles.CUElement}>
                <h1>Unterforum in {parentforumInfo}</h1>
            </div>
            <p className={styles.CUElement}> Forum erstellen</p>
            <div className={styles.CUElement}>
                <TextField id="outlined-disabled" label="Name" onChange={handleChangeName} />
            </div>

            <div className={styles.defaultCUButtons}>
                <div className={styles.ButtonStyle}>
                    <Button variant="contained" onClick={createForum}>
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
