import React, { useState } from "react";
import "./App.css"

function App() {

  const TODO = localStorage.getItem("todos")
  const initialValue = TODO ? JSON.parse(TODO) : []


  const [list, setlist] = useState('')
  const [des, setdes] = useState('')
  const [todos, setTodos] = useState(initialValue)
  console.log(todos)
  const [todoId, setTodoId] = useState("")

  const val = (e) => {
    setdes(e.target.value)
  }
  const valone = (e) => {
    setlist(e.target.value)
  }

  const editbtn = (t) => {
    console.log(t)
    setTodoId(t.id)
    setlist(t.list)
    setdes(t.des)

  }
  const allDelete = () => {
    setTodos([])


  }
  const deletebtn = (todo) => {
    const update = todos.filter(t => t.id !== todo.id)
    setTodos(update)
    localStorage.setItem("todos", JSON.stringify(update))
  }

  const itemlist = (e) => {
    e.preventDefault()
    if (todoId) {
      const updated = todos.map(todo => {
        return todo.id === todoId ? { ...todo, list: list, des: des } : todo
      })

      setTodos(updated)
      localStorage.setItem("todos", JSON.stringify(updated))
      setTodoId("")
    } else {
      const updated = [...todos, { list: list, des: des, id: Math.random() }]
      setTodos(updated)
      localStorage.setItem("todos", JSON.stringify(updated))
    }
    setlist("")
    setdes("")

  }

  return (


    <div className="main">

      <form >
        <div className="heading_div">
          <h1 >TO-DO LIST</h1>
        </div>

        <br />
        <div className="item_aad_div">
          <label><b>NAME</b></label>
          <input value={list} name="NAME" placeholder="AAD YOUR TOPIC" required onChange={valone} />
          <br />
          <label><b>DESCRIPTION</b></label>
          <input value={des} name="DESCRIPTION" placeholder="AAD TOPIC DESCRIPTION" required onChange={val} />
          <button className="btn" onClick={itemlist}><b>{
            todoId ? "UPDATE " : 'ADD LIST'
          }</b></button>
        </div>
      </form>

      <div className="td" >



        <table border={"1px"} className="size">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

            {
              todos.map(t =>  <tr key={t.id}>
                
                <td>{t.list}</td>
                <td>{t.des}</td>
                <td>
                  <button className="right-two" onClick={() => { editbtn(t) }}>EDIT</button>
                  <button className="right-one" onClick={() => { deletebtn(t) }}>DELETE</button>

                </td>
              </tr>)
            }
          </tbody>

        </table>
      </div>

      <button className="deleteAll" onClick={allDelete}>DELETE ALL</button>


    </div>



  )
}
export default App;