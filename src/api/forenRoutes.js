import { getReq, postReq } from "../controller/rest"

//Create
function postForen(data) {
    return postReq("/foren", data)
}

//Get
function getForenById(queryParams) {
    return getReq("/foren", null, { params: queryParams })
}

//Delete
function deleteForenById(forenId) {
    return postReq("/foren/" + forenId, null, { method: "delete" })
}

export { postForen, getForenById, deleteForenById }