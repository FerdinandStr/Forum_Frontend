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
    return getReq("/foren/" + forenId + "/unterforen", null, null)
}

//Get
function getParentPath(forenId) {
    return getReq("/foren/" + forenId + "/forumParents", null, null)
}

//Delete
function deleteForenById(forenId) {
    return postReq("/foren/" + forenId, null, { method: "delete" })
}

export { postForen, getForenById, getSubforen, deleteForenById, getParentPath }