import { useState } from 'react';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';


const EditCategory = ({token}) => {
    const [title, setTitle] = useState("");
  
    const location = useLocation();
    const history = useHistory();
    const id = location.pathname.split('/edit-category/').pop()
    const updateCategory = async(event) => {
        event.preventDefault();
        try {
            await fetch(`http://127.0.0.1:8000/api/v1/categories/${id}/`, {
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
        <h3 className="py-5 mb-4 d-flex justify-content-center">Update your Category number {id}</h3>
        <form  className="form-group my-3" onSubmit={updateCategory}>
        <input type="text"
          required
          value={title}
          className="form-control"
          placeholder="New Title"
          onChange={e => setTitle(e.target.value)}>
        </input>
        <button type="submit" className="btn btn-warning my-5">Update Category</button>
      </form>

        </div>
        </>
    )
}

export default EditCategory;