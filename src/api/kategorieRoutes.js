import { getReq, postReq } from "../controller/rest"

//Create
function postKategorie(data) {
    return postReq("/kategorien", data)
}

//Get
function getKategorie(queryParams) {
    return getReq("/kategorien", null, { params: queryParams })
}

//Delete
function deleteKategorie(katId) {
    return postReq("/kategorien/" + katnId, null, { method: "delete" })
}

export { postKategorie, getKategorie, deleteKategorie }