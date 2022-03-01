import React, { useEffect, useState } from "react"
import styles from "./DrillDownPath.module.css"
import { getParentPath } from "../../api/forenRoutes"
import { Link } from "react-router-dom"

export default function DrillDownPath(forumData) {
    const idForum = forumData.forumData

    const [result, setResult] = useState()

    useEffect(() => {
        getParentPath(idForum)
            .then((data) => {
                let ids = data.id_path.split("->")
                let names = data.name_path.split("->")
                let res_tmp = []
                ids.forEach((id, i) => res_tmp.push({ id: id, name: names[i] }))
                setResult(res_tmp)
            })
            .catch((err) => {
                console.log("ERR drill down", err)
            })
    }, [forumData])

    return (
        <div>
            {result
                ? result.map((item) =>
                      item.id == 1 ? (
                          <Link key={item.id} to={"/foren/" + item.id}>
                              {item.name}
                          </Link>
                      ) : (
                          <Link key={item.id} to={"/foren/" + item.id}>
                              {" -> " + item.name}
                          </Link>
                      )
                  )
                : null}
        </div>
    )
}
