import React, { useEffect, useState, useContext } from "react"
import { Button } from "@mui/material"
import styles from "./UserOverview.module.css"
import { getUserById, deactivateUserById } from "../../api/authRoutes"
import { AlertContext } from "../../helper/AlertContext"
import { userLogout } from "../../api/authRoutes"

import { useNavigate } from "react-router"
import { getStudiengangByQuery } from "../../api/studiengangRoutes"

export default function UserOverview(props) {
    const { useLogin } = props
    const [loginUser, checkLogin] = useLogin
    const { sendAlert } = useContext(AlertContext)
    const navigate = useNavigate()

    const [user, setUser] = useState()
    useEffect(() => {
        //load User data
        if (loginUser.idBenutzer) {
            getUserById(loginUser.idBenutzer)
                .then((user) => {
                    setUser(user)
                    return getStudiengangByQuery(user.idStudiengang).then((data) => {
                        const studiengang = data[0]
                        setUser({ ...user, studiengangName: studiengang.name, kuerzel: studiengang.kuerzel })
                    })
                })
                .catch((e) => {
                    sendAlert(e.error, "error")
                })
        }
    }, [loginUser])

    function deleteUser() {
        deactivateUserById(loginUser.idBenutzer)
            .then(() => {
                userLogout().finally(() => {
                    checkLogin()
                    navigate("/foren")
                })
            })
            .catch((e) => {
                sendAlert(e.error, "error")
            })
    }

    return (
        <div className={styles.CUContainer}>
            <h1>Profil</h1>
            {user ? (
                <div>
                    <p className={styles.row}>
                        <span className={styles.rowElement}>Vorname: </span>
                        <span className={styles.rowElementData}>{user.vorname}</span>
                    </p>
                    <p className={styles.row}>
                        <span className={styles.rowElement}>Nachname: </span>
                        <span className={styles.rowElementData}>{user.nachname}</span>
                    </p>
                    <p className={styles.row}>
                        <span className={styles.rowElement}>Mail: </span>
                        <span className={styles.rowElementData}>{user.email}</span>
                    </p>
                    <p className={styles.row}>
                        <span className={styles.rowElement}>Studiengang: </span>
                        <span className={styles.rowElementData}>{user.studiengangName}</span>
                    </p>
                    <p className={styles.row}>
                        <span className={styles.rowElement}>Kürzel: </span>
                        <span className={styles.rowElementData}>{user.kuerzel}</span>
                    </p>
                </div>
            ) : null}
            <div className={styles.ButtonStyle}>
                <Button variant="contained" onClick={deleteUser}>
                    Profil löschen
                </Button>
            </div>
        </div>
    )
}
