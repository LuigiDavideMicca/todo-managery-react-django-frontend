import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/registration/Login';
import SignUp from '../pages/registration/SignUp';
import NoPage from '../pages/404';
import NewTodo from '../pages/todos/NewTodo';
import DeleteTodo from '../pages/todos/DeleteTodo';
import UpdateTodo from '../pages/todos/UpdateTodo';
import AllTodos from '../pages/todos/AllTodos';
import AllCategories from '../pages/categories/AllCategories';
import NewCategory from '../pages/categories/NewCategory';
import DeleteCategory from '../pages/categories/DeleteCategory';
import EditCategory from '../pages/categories/EditCategory';
import CategoryTodo from '../pages/categories/CategoryTodos';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const router = ({token, setToken, username, setUsername, categories, setCategories, todos, setTodos}) => {
  return (
    <Router>
      <Navbar token={token} />
      <Sidebar setToken={setToken} token={token} categories={categories}>
      <Switch>
        <Route exact path="/">
          {token ? <Home categories={categories} setCategories={setCategories} todos={todos} setTodos={setTodos} username={username} token={token} /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
            {token ? <Home categories={categories} setCategories={setCategories} todos={todos} setTodos={setTodos} username={username} token={token} /> : <Login setToken={setToken} username={username} setUsername={setUsername} />}
        </Route>
          <Route path="/signup">
          {!token && <SignUp setToken={setToken} username={username} setUsername={setUsername} />}
        </Route>
        <Route path="/new-todo">
          {token ? <NewTodo token={token} /> : <Login setToken={setToken} username={username} setUsername={setUsername} />}
        </Route>
        <Route path="/delete-todo">
          {token ? <DeleteTodo token={token} /> : <Login setToken={setToken} username={username} setUsername={setUsername} />}
        </Route>
        <Route path="/update-todo">
          {token ? <UpdateTodo token={token} /> : <Login setToken={setToken} username={username} setUsername={setUsername} />}
        </Route>
        <Route path="/all-todos">
          {token ? <AllTodos todos={todos} /> : <Login setToken={setToken} username={username} setUsername={setUsername} />}
        </Route>
        <Route path="/all-categories">
          {token ? <AllCategories categories={categories} /> : <Login setToken={setToken} username={username} setUsername={setUsername} />}
        </Route>
        <Route path="/new-category">
          {token ? <NewCategory token={token} /> : <Login setToken={setToken} username={username} setUsername={setUsername} />}
        </Route>
        <Route path="/delete-category">
          {token ? <DeleteCategory token={token} /> : <Login setToken={setToken} username={username} setUsername={setUsername} />}
        </Route>
        <Route path="/edit-category">
          {token ? <EditCategory token={token} /> : <Login setToken={setToken} username={username} setUsername={setUsername} />}
        </Route>
        <Route path="/category-todos">
          {token ? <CategoryTodo todos={todos} /> : <Login setToken={setToken} username={username} setUsername={setUsername} />}
        </Route>
        <Route path="*">
        {token ? <NoPage /> : <Redirect to="/login" />}
        </Route>
      </Switch>
      </Sidebar>
    </Router>
  );
}

export default router;
