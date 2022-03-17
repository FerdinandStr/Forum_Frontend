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

                    const idStudiengang = user.idStudiengang || 0
                    return getStudiengangByQuery({ idStudiengang })
                        .then((data) => {
                            const studiengang = data[0]
                            setUser({ ...user, studiengangName: studiengang.name, kuerzel: studiengang.kuerzel })
                        })
                        .catch(() => null)
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
                <table>
                    <tr className={styles.row}>
                        <td className={styles.rowElement}>Vorname: </td>
                        <td className={styles.rowElementData}>{user.vorname}</td>
                    </tr>
                    <tr className={styles.row}>
                        <td className={styles.rowElement}>Nachname: </td>
                        <td className={styles.rowElementData}>{user.nachname}</td>
                    </tr>
                    <tr className={styles.row}>
                        <td className={styles.rowElement}>Mail: </td>
                        <td className={styles.rowElementData}>{user.email}</td>
                    </tr>
                    <tr className={styles.row}>
                        <td className={styles.rowElement}>Studiengang: </td>
                        <td className={styles.rowElementData}>{user.studiengangName}</td>
                    </tr>
                    <tr className={styles.row}>
                        <td className={styles.rowElement}>Kürzel: </td>
                        <td className={styles.rowElementData}>{user.kuerzel}</td>
                    </tr>
                </table>
            ) : null}
            <div className={styles.ButtonStyle}>
                <Button variant="contained" onClick={deleteUser}>
                    Profil löschen
                </Button>
            </div>
        </div>
    )
}
