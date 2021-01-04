/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import { Alert, AlertTitle } from '@material-ui/lab';
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
    <Container style={{ textAlign: 'center' }} maxWidth="sm">
      <LogoHeader />
      <Typography variant="h5">REGISTER</Typography>
      {nonFiledErrors &&
        nonFiledErrors.map(error => (
          <Alert key={error} severity="warning" style={{ textAlign: 'left' }}>
            <AlertTitle>Warning!</AlertTitle>
            {error}
          </Alert>
        ))}
      {errors &&
        errors.map(error => (
          <Alert key={error} severity="error" style={{ textAlign: 'left' }}>
            <AlertTitle>Error!</AlertTitle>
            {error}
          </Alert>
        ))}
      <br />
      <br />
      <FormControl>
        <form onSubmit={handleSignup}>
          <TextField
            id="outlined-basic"
            required
            variant="outlined"
            value={username}
            label="your desired username"
            placeholder="eg: tester"
            onChange={e => setUsername(e.target.value)}
          />
          <br />
          <br />
          <TextField
            id="outlined-basic"
            type="password"
            variant="outlined"
            required
            label="type your password"
            value={password1}
            onChange={e => setPassword1(e.target.value)}
          />
          <br />
          <br />
          <TextField
            id="outlined-basic"
            type="password"
            variant="outlined"
            required
            label="confirm your password above"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
          />
          <br />
          <br />
          <TextField
            id="outlined-basic"
            type="email"
            variant="outlined"
            required
            label="your email"
            placeholder="eg: tester@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <br />
          <br />
          <Button
            style={{ backgroundColor: '#1f4068', color: 'whitesmoke' }}
            variant="contained"
            type="submit">
            Register
          </Button>
          <br />
        </form>
      </FormControl>
    </Container>
  );
};

export default SignUp;
