import { useState, useEffect } from 'react'
import React from 'react'
import "./styles.css"
import axios from 'axios'
//import { element } from 'prop-types';
//import Datatable from './component'


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
    </div >
  )
}


















