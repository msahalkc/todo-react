import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Todo.module.css';
import { v4 as uuidv4 } from "uuid";

const todo = () => {
  const navigate = useNavigate()

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser"))
  )

  const [userTodos, setUserTodos] = useState([])
  const [currentTodo, setCurrentTodo] = useState({
    id: uuidv4(),
    title: '',
    isCompleted: false,
  })

  useEffect(() => {
    if (!localStorage.getItem('loggedInUser')) {
      navigate("/login")
    }

    let todoData = JSON.parse(localStorage.getItem("todoData"))
    if (!todoData) {
      todoData = {}
      localStorage.setItem('todoData', JSON.stringify({}))
    }

    let localUserTodos = todoData[currentUser.email]
    if (localUserTodos) {
      setUserTodos(localUserTodos)
    }
  },[currentUser, navigate])

  const updateTodo = ()=>{
    if (currentTodo.title.trim() === "") {
      return;
    }

    let todoData = JSON.parse(localStorage.getItem("todoData"))
    todoData[currentUser.email] = [...userTodos, currentTodo]
    setUserTodos([...userTodos, currentTodo])
    localStorage.setItem('todoData', JSON.stringify(todoData))
    setCurrentTodo({
        id: uuidv4(),
        title: '',
        isCompleted: false,
    })
  }

  const deleteTodo = (id) =>{
    let filteredTodos = userTodos.filter((todo)=> todo.id !== id)
     
    let todoData = JSON.parse(localStorage.getItem("todoData"))
    todoData[currentUser.email] = filteredTodos
    setUserTodos(filteredTodos)
    localStorage.setItem('todoData', JSON.stringify(todoData))

  }
  
  const todoDone = (id, status) => {
    let updatedTodos = userTodos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: status } : todo
    );
  
    let todoData = JSON.parse(localStorage.getItem("todoData"));
    todoData[currentUser.email] = updatedTodos;
  
    setUserTodos(updatedTodos);
    localStorage.setItem("todoData", JSON.stringify(todoData));
  };
  

  return (
    <>
      <div className={styles.mainContainer}>
        <p className={styles.userName}>{currentUser.name}'s Todo</p>
        <div className={styles.formContainer}>
          <input type="text" value={currentTodo.title} onChange={(e) => { setCurrentTodo({ ...currentTodo, title: e.target.value }) }} className={styles.inputContainer} />
          <button className={styles.submitButton} onClick={updateTodo}>Add Todo</button>
        </div>
        <div className={styles.todoContainer}>
          {userTodos && userTodos.map((todo, key)=>(
            <div key={todo.id} className={styles.todo}>
            <input type="checkbox" onChange={(e)=> todoDone(todo.id, e.target.checked)} className={styles.completedStatus} checked={todo.isCompleted} />
            <p className={styles.todoLabel}>{todo.title}</p>
            <button className={styles.deleteTodo} onClick={()=>deleteTodo(todo.id)}>Delete</button>
          </div>
          ))}
        </div>
        <div className={styles.logoutContainer}>
          <button
            className={styles.logoutButton}
            onClick={() => {
              localStorage.removeItem("loggedInUser")
              navigate('/login')
            }}>Logout</button>
        </div>
      </div>
    </>
  )
}

export default todo