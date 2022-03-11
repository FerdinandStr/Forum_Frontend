import { getReq, postReq } from "../controller/rest"

//Create
function postForen(data) {
    return postReq("/foren", data)
}

//Get
function getForenById(queryParams) {
    return getReq("/foren", queryParams)
}

//Get
function getSubforen(idForum, limit, offset) {
    return getReq("/foren/" + idForum + "/unterforen", { limit, offset })
}

function getForeneintraegeInForum(idForum, limit, offset) {
    return getReq("/foren/" + idForum + "/foreneintraege", { limit, offset })
}

function countForeneintraegeInForum(idForum) {
    return getReq("/foren/" + idForum + "/foreneintraege/count")
}

//Get
function getParentPath(idForum) {
    return getReq("/foren/" + idForum + "/forumParents")
}

function countSubforen(idForum) {
    return getReq("/foren/" + idForum + "/unterforen/count")
}

//Delete
function deleteForenById(idForum) {
    return postReq("/foren/" + idForum, null, { method: "delete" })
}

export { postForen, getForenById, getSubforen, deleteForenById, getParentPath, getForeneintraegeInForum, countSubforen, countForeneintraegeInForum }
