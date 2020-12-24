/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoHeader from '../../components/LogoHeader';

const Login = ({ setToken, username, setUsername }) => {
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const res = await fetch('https://luigidavidemicca.pythonanywhere.com/api-auth/login/', {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ username, password }),
      });
      const result = await res.json();
      setToken(result.key);
      setErrors(result.non_field_errors);
      result.key && sessionStorage.setItem('token', result.key);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container">
      <LogoHeader />
      <h2 className="py-5 mb-4 d-flex justify-content-center">LOG IN</h2>
      {errors &&
        errors.map(error => (
          <div className="alert alert-warning" key={error}>
            <h4 className="alert-heading">Error!</h4>
            <p className="mb-0">{error}</p>
          </div>
        ))}
      <form className="form-group my-3" onSubmit={handleLogin}>
        <label className="my-3 h5">Username</label>
        <input
          type="text"
          required
          value={username}
          className="form-control"
          placeholder="your username"
          onChange={e => setUsername(e.target.value)}
        />
        <br />
        <label className="my-3 h5">Password</label>
        <input
          type="password"
          className="form-control"
          required
          value={password}
          placeholder="your password"
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <button className="btn btn-success mt-5" type="submit">
          LOG IN!
        </button>
      </form>
      <div className="text-muted mb-3" to="/login">
        Do not have an account yet?{' '}
        <Link className="text-primary h5" to="/signup">
          Register Here
        </Link>
      </div>
    </div>
  );
};

export default Login;
