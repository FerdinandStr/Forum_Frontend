import { Pagination as MuiPagination, TextField } from "@mui/material"
import { useState } from "react"

export function usePaginationState({ elementCount, startPage }) {
    const [page, setPage] = useState(startPage || 1)
    const [limit, setLimit] = useState(10)

    const offset = limit * (page - 1)
    const pageCount = elementCount % limit

    return { page, pageCount, limit, offset }
}

export default function Pagination({ elementCount = 0, startPage, defaultLimit, handleChange }) {
    const [page, setPage] = useState(startPage || 1)
    const [limit, setLimit] = useState(defaultLimit || 10)

    const offset = limit * (page - 1)
    const pageCount = Math.floor(elementCount / limit) || 1

    return (
        <div>
            <MuiPagination
                page={page}
                count={pageCount}
                onChange={(e, page) => {
                    setPage(page)
                    const offset = limit * (page - 1)
                    handleChange(limit, offset)
                }}
                shape="rounded"
            />
            <TextField
                id="standard-number"
                label="Number"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="standard"
            />
        </div>
    )
}
