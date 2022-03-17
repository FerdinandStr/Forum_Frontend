import { Alert, Button, FormControlLabel, FormGroup, Switch, TextField } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { userLogin, userRegister } from "../../api/authRoutes"
import styles from "./LoginScene.module.css"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"

import { getStudiengangByQuery } from "../../api/studiengangRoutes"

import Checkbox from "@mui/material/Checkbox"
import { Link } from "react-router-dom"
import { AlertContext } from "../../helper/AlertContext"

export default function LoginScene(props) {
    const { useLogin } = props
    const [isLoggedIn, checkLogin] = useLogin
    const navigate = useNavigate()
    const { sendAlert } = useContext(AlertContext)

    const [studiengaenge, setStudiengaenge] = useState([{ idStudiengang: 0, name: "Keine Studiengang", kuerzel: "KSTG" }])
    const [selectedStudiengang, setSelectedStudiengang] = useState(0)

    const [user, setUser] = useState({
        idStudiengang: null,
        vorname: "",
        nachname: "",
        email: "",
        passwort: "",
        passwortConfirm: "",
        checkAgb: false,
    })
    const { vorname, nachname, email, passwort, passwortConfirm, checkAgb } = user

    function updateUser(updateObj) {
        setUser((prevUser) => ({ ...prevUser, ...updateObj }))
    }

    const [registerChecked, setRegisterChecked] = useState(false)

    const [error, setError] = useState()

    function tryLogin() {
        userLogin(email, passwort)
            .then((data) => {
                checkLogin(false, { idBenutzer: data.idBenutzer })
                navigate("/")
            })
            .catch((e) => {
                if (e.messages) {
                    setError(e.messages[0])
                } else {
                    setError(e.error)
                }
            })
    }

    function tryRegister() {
        if (passwort !== passwortConfirm) {
            setError("Passwörter stimmen nicht überein")
            return
        }
        if (!checkAgb) {
            setError("AGBs müssen akzeptiert werden")
            return
        }
        const idStudiengang = selectedStudiengang == 0 ? null : selectedStudiengang

        userRegister({ idStudiengang, vorname, nachname, passwort, email })
            .then((data) => {
                checkLogin(false, { idBenutzer: data.idBenutzer })
                navigate("/")
            })
            .catch((e) => {
                if (e.messages) {
                    setError(e.messages[0])
                } else {
                    setError(e.error)
                }
            })
    }

    function handleEnterPressLogin(e) {
        if (e.key === "Enter") {
            tryLogin()
        }
    }

    const handleChangeSelectedStudiengang = async (e) => {
        setSelectedStudiengang(e.target.value)
        console.log(studiengaenge)
    }

    useEffect(() => {
        getStudiengangByQuery()
            .then((data) => {
                console.log(data)
                setStudiengaenge([...studiengaenge, ...data])
            })
            .catch((e) => {
                sendAlert(e.error, "error")
            })
    }, [])

    const loginComponents = (
        <>
            <div>
                <TextField
                    id="email"
                    label="E-Mail"
                    variant="outlined"
                    value={email}
                    onChange={(e) => updateUser({ email: e.target.value })}
                    onKeyPress={handleEnterPressLogin}
                />
            </div>
            {/* <div>
                <TextField
                    id="login"
                    label="Username or E-Mail"
                    variant="outlined"
                    value={login}
                    onChange={(e) => updateUser({ login: e.target.value })}
                    onKeyPress={handleEnterPressLogin}
                />
            </div> */}
            <div>
                <TextField
                    id="passwort"
                    label="Passwort"
                    variant="outlined"
                    type="password"
                    value={passwort}
                    onChange={(e) => updateUser({ passwort: e.target.value })}
                    onKeyPress={handleEnterPressLogin}
                />
            </div>
            <Button variant="contained" onClick={tryLogin}>
                Login
            </Button>
        </>
    )

    const registerComponents = (
        <>
            <div>
                <TextField id="email" label="E-Mail" variant="outlined" value={email} onChange={(e) => updateUser({ email: e.target.value })} />
            </div>
            <div>
                <TextField
                    id="vorname"
                    label="Vorname"
                    variant="outlined"
                    value={vorname}
                    onChange={(e) => updateUser({ vorname: e.target.value })}
                />
            </div>
            <div>
                <TextField
                    id="nachname"
                    label="Nachname"
                    variant="outlined"
                    value={nachname}
                    onChange={(e) => updateUser({ nachname: e.target.value })}
                />
            </div>
            <div>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedStudiengang}
                    label="Studiengang"
                    onChange={handleChangeSelectedStudiengang}
                    className={styles.Textfield}
                >
                    {studiengaenge
                        ? studiengaenge.map((studg) => {
                            return (
                                <MenuItem key={studg.idStudiengang} value={studg.idStudiengang}>
                                    {studg.name} ({studg.kuerzel})
                                </MenuItem>
                            )
                        })
                        : null}
                </Select>
            </div>
            <div>
                <TextField
                    id="passwort"
                    label="Passwort"
                    variant="outlined"
                    type="password"
                    value={passwort}
                    onChange={(e) => updateUser({ passwort: e.target.value })}
                />
            </div>
            <div>
                <TextField
                    id="passwortConfirm"
                    label="Passwort wiederholen"
                    variant="outlined"
                    type="password"
                    value={passwortConfirm}
                    onChange={(e) => updateUser({ passwortConfirm: e.target.value })}
                />
            </div>
            <div>
                <Checkbox
                    value={checkAgb}
                    onChange={(e, check) => {
                        updateUser({ checkAgb: check })
                    }}
                />
                <span>
                    Ich habe die <Link to="/agb">AGB</Link>s gelesen
                </span>
            </div>
            <Button variant="contained" onClick={tryRegister}>
                Registrieren
            </Button>
        </>
    )

    return (
        <div className={styles.centerLogin}>
            <div className={styles.LoginCard}>
                {error ? <Alert severity="error">{error}</Alert> : null}

                {registerChecked ? registerComponents : loginComponents}

                <div>
                    <p>Noch kein Account vorhanden?</p>
                </div>
                <div className={styles.RegisterSliderDiv}>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={registerChecked}
                                    onChange={(e) => {
                                        setRegisterChecked(e.target.checked)
                                        setError("")
                                    }}
                                />
                            }
                            label="Registrieren"
                        />
                    </FormGroup>
                </div>
            </div>
        </div>
    )
}
