import { postReq } from "../controller/rest"

function userRegister(username, email, password, passwordConfirm) {
    return postReq("/benutzer/register", { username, email, password, passwordConfirm })
}

function userLogin(email, password) {
    return postReq("/benutzer/login", { email, password })
}

function userLogout() {
    return postReq("/benutzer/logout").then().catch()
}

export { userRegister, userLogin, userLogout }
