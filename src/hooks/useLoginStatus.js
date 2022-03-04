import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { postReq } from "../controller/rest"

function useLoginStatus(username, idbenutzer) {
    const navigate = useNavigate()
    const [loginUser, setLoginUser] = useState({ username, idbenutzer })

    function checkLogin(openLogin, loginOverwrite) {
        if (loginOverwrite) {
            setLoginUser(loginOverwrite)
        } else {
            postReq("/benutzer/checkLogin")
                .then((data) => {
                    console.log("info", data)
                    setLoginUser({ idbenutzer: data.id })
                })
                .catch((e) => {
                    console.log("ERROR", e)
                    setLoginUser(null)
                    openLogin ? navigate("../login", { replace: true }) : null
                })
        }
    }

    useEffect(() => {
        checkLogin()
    }, [idbenutzer])

    return [loginUser, checkLogin]
}

export default useLoginStatus
