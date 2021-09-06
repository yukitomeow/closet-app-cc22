import { useState, useEffect } from 'react'
import React from 'react'
import "./styles.css"
import axios from 'axios'

export default function App() {

  const [closetData, setClosetData] = useState();//default value 


  useEffect(() => {//instead of using fetch use Axios
    axios.get("/items")//if I deploy to heroku i can do relative path ("/items")
      .then(response => response.data)
      .then(data => setClosetData(data))

  }, [])//trigering ながれをおう

  return (
    <div className="app-container">
      <a href="https://github.com/yukitomeow/soloApiCloset" target="_blank">Link to github</a>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Type</th>
            <th>Color</th>
            <th>Season</th>
          </tr>
        </thead>
        <tbody>
          {/* {closetData.map((closetItem) => (
            <tr>
              <td>{closetItem.id}</td>
              <td>{closetItem.type}</td>
              <td>{closetItem.color}</td>
              <td>{closetItem.season}</td>
            </tr>
          ))} */}
          <tr>
            <td>1</td>
            <td>Dress</td>
            <td>Pink</td>
            <td>0</td>

          </tr>
        </tbody>

      </table>
      <h2>Add an item</h2>
      <form>
        <input
          type="text"
          name="type"
          required="required"
          placeholder="Enter a type.."

        />
        <input
          type="text"
          name="color"
          required="required"
          placeholder="Enter a color.."
        // onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="season"
          required="required"
          placeholder="Enter a season.."
        // onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}


















