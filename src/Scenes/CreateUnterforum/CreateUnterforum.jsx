import React, { useEffect, useState } from 'react'
import styles from "./CreateUnterforum.module.css"
import GenericFoldingContainer from "./Components/FoldingContainer/GenericFoldingContainer.jsx"
import ReactMarkdown from 'react-markdown'
import { getForeneintraegeById } from "../../api/foreneintragRoutes"
import { getForenById } from "../../api/forenRoutes"
import { useParams, Link } from "react-router-dom";
export default function CreateUnterforum() {

    let { forumId } = useParams();

    const [foren, setForen] = useState() //{ idParentForum: "", name: "", ersteller: "", createdAt: "", updatedAt: "" }
    const [eintraege, setEintraege] = useState()//{ idParentForum: "", name: "", ersteller: "", createdAt: "", updatedAt: "" }

    useEffect((() => {
        getForenById({ idParentForum: forumId })
            .then((data) => { setForen(data); })
            //.then(console.log(foren))
            .catch((data) => { })

        getForeneintraegeById({ idForum: forumId, idKategorie: "", idForeneintrag: "" })
            .then((data) => { console.log(data); setEintraege(data); })
            .catch((data) => { })
    }), [forumId])//foren, eintraege

    return <div className={styles.dummyDiv}>
        <div> test</div>

    </div>
}
