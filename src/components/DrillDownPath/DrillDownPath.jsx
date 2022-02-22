import React, { useEffect, useState } from "react"
import styles from "./DrillDownPath.module.css"
import { getParentPath } from "../../api/forenRoutes"
import { Link } from "react-router-dom"

export default function DrillDownPath(forumData) {

    const idForum = forumData.forumData;

    const [result, setResult] = useState()

    useEffect(() => {
        console.log(idForum)
        getParentPath(idForum)
            .then((data) => {
                console.log(data)
                let ids = data.id_path.split("->")
                let names = data.name_path.split("->")
                let res_tmp = [];

                ids.forEach((id, i) => res_tmp.push({ 'id': id, 'name': names[i] }));
                //ids.forEach((id, i) => res_tmp[{ 'id': id, 'name': names[i] }];
                console.log(res_tmp)
                setResult(res_tmp)

            })
            .catch((data) => { console.log(data) })
    }, [forumData])

    console.log(result)
    return (<div>
        {result
            ? result.map((item) => (
                item.id == 1 ? <Link to={"/foren/" + item.id}>{item.name}</Link> : <Link to={"/foren/" + item.id}> -> {item.name}</Link>
            ))
            : null}
    </div>
    )
}
