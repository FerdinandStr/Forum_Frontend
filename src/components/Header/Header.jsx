import { Button, TextField } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"
import { userLogout } from "../../api/authRoutes"
import styles from "./style.module.css"
import { useNavigate } from "react-router"

function Header(props) {
    const { useLogin, setSearchInput, setSideMenuOpen } = props
    const navigate = useNavigate()

    const [loginUser, checkLogin] = useLogin

    function logout() {
        userLogout().finally(() => {
            checkLogin()
        })
        navigate("/login")
    }

    return (
        <div className={styles.HeaderDiv}>
            <div>
                <img className={styles.Logo} src="/img/StudiForum_V1_transparent.svg" />
            </div>
            {loginUser ? (
                <div>
                    <p>{loginUser.username}</p>
                    <Button variant="outlined" onClick={logout}>Logout</Button>
                </div>
            ) : (
                <Link to="/login">
                    <div>Login</div>
                </Link>
            )}
        </div>
    )
}
export default Header
