import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { postReq } from "../controller/rest"

function useLoginStatus(username, idBenutzer) {
    const navigate = useNavigate()
    const [loginUser, setLoginUser] = useState({ username, idBenutzer })

    function checkLogin(openLogin, loginOverwrite) {
        if (loginOverwrite) {
            setLoginUser(loginOverwrite)
        } else {
            postReq("/benutzer/checkLogin")
                .then((data) => {
                    setLoginUser({ idBenutzer: data.id })
                })
                .catch((e) => {
                    setLoginUser(null)
                    openLogin ? navigate("../login", { replace: true }) : null
                })
        }
    }

    useEffect(() => {
        checkLogin()
    }, [idBenutzer])

    return [loginUser, checkLogin]
}

export default useLoginStatus
