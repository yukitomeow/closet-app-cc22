import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { Button } from '@mui/material';

const EditableRow = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
    return (
        <tr>
            <td>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="type..."
                    name="type"
                    value={editFormData.type}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter color..."
                    name="color"
                    value={editFormData.color}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter season..."
                    name="season"
                    value={editFormData.season}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <Button variant="outlined" startIcon={<SaveIcon />} type="submit">
                    save
                </Button>
                <Button variant="outlined" startIcon={<CancelIcon />} onClick={handleCancelClick}>
                    Cancel
                </Button>
            </td>
        </tr>
    )
}

export default EditableRow
