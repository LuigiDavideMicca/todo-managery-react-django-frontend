/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Todos from '../components/Todos';

const Home = (props) => {
  const [user, setUser] = useState('');
  const [lastTodos, setLastTodos] = useState('');
  useEffect(() => {
    async function getLastTodos() {

        const resp = await fetch('http://127.0.0.1:8000/api/v1/todos/', {
          method: 'GET',
          mode: 'cors', // no-cors, *cors, same-origin
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Authorization': `Token ${props.token}`,
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer',
        })
        const results = await resp.json();
        setLastTodos(results) 
    }
    async function getUsers() {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/v1/users/', {
          method: 'GET',
          mode: 'cors', // no-cors, *cors, same-origin
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Authorization': `Token ${props.token}`,
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer',
        })
        const result = await res.json() 
        const myprofile = result.filter(item => item.username === props.username)
        setUser(myprofile)
      } catch (e) {
        console.log(e)
      }
    }
    getLastTodos()
    getUsers()
    }, [])



  return (
    <div className="container">
      <div className="jumbotron my-4">
        <h1 className="display-3">Hello, {user && user[0].username}</h1>
        <p className="lead">You have created {user && user[0].todos.length} todos for now</p>
        <hr className="my-4"/>
        <p>There are {user && user[0].categories.length} categories in your Todo Managery.</p>
      </div>
      {lastTodos.length > 0 &&
      <>
      <h3 className="display-5 py-5 mb-4 d-flex justify-content-center">Your Last Todos</h3>
      <div className="row">
        {lastTodos.map(item => 
          <div className="col-6">
              <Todos key={item.id} title={item.title} text={item.text} done_by={item.done_by} id={item.id} category={item.category} /> 
          </div>
            )}
      </div>
      </>
    }
    </div>
  );
}

export default Home;
