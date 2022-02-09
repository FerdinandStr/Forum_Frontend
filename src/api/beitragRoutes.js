import { getReq, postReq } from "../controller/rest"

//Create
function postBeitraege(data) {
    return postReq("/beitraege", data)
}

//Get
function getBeitraege(queryParams) {
    return getReq("/beitraege", null, { params: queryParams })
}

//Delete
function deleteBeitraege(katId) {
    return postReq("/beitraege/" + katnId, null, { method: "delete" })
}

export { postBeitraege, getBeitraege, deleteBeitraege }