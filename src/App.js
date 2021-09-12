import { useState, useEffect, Fragment } from 'react'
import React from 'react'
import "./styles.css"
import axios from 'axios'
import ReadOnlyRow from './component/ReadOnlyRow';
import EditableRow from './component/EditableRow';

export default function App() {

  const [closetData, setClosetData] = useState([]);//default value 
  const [addFormData, setAddFormData] = useState({
    type: '',
    color: '',
    season: ''
  });
  const [editFormData, setEditFormData] = useState({
    type: '',
    color: '',
    season: ''
  });
  const [editItemId, setItemId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();// prevent event post request
    //console.log(event.target)
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };//spread object means copy of addFormData

    newFormData[fieldName] = fieldValue

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();// prevent event post request

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData }//spread object means copy of editFormData   本物のコピーができる　参照ではない
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  }

  const handleAddFormSubmit = () => {
    const newItem = {
      type: addFormData.type,
      color: addFormData.color,
      season: addFormData.season
    }
    axios.post("/items", newItem)
      .then((response) => {
        //console.log("response.data", response.data)
        return setClosetData(response.data)
      })
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();// prevent event post request

    // console.log("id:", editItemId)
    // console.log("formdata:", editFormData)
    const editedItem = {
      id: editItemId,
      type: editFormData.type,
      color: editFormData.color,
      season: editFormData.season,
    }

    axios.patch(`/items/${editItemId}`, editedItem)//editedItem is req.body of the request. This is patch, so you dont need return request
      .then(() => {
        setClosetData((oldCloset) =>// old closet data (an array of objs)
          oldCloset.map(item => {
            if (item.id == editItemId) {
              return {
                ...item,
                ...editFormData
              }// item={type: cat, Color: pink, Season:1} editFormData={Season:2} =>{type: dog, Color: blue, Season:2}
            }
            return item
          })
        )
      })
    setItemId(null)
  }

  const handleEditClick = (event, element) => {//editable component
    event.preventDefault();// prevent event post request
    setItemId(element.id);

    const formValues = {
      type: element.type,
      color: element.color,
      season: element.season,
    }
    setEditFormData(formValues)
  }
  const handleCancelClick = () => {
    setItemId(null)
  }
  const handleDeleteClick = (itemId) => {// koko!
    const newItem = [...closetData]

    const index = closetData.findIndex((element) => element.id === itemId);
    newItem.splice(index, 1)
    setClosetData(newItem)

  }


  //return が終わってから呼び出される
  useEffect(() => {//instead of using fetch use Axios
    axios.get("/items")//if I deploy to heroku i can do relative path ("/items")
      .then((response) => {
        //console.log(response.data)
        return response.data
      })
      .then((data) => {
        //console.log(data)
        return setClosetData(data)
      })
  }, [])//trigering ながれをおう

  return (
    <div className="app-container">
      <a href="https://github.com/yukitomeow/closet-app-cc22">Link to Github</a>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Color</th>
              <th>Season</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {closetData.map((element) => {
              return (
                <Fragment>
                  {editItemId === element.id ?
                    (<EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                    ) : (
                      <ReadOnlyRow element={element}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                      />)}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </form>

      <h2>Add an Item</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="type"
          required="required"
          placeholder="Enter type..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="color"
          required="required"
          placeholder="Enter color..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="season"
          required="required"
          placeholder="Enter season..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div >
  )
}


















