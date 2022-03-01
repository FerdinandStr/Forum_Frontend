import { getReq, postReq } from "../controller/rest"

//Create
function postBeitraege(data) {
    return postReq("/beitraege", data)
}

//Get
function getBeitraege(queryParams) {
    return getReq("/beitraege", queryParams)
}

//Delete
function deleteBeitraege(katId) {
    return postReq("/beitraege/" + katId, null, { method: "delete" })
}

function countBeitraege({ idForum, idForeneintrag, ersteller }) {
    return getReq("/beitraege/count", { idForum, idForeneintrag, ersteller })
}

export { postBeitraege, getBeitraege, deleteBeitraege, countBeitraege }
