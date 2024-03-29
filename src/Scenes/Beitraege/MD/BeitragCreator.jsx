import React, { useState, useContext } from "react"
import MdEditor from "react-markdown-editor-lite"
import "react-markdown-editor-lite/lib/index.css"
import "./MdEditorStyle.css"
import { Button } from "@mui/material"
import { postBeitraege } from "../../../api/beitragRoutes"
import MdFormatLink from "./plugins/MDFormatLink"
import { AlertContext } from "../../../helper/AlertContext"
MdEditor.use(MdFormatLink)

export default function BeitragCreator({ idForum, idForeneintrag, parseMdToHtml, forceUpdateBeitraege }) {
    const [mdText, setMdText] = useState("")
    const { sendAlert } = useContext(AlertContext)

    //TODO make component generic
    async function createBeitrag() {
        try {
            await postBeitraege({ idForum: parseInt(idForum), idForeneintrag: parseInt(idForeneintrag), inhalt: mdText })
            setMdText("")
            forceUpdateBeitraege()
        } catch (e) {
            console.log("ERR", e)
            sendAlert(e.error, "error")
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
