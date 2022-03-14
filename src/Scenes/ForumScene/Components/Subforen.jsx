import React, { useEffect, useState } from "react"
import { countSubforen, getSubforen } from "../../../api/forenRoutes"
import { Link } from "react-router-dom"
import styles from "./Subforen.module.css"
import Pagination, { usePaginationState } from "../../../components/Pagination/Pagination"
import { Button } from "@mui/material"
import { MdAddCircle } from "react-icons/md"

export default function Subforum({ idForum }) {
    const [foren, setForen] = useState()
    const [forenCount, setForenCount] = useState(0)
    const paginationState = usePaginationState(forenCount)
    const { limit, offset } = paginationState[0]

    useEffect(() => {
        countSubforen(idForum).then((count) => setForenCount(count))

        getSubforen(idForum, limit, offset)
            .then((data) => {
                setForen(data)
            })
            .catch((err) => {
                console.log("ERRROR!!!!", err)
                setForen()
            })
    }, [idForum, limit, offset])

    return (
        <div className={styles.ForenArea}>
            <div className={styles.PaginationBar}>
                <Link to={`/foren/${idForum}/addForum`}>
                    <Button variant="contained" startIcon={<MdAddCircle />}>
                        Neues Unterforum
                    </Button>
                </Link>
                {forenCount ? <Pagination externalPaginationState={paginationState} /> : null}
            </div>
            {forenCount ? (
                <div className={styles.SubforenContainer}>
                    <div className={styles.HeaderDiv}>
                        <div>Foren</div>
                    </div>
                    <div className={styles.SubforenList}>
                        {foren ? foren.map((forum) => <Forum forum={forum} key={"forum" + forum.idForum} />) : null}
                    </div>
                </div>
            ) : null}
        </div>
    )
}

function Forum({ forum }) {
    return (
        <div className={styles.ForumEntryDiv}>
            <Link to={"/foren/" + forum.idForum}>
                <h3>{forum.name}</h3>
            </Link>
        </div>
    )
}
