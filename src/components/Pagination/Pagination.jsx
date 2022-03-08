import { MenuItem, Pagination as MuiPagination, Select } from "@mui/material"
import React, { useState } from "react"
import { useSearchParams } from "react-router-dom"
import styles from "./Pagination.module.css"

//OFFSET CAN BE CALUCLATED WHEN NEEDED
// const offset = limit * (page - 1)

export function usePaginationState(elementCount, defaultPage, defaultLimit) {
    const [pageState, setPageState] = useState({
        page: defaultPage || 1,
        limit: defaultLimit || 10,
    })

    const { page, limit } = pageState
    const pageCount = Math.ceil(elementCount / limit) || 1
    const offset = limit * (page - 1)

    function updateState(obj) {
        setPageState({ ...pageState, ...obj })
    }

    return [{ page, pageCount, limit, offset }, updateState]
}

export default function Pagination({ elementCount, defaultPage, defaultLimit, handleChange, externalPaginationState, useURL }) {
    const [pageState, updateState] = externalPaginationState || usePaginationState(elementCount, defaultPage, defaultLimit)
    const { page, pageCount, limit } = pageState
    const setSearchParams = useSearchParams()[1]

    return (
        <div className={styles.PaginationDiv}>
            <MuiPagination
                page={page}
                count={pageCount}
                onChange={(e, page) => {
                    updateState({ page })
                    handleChange ? handleChange(page, limit) : false
                    useURL ? setSearchParams({ page, limit }) : false
                }}
                shape="rounded"
            />
            <Select
                value={limit}
                onChange={(e) => {
                    const newLimit = e.target.value
                    const newPage = newLimit > limit ? Math.ceil((page * limit) / newLimit) : 1 //calc new location (∩^o^)⊃━☆゜.*
                    updateState({ page: newPage, limit: newLimit })
                    handleChange ? handleChange(newPage, newLimit) : null
                    useURL ? setSearchParams({ page: newPage, limit: newLimit }) : false
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
