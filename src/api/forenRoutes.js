import { getReq, postReq } from "../controller/rest"

//Create
function postForen(data) {
    return postReq("/foren", data)
}

//Get
function getForenById(queryParams) {
    return getReq("/foren", null, { params: queryParams })
}

//Get
function getSubforen(forenId) {
    console.log(forenId)
    return getReq("/foren/" + forenId + "/unterforen", null, null)
}

//Delete
function deleteForenById(forenId) {
    return postReq("/foren/" + forenId, null, { method: "delete" })
}

export { postForen, getForenById, getSubforen, deleteForenById }