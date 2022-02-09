import React, { useEffect, useState } from 'react'
import styles from "./CreateUnterforum.module.css"
import { postForen } from "../../api/forenRoutes"
import { useParams, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// Achtung !!!! ParentID Muss Numeric sein + Name muss min. 5 Zeichen lang sein 
// TODO !!!!!! 

export default function CreateUnterforum() {

    let { forumId } = useParams();

    const [name, setName] = useState()

    const handleChangeName = (e) => {
        setName(e.target.value)
    }
    const createForum = (e) => {
        let paresedId = parseInt(forumId)

        let data = {
            "name": name,
            "idParentForum": paresedId
        }
        postForen(data)
    };


    return <div className={styles.dummyDiv}>
        <div> Forum erstellen</div>        <TextField
            id="outlined-disabled"
            label="Name"
            onChange={handleChangeName}
        />
        <Button variant="contained" onClick={createForum}>Erstellen</Button>
        <Button variant="outlined">Abbrechen</Button>
    </div>
}
