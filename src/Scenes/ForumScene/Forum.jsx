import React, { useEffect, useState } from "react"
import styles from "./ForumScene.module.css"
import GenericFoldingContainer from "./Components/FoldingContainer/GenericFoldingContainer.jsx"
import { getForeneintraegeById } from "../../api/foreneintragRoutes"
import { getForenById } from "../../api/forenRoutes"
import { useParams, Link } from "react-router-dom"

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
