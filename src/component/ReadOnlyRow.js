import React from 'react'

const ReadOnlyRow = ({ element, handleEditClick }) => {
    return (

        <tr>
            <td>{element.id}</td>
            <td>{element.type}</td>
            <td>{element.color}</td>
            <td>{element.season}</td>
            <td>
                <button type="button" onClick={(event) => handleEditClick(event, element)}>Edit</button>
            </td>
        </tr>
    )
}

export default ReadOnlyRow
