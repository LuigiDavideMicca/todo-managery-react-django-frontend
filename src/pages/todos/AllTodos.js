import { useState, useEffect } from "react";
import Todos from '../../components/Todos';

const AllTodos = ({token}) => {
  const [allTodos, setAllTodos] = useState('');
  useEffect(() => {
    async function getLastTodos() {

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
        setAllTodos(results) 
    }
    getLastTodos()
    }, [])



  return (
    <div className="container">
      <h3 className="display-5 py-5 mb-4 d-flex justify-content-center">Your Todos</h3>
      <div className="row">
        {allTodos.length > 0 && allTodos.map(item => 
          <div className="col-6">
              <Todos key={item.id} title={item.title} text={item.text} done_by={item.done_by} id={item.id} category={item.category} /> 
          </div>
            )}
      </div>
    </div>
  );
}

export default AllTodos;
