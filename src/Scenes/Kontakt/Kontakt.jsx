import React, { useEffect, useState } from "react"
import styles from "./Kontakt.module.css"

export default function Kontakt() {
    let { idForum } = useParams()
    idForum = idForum || 1

    return (
        <div className="defaultPageContainer">
            Kontakt
        </div>
    )
}
