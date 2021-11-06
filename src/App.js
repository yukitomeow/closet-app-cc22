import React, { useState, useEffect, } from 'react'
import axios from 'axios'
import TableBody from './component/TableBody';
import {
  Stack,
  TextField,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function App() {

  const [closetData, setClosetData] = useState([]);
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
              }
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
  const handleDeleteClick = (itemId, event) => {// koko!
    event.preventDefault();
    axios.delete(`/items/${itemId}`)
      .then(response => {
        console.log(response)
        setClosetData(closetData.filter(element => element.id !== itemId))
      })
      .catch(err => console.log(err))
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

      <Stack direction="row" size="large" type="submit" spacing={2}>

        <form noValidate autoComplete="off" onSubmit={handleAddFormSubmit}>
          <TextField
            name="type"
            required="required"
            label="Enter Style..."
            variant="filled"
            onChange={handleAddFormChange}
          />
          <TextField
            name="color"
            required="required"
            label="Enter Color..."
            variant="filled"
            onChange={handleAddFormChange}
          />
          <TextField
            name="season"
            required="required"
            label="Enter Season..."
            variant="filled"
            onChange={handleAddFormChange}
          />
          <IconButton aria-label="add" size="large" type="submit">
            <AddIcon fontSize="large" />
          </IconButton>
        </form>

      </Stack >

      <form onSubmit={handleEditFormSubmit}>

        <TableBody
          handleEditFormChange={handleEditFormChange}
          handleCancelClick={handleCancelClick}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          closetData={closetData}
          editItemId={editItemId}
          editFormData={editFormData}
        />


      </form>

    </div >
  )
}


















