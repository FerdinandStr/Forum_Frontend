import React from "react"
import { useParams } from "react-router-dom"

import Subforum from "./Components/Subforum"
import Foreneintraege from "./Components/Foreneintraege"
import DrillDownPath from "../../components/DrillDownPath/DrillDownPath"

export default function Forum() {
    let { idForum } = useParams()
    idForum = idForum || 1

    return (
        <div className="defaultPageContainer">
            <DrillDownPath forumData={idForum} />
            <Subforum forumData={idForum} />
            <Foreneintraege idForum={idForum} />
        </div>
    )
}
