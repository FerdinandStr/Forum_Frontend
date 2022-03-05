import { SliderThumb } from "@mui/material"
import { createTheme } from "@mui/material/styles"
//https://bareynol.github.io/mui-theme-creator/

export const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "2px",
                },
            },
        },
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    borderRadius: "2px",
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: "2px",
                },
            },
        },
    },
    palette: {
        mode: "dark",
        primary: {
            main: "#e2001a",
            // light: "#c56466"
        },
        secondary: {
            main: "#0f8e88",
        },
        background: {
            default: "var(--bg-main)",
            paper: "var(--box-bg-main)",
        },
        text: {
            primary: "#f2f2f2", //SET MANUAL!!!
        },

        shape: {
            borderRadius: 10,
        },
    },
})
