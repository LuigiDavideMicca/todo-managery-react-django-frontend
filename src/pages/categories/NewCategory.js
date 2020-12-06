import { useState} from 'react';
import { useHistory } from 'react-router-dom';

const NewCategory = ({token}) => {
    const [title, setTitle] = useState("");
  
    const history = useHistory();
    
    const createCategory = async(event) => {
        event.preventDefault();
        try {
            await fetch(`http://127.0.0.1:8000/api/v1/categories/`, {
                method: 'POST',
                mode: 'cors', // no-cors, *cors, same-origin
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                  'Authorization': `Token ${token}`,
                  'Content-Type': 'application/json',
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({title})
              })
              history.push('/');
            } catch (e) {
                console.log(e)
        }
      }
  
    return (
        <>
        <div className="container">
        <h3 className="py-5 mb-4 d-flex justify-content-center">Create a new Catgory</h3>
        <form  className="form-group my-3" onSubmit={createCategory}>
        <input type="text"
          required
          value={title}
          className="form-control"
          placeholder="Title"
          onChange={e => setTitle(e.target.value)}>
        </input>
        <button type="submit" className="btn btn-success my-5">Create Category</button>
      </form>

        </div>
        </>
    )
}

export default NewCategory;