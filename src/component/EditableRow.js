import React from 'react'

const EditableRow = () => {
    return (
        <tr>
            <td>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter type..."
                    name="type"
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter color..."
                    name="color"
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter season..."
                    name="season"
                ></input>
            </td>
        </tr>
    )
}

export default EditableRow
