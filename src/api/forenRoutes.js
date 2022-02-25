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
function getSubforen(idForum) {
    return getReq("/foren/" + idForum + "/unterforen", null, null)
}

function getForeneintraegeByForum(idForum, limit, offset) {
    return getReq("/foren/" + idForum + "/foreneintraege", { limit, offset })
}

//Get
function getParentPath(idForum) {
    return getReq("/foren/" + idForum + "/forumParents", null, null)
}

//Delete
function deleteForenById(idForum) {
    return postReq("/foren/" + idForum, null, { method: "delete" })
}

export { postForen, getForenById, getSubforen, deleteForenById, getParentPath, getForeneintraegeByForum }
