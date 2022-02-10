import React from "react"
import styles from "./Beitrag.module.css"

export default function Beitrag({ beitragData }) {
    const { idBeitrag, inhalt, createdAt, ersteller } = beitragData

    console.log("Ersteller", ersteller)

    return (
        <div className={styles.BeitragDiv}>
            <div>
                <Ersteller ersteller={ersteller} />
            </div>
            <div className={styles.BeitragContentArea}>
                <div className={styles.BeitragHeader}>
                    <div>{createdAt}</div>
                    <div>{"# " + idBeitrag}</div>
                </div>
                <div>{inhalt}</div>
                <div></div>
            </div>
        </div>
    )
}

function Ersteller({ ersteller }) {
    const { idErsteller, erstellerName, studiengangKuerzel, studiengangName } = ersteller
    return (
        <div className={styles.ErstellerDiv}>
            <div>Picture</div>
            <div>
                {/* //TODO remove id later */}
                <p title={idErsteller}>{erstellerName}</p>
                <p title={studiengangName}>{studiengangKuerzel}</p>
            </div>
        </div>
    )
}
