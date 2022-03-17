import { Button } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"
import { userLogout } from "../../api/authRoutes"
import styles from "./style.module.css"
import { useNavigate } from "react-router"

function Header(props) {
    const { useLogin } = props
    const navigate = useNavigate()
    const [loginUser, checkLogin] = useLogin

    function logout() {
        userLogout()
            .finally(() => {
                checkLogin()
            })
            .then(navigate("/foren/"))
    }

    //load UserInfo on Login here to show name/email....

    return (
        <div className={styles.HeaderDiv}>
            <div>
                <Link to={"/foren/"}>
                    <img className={styles.Logo} src="/img/StudiForum_V3_transparent.svg" />
                </Link>
            </div>
            {loginUser ? (
                <div className={styles.LoginButton}>
                    <Link to={"/profil"}>
                        <Button variant="contained">Profil</Button>
                    </Link>
                    <Button variant="contained" onClick={logout}>
                        Logout
                    </Button>
                </div>
            ) : (
                <div className={styles.LoginButton}>
                    <Link to="/login">
                        <Button variant="contained">Login</Button>
                    </Link>
                </div>
            )}
        </div>
    )
}
export default Header
