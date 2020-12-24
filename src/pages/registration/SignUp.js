/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LogoHeader from '../../components/LogoHeader';

const SignUp = ({ setToken, username, setUsername }) => {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [nonFiledErrors, setNonFiledErrors] = useState('');
  const [errors, setErrors] = useState('');
  const history = useHistory();

  const handleSignup = async event => {
    event.preventDefault();
    try {
      const res = await fetch(
        'https://luigidavidemicca.pythonanywhere.com/api-auth/registration/',
        {
          method: 'POST',
          mode: 'cors',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify({ username, password1, password2, email }),
        }
      );
      const result = await res.json();
      setToken(result.key);
      setErrors(Object.values(result));
      setNonFiledErrors(result.non_field_errors);
      result.key && sessionStorage.setItem('token', result.key);
      result.key && history.push('/login');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container">
      <LogoHeader />
      <h2 className="py-5 mb-4 d-flex justify-content-center">Register</h2>
      {nonFiledErrors &&
        nonFiledErrors.map(error => (
          <div className="alert alert-warning" key={error}>
            <h4 className="alert-heading">Warning!</h4>
            <p className="mb-0">{error}</p>
          </div>
        ))}
      {errors &&
        errors.map(error => (
          <div className="alert alert-danger" key={error}>
            <h4 className="alert-heading">Error!</h4>
            <p className="mb-0">{error}</p>
          </div>
        ))}
      <form className="form-group my-3" onSubmit={handleSignup}>
        <label className="my-3 h5">Username</label>
        <input
          type="text"
          required
          value={username}
          placeholder="your desired username"
          className="form-control bordered"
          onChange={e => setUsername(e.target.value)}
        />
        <br />
        <label className="my-3 h5">Password</label>
        <input
          type="password"
          required
          placeholder="type your password"
          className="form-control"
          value={password1}
          onChange={e => setPassword1(e.target.value)}
        />
        <br />
        <label className="my-3 h5">Repeat Password</label>
        <input
          type="password"
          required
          className="form-control"
          placeholder="confirm your password above"
          value={password2}
          onChange={e => setPassword2(e.target.value)}
        />
        <br />
        <label className="my-3 h5">Email</label>
        <input
          type="email"
          required
          className="form-control"
          placeholder="your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button className="btn btn-warning my-5" type="submit">
          REGISTER!
        </button>
      </form>
    </div>
  );
};

export default SignUp;
