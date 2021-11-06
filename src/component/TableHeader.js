import React from 'react'
import {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from '@mui/material'

function TableHeader(props) {

    const { valueToOrderby, orderDirection, handleRequestSort } = props

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property)
    }

    return (
        <TableHead >
            <TableRow>
                <TableCell key="id">
                    <TableSortLabel
                        active={valueToOrderby === "id"}
                        direction={valueToOrderby === "id" ? orderDirection : "asc"}
                        onClick={createSortHandler("id")}
                    >
                        Id
                    </TableSortLabel>
                </TableCell>

                <TableCell key="type">
                    <TableSortLabel
                        active={valueToOrderby === "type"}
                        direction={valueToOrderby === "type" ? orderDirection : "asc"}
                        onClick={createSortHandler("type")}
                    >
                        Style
                    </TableSortLabel>
                </TableCell>
                <TableCell key="color">
                    <TableSortLabel
                        active={valueToOrderby === "color"}
                        direction={valueToOrderby === "color" ? orderDirection : "asc"}
                        onClick={createSortHandler("color")}
                    >
                        Color
                    </TableSortLabel>
                </TableCell>
                <TableCell key="season">
                    <TableSortLabel
                        active={valueToOrderby === "season"}
                        direction={valueToOrderby === "season" ? orderDirection : "asc"}
                        onClick={createSortHandler("season")}
                    >
                        Season
                    </TableSortLabel>
                </TableCell>
                <TableCell key="action">

                    Action
                </TableCell>
            </TableRow>
        </TableHead>
    )
}

export default TableHeader