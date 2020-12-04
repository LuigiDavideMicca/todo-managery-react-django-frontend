import {useState, useEffect} from 'react';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import Todos from '../../components/Todos';

const CategoriesTodo = ({token}) => {
    const [lastTodos, setLastTodos] = useState('');
    const history = useHistory();
    const location = useLocation();
    const title = location.pathname.split('/category-todos/').pop()

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
          let results = await resp.json();
          results = results.filter(item => item.category === title)
          results.length === 0 ? history.push('/404') : setLastTodos(results)
      }
      getLastTodos()
      }, [])
  
  
  
    return (
      <div className="container">
        <h3 className="display-5 pt-5 pb-4 my-1 d-flex justify-content-center">Your Todos in category:</h3>
        <h3 className="display-5 py-5 mb-5 d-flex justify-content-center"><strong>{title}</strong></h3>
        <div className="row">
          {lastTodos.length > 0 && lastTodos.map(item => 
            <div className="col-6">
                <Todos key={item.id} title={item.title} text={item.text} done_by={item.done_by} id={item.id} category={item.category} /> 
            </div>
              )}
        </div>
      </div>
    );
}

export default CategoriesTodo;