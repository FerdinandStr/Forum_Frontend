import { getReq, postReq } from "../controller/rest"

function postItem(data) {
    return postReq("/items", data)
}

function getItems(queryParams) {
    return getReq("/items", null, { params: queryParams })
}

function getItemById(itemId) {
    return getReq("/items/" + itemId)
}
export { postItem, getItems, getItemById }
