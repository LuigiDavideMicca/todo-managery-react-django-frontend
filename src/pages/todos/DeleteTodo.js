import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';



const DeleteTodo = ({token}) => {
    const location = useLocation();
    const id = location.pathname.split('/delete-todo/').pop()
    const history = useHistory();
    const eraseTodo = async() => {
        alert('Are you sure you wanna erase todo with id ' + id)
        await fetch(`http://127.0.0.1:8000/api/v1/todos/${id}`, {
            method: 'DELETE',
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

          alert('todo succesfully erased')
          history.push('/');
      }
  

    return (
      <div className="container">
      <h3 className="py-5 mb-4 d-flex justify-content-center">Erase your Todo number {id} ?</h3>
      <button className="btn btn-danger" onClick={eraseTodo}>Erase Todo!</button>
      </div>
    )
}

export default DeleteTodo;