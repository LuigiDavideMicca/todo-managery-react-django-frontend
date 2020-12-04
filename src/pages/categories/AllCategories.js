import { useState, useEffect } from "react";
import Categories from '../../components/Categories';

const AllCategories = (props) => {
  const [lastTodos, setLastTodos] = useState('');
  useEffect(() => {
    async function getLastTodos() {

        const resp = await fetch('http://127.0.0.1:8000/api/v1/categories/', {
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
    getLastTodos()
    }, [])



  return (
    <div className="container">
      <h3 className="display-5 py-5 mb-4 d-flex justify-content-center">Your Categories</h3>
      <div className="row">
        {lastTodos.length > 0 && lastTodos.map(item => 
          <div className="col-6">
              <Categories key={item.id} title={item.title} id={item.id} /> 
          </div>
            )}
      </div>
    </div>
  );
}

export default AllCategories;
