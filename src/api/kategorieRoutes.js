import { getReq, postReq } from "../controller/rest"

//Create
function postKategorie(data) {
    return postReq("/kategorien", data)
}

//Get
function getKategorie(queryParams) {
    return getReq("/kategorien", queryParams)
}

//Delete
function deleteKategorie(katId) {
    return postReq("/kategorien/" + katId, null, { method: "delete" })
}

export { postKategorie, getKategorie, deleteKategorie }
