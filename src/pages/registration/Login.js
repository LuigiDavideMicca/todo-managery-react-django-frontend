import {useState} from 'react';

const Login = ({setToken, username, setUsername}) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:8000/api-auth/login/', {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({username, password, email}) // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      })
      const result = await res.json() 
      setToken(result.key)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="container">
        <h2 className="py-5 mb-4 d-flex justify-content-center">LOG IN</h2>
      <form  className="form-group my-3" onSubmit={handleSubmit}>
        <input type="text"
          required
          value={username}
          className="form-control"
          placeholder="your username"
          onChange={e => setUsername(e.target.value)}>
        </input>
        <br/>
        <input type="password"
        className="form-control"
        required
          value={password}
          placeholder="your password"
          onChange={e => setPassword(e.target.value)}>
        </input>
        <br/>
        <input type="email"
        required
        className="form-control"
        placeholder="your email"
          value={email}
          onChange={e => setEmail(e.target.value)}>
        </input>
        <button className="btn btn-success my-4" type="submit">LOG IN!</button>
      </form>
    </div>
  );
}

export default Login;
