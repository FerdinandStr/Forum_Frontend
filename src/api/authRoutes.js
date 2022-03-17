import { postReq, getReq, delReq } from "../controller/rest"

function userRegister({ idStudiengang, vorname, nachname, passwort, email }) {
    return postReq("/benutzer/register", { idStudiengang, vorname, nachname, passwort: passwort, email })
}

function userLogin(email, passwort) {
    return postReq("/benutzer/login", { email, passwort: passwort })
}

function userLogout() {
    return postReq("/benutzer/logout").then().catch()
}

function getUserById(userId) {
    return getReq("/benutzer/" + userId)
}

function deactivateUserById(userId) {
    return delReq("/benutzer/" + userId)
}

export { userRegister, userLogin, userLogout, getUserById, deactivateUserById }
