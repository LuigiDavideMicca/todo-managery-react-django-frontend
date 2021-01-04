import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const NoPage = () => (
  <Container style={{ textAlign: 'center' }}>
    <Typography variant="h2">Oops!</Typography>
    <br />
    <br />
    <Typography variant="h4">404 Not Found</Typography>
    <br />
    <Typography variant="h6">
      We are sorry but an error has occured, requested page not found!
    </Typography>
    <br />
    <br />
  </Container>
);

export default NoPage;
