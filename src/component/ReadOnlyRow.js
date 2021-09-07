import React from 'react'

const ReadOnlyRow = ({ element }) => {
    return (

        <tr>
            <td>{element.id}</td>
            <td>{element.type}</td>
            <td>{element.color}</td>
            <td>{element.season}</td>
        </tr>


    )
}

export default ReadOnlyRow
