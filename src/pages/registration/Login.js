/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import { Alert, AlertTitle } from '@material-ui/lab';
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
    <Container maxWidth="sm" style={{ textAlign: 'center' }}>
      <LogoHeader />
      <Typography variant="h5">LOG IN</Typography>
      <br />
      <br />
      {errors &&
        errors.map(error => (
          <Alert severity="error" key={error} style={{ textAlign: 'left' }}>
            <AlertTitle>Error!</AlertTitle>
            {error}
          </Alert>
        ))}
      <br />
      <br />
      <FormControl>
        <form onSubmit={handleLogin}>
          <TextField
            id="outlined-basic"
            value={username}
            label="Your Username"
            variant="outlined"
            onChange={e => setUsername(e.target.value)}
            required
          />
          <br />
          <br />
          <TextField
            id="outlined-basic"
            value={password}
            label="Your Password"
            variant="outlined"
            type="password"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <br />
          <br />
          <br />
          <Button variant="contained" color="primary" type="submit">
            Log In
          </Button>
        </form>
      </FormControl>
      <br />
      <br />
      <Typography>
        Do not have an account yet? <Link href="/signup">Register Here</Link>
      </Typography>
    </Container>
  );
};

export default Login;
