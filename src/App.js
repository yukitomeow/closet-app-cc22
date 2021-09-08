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
    console.log(event.target)
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

    const newFormData = { ...editFormData }//spread object means copy of editFormData
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
        console.log("response.data", response.data)
        return setClosetData(response.data)
      })
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();// prevent event post request

    const editedItem = {
      type: editFormData.type,
      color: editFormData.color,
      season: editFormData.season,
    }

    const newItems = [...closetData];//// cocomade 41ふん　https://www.youtube.com/watch?v=dYjdzpZv5yc&t=1045s　！！！！
    const index = closetData.findIndex((element) => element.id)

  }

  const handleEditClick = (event, element) => {
    event.preventDefault();// prevent event post request
    setItemId(element.id);

    const formValues = {
      type: element.name,
      color: element.color,
      season: element.season,
    }

    setEditFormData(formValues)
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
      <a href="https://github.com/yukitomeow/soloApiCloset" target="_blank">Link to Github</a>
      <from>
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
                    (<EditableRow editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange} />
                    ) : (
                      <ReadOnlyRow element={element}
                        handleEditClick={handleEditClick} />)}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </from>

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


















