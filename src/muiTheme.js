import { createTheme } from "@mui/material/styles"
//https://bareynol.github.io/mui-theme-creator/

export const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#8e0f15"
            // light: "#c56466"
        },
        secondary: {
            main: "#0f8e88"
        },
        background: {
            default: "var(--bg-main)",
            paper: "var(--box-bg-main)"
        },
        text: {
            primary: "#f2f2f2" //SET MANUAL!!!
        }
    }
})
