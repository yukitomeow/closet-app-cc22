import React from 'react'

const ReadOnlyRow = ({ element, handleEditClick, handleDeleteClick }) => {
    return (

        <tr>
            <td>{element.id}</td>
            <td>{element.type}</td>
            <td>{element.color}</td>
            <td>{element.season}</td>
            <td>
                <button type="button" onClick={(event) => handleEditClick(event, element)}>Edit</button>
                <button type="button" onClick={() => handleDeleteClick(element.id)}>Delete</button>
            </td>
        </tr>
    )
}

export default ReadOnlyRow
