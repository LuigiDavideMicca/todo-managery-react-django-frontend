import Todos from '../../components/Todos';

const AllTodos = ({todos}) => {
  return (
    <div className="container">
      <h3 className="display-5 py-5 mb-4 d-flex justify-content-center">Your Todos</h3>
      <div className="row">
        {todos.length > 0 && todos.map(todo => 
          <div className="col-6" key={todo.id}>
              <Todos key={todo.id} title={todo.title} text={todo.text} done_by={todo.done_by} id={todo.id} category={todo.category} /> 
          </div>
            )}
      </div>
    </div>
  );
}

export default AllTodos;
