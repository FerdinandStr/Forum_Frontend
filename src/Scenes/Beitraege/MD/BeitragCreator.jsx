import React, { useState } from "react"
import MdEditor from "react-markdown-editor-lite"
import "react-markdown-editor-lite/lib/index.css"
import "./MdEditorStyle.css"
import { Button } from "@mui/material"
import { postBeitraege } from "../../../api/beitragRoutes"

//!!! for style changes look in globalStyles.css !!!//

export default function BeitragCreator({ idForum, idForeneintrag, parseMdToHtml, forceUpdateBeitraege }) {
    const [mdText, setMdText] = useState("")

    //TODO make component generic
    async function createBeitrag() {
        try {
            await postBeitraege({ idForum: parseInt(idForum), idForeneintrag: parseInt(idForeneintrag), inhalt: mdText })
            setMdText("")
            forceUpdateBeitraege()
        } catch (e) {
            console.log("ERR", e)
        }
    }

    return (
        <div className="forum-md-editor">
            <MdEditor
                id={"MdEditor"}
                style={{ minHeight: "300px" }}
                value={mdText}
                renderHTML={(text) => parseMdToHtml(text)}
                onChange={(e) => setMdText(e.text)}
            />
            <Button variant="contained" onClick={createBeitrag}>
                Beitrag senden
            </Button>
        </div>
    )
}
