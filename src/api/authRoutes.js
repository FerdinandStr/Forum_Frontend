import { postReq } from "../controller/rest"

function userRegister({ idStudiengang, vorname, nachname, password, email }) {
    return postReq("/benutzer/register", { idStudiengang, vorname, nachname, password: password, email })
}

function userLogin(email, password) {
    console.log("login", email, password)
    return postReq("/benutzer/login", { email, password: password })
}

function userLogout() {
    return postReq("/benutzer/logout").then().catch()
}

export { userRegister, userLogin, userLogout }
