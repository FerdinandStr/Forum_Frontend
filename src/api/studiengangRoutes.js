import { getReq } from "../controller/rest"

export function getStudiengangByQuery(queryParams) {
    return getReq("/studiengaenge", queryParams)
}
