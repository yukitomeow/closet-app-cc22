import React from 'react'
import {
    TableCell,
    TableRow,
    IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const ReadOnlyRow = ({ index, element, handleEditClick, handleDeleteClick }) => {
    return (
        <TableRow key={index}>
            <TableCell>
                {element.id}
            </TableCell>
            <TableCell>
                {element.type}
            </TableCell>
            <TableCell>
                {element.color}
            </TableCell>
            <TableCell>
                {element.season}
            </TableCell>
            <TableCell>
                <IconButton aria-label="edit" size="large" onClick={(event) => handleEditClick(event, element)}>
                    <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton aria-label="delete" size="large" onClick={(event) => handleDeleteClick(element.id, event)}>
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default ReadOnlyRow
