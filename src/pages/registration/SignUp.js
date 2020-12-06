import {useState} from 'react';
import { useHistory } from 'react-router-dom';


const SignUp = ({setToken, username, setUsername}) => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState('');
  const history = useHistory();


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:8000/api-auth/registration/', {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({username, password1,password2, email}) // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      })
      const result = await res.json() 
      setToken(result.key)
      sessionStorage.setItem('token', result.key)
      history.push('/login');
    } catch (e) {
      console.log(e)
    }

  }
  return (
    <div className="container">
        <h2 className="py-5 mb-4 d-flex justify-content-center">Sign Up</h2>
      <form  className="form-group my-3" onSubmit={handleSubmit}>
        <input type="text"
          required
          value={username}
          placeholder="your desired username"
          className="form-control bordered"
          onChange={e => setUsername(e.target.value)}>
        </input>
        <br/>
        <input type="password"
        required
        placeholder="type your password"
        className="form-control"
          value={password1}
          onChange={e => setPassword1(e.target.value)}>
        </input>
        <br/>
        <input type="password"
        required
        className="form-control"
        placeholder="confirm your password above"
          value={password2}
          onChange={e => setPassword2(e.target.value)}>
        </input>
        <br/>
        <input type="email"
        required
        className="form-control"
        placeholder="your email"
          value={email}
          onChange={e => setEmail(e.target.value)}>
        </input>
        <button className="btn btn-warning my-4" type="submit">REGISTER!</button>
      </form>
    </div>
  );
}

export default SignUp;
