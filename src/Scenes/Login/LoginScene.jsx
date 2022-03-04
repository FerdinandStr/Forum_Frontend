import { Alert, Button, FormControlLabel, FormGroup, Switch, TextField } from "@mui/material"
import React, { useState } from "react"
import { useNavigate } from "react-router"
import { userLogin, userRegister } from "../../api/authRoutes"
import styles from "./LoginScene.module.css"

import Checkbox from "@mui/material/Checkbox"
import { Link } from "react-router-dom"

export default function LoginScene(props) {
    const { useLogin } = props
    const [isLoggedIn, checkLogin] = useLogin
    const navigate = useNavigate()

    const [user, setUser] = useState({
        idStudiengang: null,
        vorname: "",
        nachname: "",
        email: "",
        password: "",
        passwordConfirm: "",
        checkAgb: false
    })
    const { idStudiengang, vorname, nachname, email, password, passwordConfirm, checkAgb } = user
    function updateUser(updateObj) {
        setUser((prevUser) => ({ ...prevUser, ...updateObj }))
    }

    const [registerChecked, setRegisterChecked] = useState(false)

    const [error, setError] = useState()

    function tryLogin() {
        userLogin(email, password)
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
        if (password === passwordConfirm) {
            userRegister({ idStudiengang, vorname, nachname, password, email })
                .then((data) => {
                    console.log("REGISTERED", data)
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
        } else {
            setError("Passwörter stimmen nicht überein")
        }
    }

    function handleEnterPressLogin(e) {
        if (e.key === "Enter") {
            tryLogin()
        }
    }

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
                    id="password"
                    label="Passwort"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => updateUser({ password: e.target.value })}
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
                <TextField
                    id="password"
                    label="Passwort"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => updateUser({ password: e.target.value })}
                />
            </div>
            <div>
                <TextField
                    id="passwordConfirm"
                    label="Passwort wiederhohlen"
                    variant="outlined"
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => updateUser({ passwordConfirm: e.target.value })}
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
                Register
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
