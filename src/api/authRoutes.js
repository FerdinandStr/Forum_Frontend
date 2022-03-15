import { postReq } from "../controller/rest"

function userRegister({ idStudiengang, vorname, nachname, passwort, email }) {
    return postReq("/benutzer/register", { idStudiengang, vorname, nachname, passwort: passwort, email })
}

function userLogin(email, passwort) {
    console.log("login", email, passwort)
    return postReq("/benutzer/login", { email, passwort: passwort })
}

function userLogout() {
    return postReq("/benutzer/logout").then().catch()
}

export { userRegister, userLogin, userLogout }
