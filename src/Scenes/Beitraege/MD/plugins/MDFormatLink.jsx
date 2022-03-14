import * as React from "react"
import { PluginComponent } from "react-markdown-editor-lite"

export default class MDFormatLink extends PluginComponent {
    static pluginName = "MDFormatLink"
    static align = "left"

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <a className="button button-type-counter" title="Markdown" href="https://commonmark.org/help/" target="_blank" rel="noopener noreferrer">
                {"Formatierung mit Markdown"}
            </a>
        )
    }
}
