import { getReq, postReq } from "../controller/rest"

//Create
function postForeneintraege(data) {
    return postReq("/foreneintraege", data)
}

//Get
function getForeneintraegeById(queryParams) {
    return getReq("/foreneintraege", null, { params: queryParams })
}

function getBeitraegeForForeneintrag(idForeneintrag) {
    return getReq("/foreneintraege/" + idForeneintrag + "/beitraege")
}

//Delete
function deleteForeneintraegeById(forenId) {
    return postReq("/foreneintraege/" + forenId, null, { method: "delete" })
}

export { postForeneintraege, getBeitraegeForForeneintrag, getForeneintraegeById, deleteForeneintraegeById }
