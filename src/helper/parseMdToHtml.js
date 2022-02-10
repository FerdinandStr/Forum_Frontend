import DOMPurify from "dompurify"
import MarkdownIt from "markdown-it"
const mdParser = new MarkdownIt("commonmark", { breaks: true })

export default function parseMdToHtml(markdown) {
    return DOMPurify.sanitize(mdParser.render(markdown))
}
