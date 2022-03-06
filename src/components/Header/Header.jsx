import { Button } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"
import { userLogout } from "../../api/authRoutes"
import styles from "./style.module.css"

function Header(props) {
    const { useLogin } = props

    const [loginUser, checkLogin] = useLogin

    function logout() {
        userLogout().finally(() => {
            checkLogin()
        })
        // navigate("/login")
    }

    //load UserInfo on Login here to show name/email....

    return (
        <div className={styles.HeaderDiv}>
            <div>
                <Link to={"/foren/"}>
                    <img className={styles.Logo} src="/img/StudiForum_V1_transparent.svg" />
                </Link>
            </div>
            {loginUser ? (
                <div>
                    <span>{loginUser.idBenutzer}</span>
                    <Button variant="contained" onClick={logout}>
                        Logout
                    </Button>
                </div>
            ) : (
                <Link to="/login">
                    <Button variant="contained">Login</Button>
                </Link>
            )}
        </div>
    )
}
export default Header
