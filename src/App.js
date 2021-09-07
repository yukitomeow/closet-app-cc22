import { useState, useEffect } from 'react'
import React from 'react'
import "./styles.css"
import axios from 'axios'

export default function App() {

  const [closetData, setClosetData] = useState([]);//default value 

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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Color</th>
            <th>Season</th>
          </tr>
        </thead>
        <tbody>
          {closetData.map((element) => {
            return (
              <div>
                <tr>
                  <td>{element.id}</td>
                  <td>{element.type}</td>
                  <td>{element.color}</td>
                  <td>{element.season}</td>
                </tr>
              </div>
            )
          })}
        </tbody>
      </table>

      <h2>Add an Item</h2>
      <form>
        <input
          type="text"
          name="type"
          required="required"
          placeholder="Enter type..."
        />
        <input
          type="text"
          name="color"
          required="required"
          placeholder="Enter color..."
        />
        <input
          type="text"
          name="season"
          required="required"
          placeholder="Enter season..."
        />
      </form>
    </div >
  )
}


















