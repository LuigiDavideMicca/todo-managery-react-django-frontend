import { useState } from 'react';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';


const UpdateTodo = ({token}) => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState('');
    const [done_by, setDate] = useState('');
  
    const location = useLocation();
    const history = useHistory();
    const id = location.pathname.split('/update-todo/').pop()
    const updateTodo = async(event) => {
        event.preventDefault();
        try {
            await fetch(`http://127.0.0.1:8000/api/v1/todos/${id}/`, {
                method: 'PUT',
                mode: 'cors', // no-cors, *cors, same-origin
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                  'Authorization': `Token ${token}`,
                  'Content-Type': 'application/json',
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({title, text, done_by})
              })
              history.push('/');
            } catch (e) {
                console.log(e)
        }
      }
  
    return (
        <>
        <div className="container">
        <h3 className="py-5 mb-4 d-flex justify-content-center">Update your todo number {id}</h3>
        <form  className="form-group my-3" onSubmit={updateTodo}>
        <label>Title</label>
        <input type="text"
          value={title}
          className="form-control"
          placeholder="New Title"
          onChange={e => setTitle(e.target.value)}>
        </input>
        <br/>
        <label>Text</label>
        <input type="text"
        className="form-control"
          value={text}
          placeholder="New Text"
          onChange={e => setText(e.target.value)}>
        </input>
        <br/>
        <label>Date and Time</label>
        <input required className="form-control" type="datetime-local" value={done_by} onChange={e => setDate(e.target.value)} />
        <button type="submit" className="btn btn-warning my-5">Update Todo</button>
      </form>

        </div>
        </>
    )
}

export default UpdateTodo;