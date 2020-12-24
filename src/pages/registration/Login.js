/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState } from 'react';

const Login = ({ setToken, username, setUsername }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
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
        body: JSON.stringify({ username, password, email }),
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
      <h2 className="py-5 mb-4 d-flex justify-content-center">LOG IN</h2>
      {errors &&
        errors.map(error => (
          <div className="alert alert-warning" key={error}>
            <h4 className="alert-heading">Error!</h4>
            <p className="mb-0">{error}</p>
          </div>
        ))}
      <form className="form-group my-3" onSubmit={handleLogin}>
        <input
          type="text"
          required
          value={username}
          className="form-control"
          placeholder="your username"
          onChange={e => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          className="form-control"
          required
          value={password}
          placeholder="your password"
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <input
          type="email"
          required
          className="form-control"
          placeholder="your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button className="btn btn-success my-4" type="submit">
          LOG IN!
        </button>
      </form>
    </div>
  );
};

export default Login;
