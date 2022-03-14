import React, { useEffect, useState } from "react"
import styles from "./CreateUnterforum.module.css"
import { postForen } from "../../api/forenRoutes"
import { useParams, Link } from "react-router-dom"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { useNavigate } from "react-router"
import { getForenById } from "../../api/forenRoutes"
// Achtung !!!! ParentID Muss Numeric sein + Name muss min. 3 Zeichen lang sein
// TODO !!!!!!

export default function CreateUnterforum() {
    let { idForum } = useParams()

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
        postForen(data).then((data) => {
            navigate("/foren/" + data.idForum)
        })
    }

    useEffect(() => {
        getForenById({ idForum: idForum }).then((data) => {
            console.log(data)
            console.log(data[0])
            setParentforumInfo(data[0].name)
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
