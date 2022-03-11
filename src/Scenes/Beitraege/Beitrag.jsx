import React from "react"
import styles from "./Beitrag.module.css"
import { MdOutlineWatchLater } from "react-icons/md"
import Blockies from "react-blockies"

export default function Beitrag({ beitragNumber, beitragData, parseMdToHtml }) {
    const { idBeitrag, inhalt, createdAt, ersteller } = beitragData

    return (
        <div className={styles.BeitragDiv}>
            <div>
                <Ersteller ersteller={ersteller} />
            </div>
            <div className={styles.BeitragContentArea}>
                <div className={styles.BeitragHeader}>
                    <div className={styles.DateDiv}>
                        <MdOutlineWatchLater />
                        {new Date(createdAt).toLocaleString([], {
                            weekday: "long",
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                        })}
                    </div>
                    <div>{"# " + beitragNumber}</div>
                </div>
                <div className={styles.BeitragInhalt} dangerouslySetInnerHTML={{ __html: parseMdToHtml(inhalt) }} />
                <div></div>
            </div>
        </div>
    )
}

function Ersteller({ ersteller }) {
    const { idErsteller, erstellerName, studiengangKuerzel, studiengangName } = ersteller

    return (
        <div className={styles.ErstellerDiv}>
            <div>
                <Blockies seed={idErsteller + erstellerName} size={10} scale={10} className={styles.BlockieProfil} />
            </div>
            <div>
                {/* //TODO remove id later */}
                <p title={idErsteller}>{erstellerName}</p>
                <p title={studiengangName}>{studiengangKuerzel}</p>
            </div>
        </div>
    )
}
