import React from "react"
import { Link } from 'react-router-dom'
import styles from "./Footer.module.css"

function Footer() {
    return <div className={styles.footerDiv}>
        <div className={styles.bottomFooterBar}>
            &copy;2022 Ferdinand Straß, Lenny Floruß, Timo Oswald, Manfred Meier &#124;
            <Link to='/impressum'>  Impressum</Link>  &#124;
            <Link to='/kontakt'>  Kontakt</Link>  &#124;
            <Link to='/agb'>  AGBs</Link></div>
    </div>
}

export default Footer