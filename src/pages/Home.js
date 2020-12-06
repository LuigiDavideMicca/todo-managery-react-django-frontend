/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import Todos from '../components/Todos';

const Home = ({categories, setCategories, todos, setTodos, token}) => {
  const [user, setUser] = useState('');
  const [lastTodos, setLastTodos] = useState('');
  useEffect(() => {
    async function getTodos() {
        const resp = await fetch('http://127.0.0.1:8000/api/v1/todos/', {
          method: 'GET',
          mode: 'cors', // no-cors, *cors, same-origin
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer',
        })
        const results = await resp.json();
        setTodos(results)
        setLastTodos(results.slice(0,4)) 
    }
    async function getUsers() {
      try {
        const res = await fetch('http://127.0.0.1:8000/api-auth/user/ ', {
          method: 'GET',
          mode: 'cors', // no-cors, *cors, same-origin
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer',
        })
        const result = await res.json() 
        setUser(result)
      } catch (e) {
        console.log(e)
      }
    }
    async function getCategories() {
      const resp = await fetch('http://127.0.0.1:8000/api/v1/categories/', {
        method: 'GET',
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
      })
      const results = await resp.json();
      setCategories(results) 
  }

    getTodos()
    getUsers()
    getCategories()
    }, [])


  return (
    <div className="container">
      <div className="jumbotron my-4">
        <h1 className="display-3">Hello, {user && user.username}</h1>
        <p className="lead">You have created {todos && todos.length} todos for now</p>
        <hr className="my-4"/>
        <p>There are {categories && categories.length} categories in your Todo Managery.</p>
      </div>
      {lastTodos.length > 0 ?
      <>
      <h3 className="display-5 py-5 mb-4 d-flex justify-content-center">Your Todos Expirig Soon</h3>
      <div className="row">
        {lastTodos.map(todo => 
          <div className="col-6">
              <Todos key={todo.id} title={todo.title} text={todo.text} done_by={todo.done_by} id={todo.id} category={todo.category} /> 
          </div>
            )}
      </div>
      </>
    :
    <>
      <div className="row py-4 px-5">
        <h4>Start from Here</h4>
      </div>
      <div className="row">
        <div className="col-6">
          <Link className="btn btn-outline-dark" to="/new-todo">Add Todo</Link>
        </div>
        <div className="col-6">
          <Link className="btn btn-outline-primary" to="new-category">Add Category</Link>
        </div>
    </div>
  </>
}
    </div>
  );
}

export default Home;
