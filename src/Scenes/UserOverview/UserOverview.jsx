import React, { useEffect, useState, useContext } from "react"
import { Button } from "@mui/material"
import styles from "./UserOverview.module.css"
import { getUserById, deactivateUserById } from "../../api/authRoutes"
import { AlertContext } from "../../helper/AlertContext"
import { userLogout } from "../../api/authRoutes"
//import { postForen } from "../../api/forenRoutes"

import { useNavigate } from "react-router"
// Achtung !!!! ParentID Muss Numeric sein + Name muss min. 3 Zeichen lang sein
// TODO !!!!!!

export default function UserOverview(props) {
    const { useLogin } = props
    const [loginUser, checkLogin] = useLogin
    const { sendAlert } = useContext(AlertContext)

    const navigate = useNavigate()

    const [user, setUser] = useState()

    const deleteUser = (e) => {
        deactivateUserById(loginUser.idbenutzer)
            .then(() => {
                userLogout()
                    .finally(() => {
                        checkLogin()
                    })
                    .then(navigate("/foren/"))
            })
            .catch((e) => {
                sendAlert(e.error, "error")
            })
    }

    // navigate("/login")

    useEffect(() => {
        if (loginUser.idbenutzer) {
            console.log(loginUser.idbenutzer)
            getUserById(loginUser.idbenutzer)
                .then((data) => {
                    setUser(data)
                })
                .catch((e) => {
                    sendAlert(e.error, "error")
                    //navigate("/forum")
                })
        }
    }, [loginUser])

    return (
        <div className={styles.CUContainer}>
            <h1>Profil</h1>
            {user ? (
                <div>
                    <p className={styles.row}>
                        <span className={styles.rowElement}>Vorname: </span>
                        <span className={styles.rowElement}>{user.vorname}</span>
                    </p>
                    <p className={styles.row}>
                        <span className={styles.rowElement}>Nachname: </span>
                        <span className={styles.rowElement}>{user.nachname}</span>
                    </p>
                    <p className={styles.row}>
                        <span className={styles.rowElement}>Mail: </span>
                        <span className={styles.rowElement}>{user.email}</span>
                    </p>
                </div>
            ) : null}
            <Button variant="contained" onClick={deleteUser}>
                Profil löschen
            </Button>
        </div>
    )
}
