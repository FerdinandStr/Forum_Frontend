import { createTheme } from "@mui/material/styles"
//https://bareynol.github.io/mui-theme-creator/
import styles from "./globalStyle.css"

console.log(styles)

export const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#8e0f15"
            // light: "#c56466"
        },
        secondary: {
            // main: "#f50057"
        },
        background: {
            default: "var(--bg-main)",
            paper: "var(--box-bg-main)"
        }
    }
})
