import { MenuItem, Pagination as MuiPagination, Select } from "@mui/material"
import { useState } from "react"
import styles from "./Pagination.module.css"

export function usePaginationState(elementCount, defaultPage, defaultLimit) {
    const [pageState, setPageState] = useState({
        page: defaultPage || 1,
        limit: defaultLimit || 10,
    })

    const { page, limit } = pageState
    const pageCount = Math.floor(elementCount / limit) || 1
    const offset = limit * (page - 1)

    function updateState(obj) {
        setPageState({ ...pageState, ...obj })
    }

    return [{ page, pageCount, limit, offset }, updateState]
}

export default function Pagination({ elementCount, defaultPage, defaultLimit, handleChange, externalPaginationState }) {
    const [pageState, updateState] = externalPaginationState || usePaginationState(elementCount, defaultPage, defaultLimit)
    const { page, pageCount, limit, offset } = pageState

    return (
        <div className={styles.PaginationDiv}>
            <MuiPagination
                page={page}
                count={pageCount}
                onChange={(e, page) => {
                    updateState({ page })
                    handleChange ? handleChange(limit, offset) : null
                }}
                shape="rounded"
            />
            <Select
                value={limit}
                onChange={(e) => {
                    updateState({ limit: e.target.value })
                    handleChange ? handleChange(limit, offset) : null
                }}
                variant="standard"
            >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
            </Select>
        </div>
    )
}
