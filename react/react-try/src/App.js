import React from 'react'
import TodoList from './todo/TodoList'
import Context from './context'

function App() {
  const [todos, setTodos] = React.useState([
    {id: 1,
    complited: false,
    title: 'moloko'},

    {id: 2,
    complited: true,
    title: 'cofee'},

    {id: 3,
    complited: false,
    title: 'skyline'},
  ])


  function toggleTodo(id){
    setTodos(
      todos.map(todo => {
        if(todo.id === id){
          todo.complited = !todo.complited
        }
      return todo
      })
    )
  }


  function removeTodo(id){
    setTodos(todos.filter(todo => todo.id !==id))
  }

  return (
  <Context.Provider value={{ removeTodo }}>
    <div className="wrapper">
        <h1>My todo list</h1>
        <TodoList todos={todos} onToggle={toggleTodo}></TodoList>
    </div>
  </Context.Provider>
  )
}

export default App
