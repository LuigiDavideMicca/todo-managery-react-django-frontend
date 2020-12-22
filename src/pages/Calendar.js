import './calendar.css'

const Calendar = ({todos}) => {

    return (
    <div className="container">
      <h3 className="display-5 py-5 mb-4 d-flex justify-content-center">Your Calendar</h3>
        {todos.length > 0 && todos.map(todo => 
      <div className="row row-striped my-5"  key={todo.id}>
          <div className="col-2 text-right">
              <h3 className="display-4"><span className="badge badge-primary">{todo.done_by.split('T').pop().replace('Z', '')}</span></h3>
              <h4>{todo.done_by.split('T').shift()}</h4>
          </div>
          <div className="col-10 pl-5">
              <h3 className="text-uppercase ml-5"><strong>{todo.title}</strong></h3>
              <ul className="list-inline ml-5">
                  <li className="list-inline-item"><i class="fa fa-location-arrow" aria-hidden="true"></i>Category: {todo.category}</li>
              </ul>
              <p className="ml-5">{todo.text}</p>
          </div>
      </div>
    )}
    {todos.length === 0 && 
        <>
            <h3 className="display-5 pt-5 pb-4 my-1 d-flex justify-content-center">We're sorry</h3>
            <h3 className="display-5 pt-5 pb-4 my-1 d-flex justify-content-center">It looks like you haven't created any todo</h3>
        </>
    }
  </div>
);
  }
  
  export default Calendar;
  