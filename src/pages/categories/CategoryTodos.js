import { useLocation } from 'react-router';
import Todos from '../../components/Todos';

const CategoriesTodo = ({todos}) => {
    const location = useLocation();
    const title = location.pathname.split('/category-todos/').pop()
    todos = todos.length > 0 ? todos = todos.filter(todo => todo.category === title) : todos;
    return (
      <div className="container">
        {todos.length > 0 ? 
        <>
        <h3 className="display-5 pt-5 pb-4 my-1 d-flex justify-content-center">Your Todos in category:</h3>
        <h3 className="display-5 py-5 mb-5 d-flex justify-content-center"><strong>{title}</strong></h3>
        <div className="row">
          {todos.map(todo => 
            <div className="col-6">
                <Todos key={todo.id} title={todo.title} text={todo.text} done_by={todo.done_by} id={todo.id} category={todo.category} /> 
            </div>
              )}
        </div>
        </>
        :
        <>
        <h3 className="display-5 pt-5 pb-4 my-1 d-flex justify-content-center">We're sorry</h3>
        <h3 className="display-5 py-5 mb-5 d-flex justify-content-center"><strong>No todos found in category: {title}</strong></h3>
        </>
      }
      </div>
    );
}

export default CategoriesTodo;