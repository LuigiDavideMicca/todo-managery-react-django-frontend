/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/registration/Login';
import SignUp from '../pages/registration/SignUp';
import NoPage from '../pages/404';
import NewTodo from '../pages/todos/NewTodo';
import DeleteTodo from '../pages/todos/DeleteTodo';
import UpdateTodo from '../pages/todos/UpdateTodo';
import AllTodos from '../pages/todos/AllTodos';
import Calendar from '../pages/Calendar';
import AllCategories from '../pages/categories/AllCategories';
import NewCategory from '../pages/categories/NewCategory';
import DeleteCategory from '../pages/categories/DeleteCategory';
import EditCategory from '../pages/categories/EditCategory';
import CategoryTodo from '../pages/categories/CategoryTodos';
import Navbar from '../components/Navbar';

const router = ({
  token,
  setToken,
  username,
  setUsername,
  categories,
  setCategories,
  todos,
  setTodos,
}) => (
  <Router>
    <Navbar token={token} setToken={setToken} categories={categories} setCategories={setCategories}>
      <Switch>
        <Route exact path="/">
          {token ? (
            <Home
              categories={categories}
              setCategories={setCategories}
              todos={todos}
              setTodos={setTodos}
              username={username}
              token={token}
            />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/calendar">
          {token ? (
            <Calendar token={token} setTodos={setTodos} todos={todos} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/login">
          {token ? (
            <Home
              categories={categories}
              setCategories={setCategories}
              todos={todos}
              setTodos={setTodos}
              username={username}
              token={token}
            />
          ) : (
            <Login setToken={setToken} username={username} setUsername={setUsername} />
          )}
        </Route>
        <Route path="/signup">
          {!token && <SignUp setToken={setToken} username={username} setUsername={setUsername} />}
        </Route>
        <Route path="/new-todo">
          {token ? (
            <NewTodo token={token} />
          ) : (
            <Login setToken={setToken} username={username} setUsername={setUsername} />
          )}
        </Route>
        <Route path="/delete-todo">
          {token ? (
            <DeleteTodo token={token} />
          ) : (
            <Login setToken={setToken} username={username} setUsername={setUsername} />
          )}
        </Route>
        <Route path="/update-todo">
          {token ? (
            <UpdateTodo token={token} />
          ) : (
            <Login setToken={setToken} username={username} setUsername={setUsername} />
          )}
        </Route>
        <Route path="/all-todos">
          {token ? (
            <AllTodos todos={todos} setTodos={setTodos} token={token} />
          ) : (
            <Login setToken={setToken} username={username} setUsername={setUsername} />
          )}
        </Route>
        <Route path="/all-categories">
          {token ? (
            <AllCategories categories={categories} setCategories={setCategories} token={token} />
          ) : (
            <Login setToken={setToken} username={username} setUsername={setUsername} />
          )}
        </Route>
        <Route path="/new-category">
          {token ? (
            <NewCategory token={token} />
          ) : (
            <Login setToken={setToken} username={username} setUsername={setUsername} />
          )}
        </Route>
        <Route path="/delete-category">
          {token ? (
            <DeleteCategory token={token} />
          ) : (
            <Login setToken={setToken} username={username} setUsername={setUsername} />
          )}
        </Route>
        <Route path="/edit-category">
          {token ? (
            <EditCategory token={token} />
          ) : (
            <Login setToken={setToken} username={username} setUsername={setUsername} />
          )}
        </Route>
        <Route path="/category-todos">
          {token ? (
            <CategoryTodo todos={todos} token={token} setTodos={setTodos} />
          ) : (
            <Login setToken={setToken} username={username} setUsername={setUsername} />
          )}
        </Route>
        <Route path="*">{token ? <NoPage /> : <Redirect to="/login" />}</Route>
      </Switch>
    </Navbar>
  </Router>
);

export default router;
