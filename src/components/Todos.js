/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/control-has-associated-label */
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Todos = ({ title, text, done_by, id, category }) => {
  // eslint-disable-next-line no-param-reassign
  done_by = done_by.replace('T', ' ').replace('Z', '');
  return (
    <>
      <Container>
        <Card variant="outlined" style={{ maxWidth: '30rem' }} raised>
          <CardContent style={{ backgroundColor: '#1f4068', color: 'whitesmoke' }}>
            <Typography gutterBottom>
              Category:
              {category}
            </Typography>
            <Typography variant="h4" component="h4" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {text}
            </Typography>
            <Typography>
              Done by:
              {done_by}
            </Typography>
            <CardActions>
              <Button size="small" color="primary">
                <Link href={`/update-todo/${id}`} underline="none" style={{ color: '#e43f5a' }}>
                  Change Todo
                </Link>
              </Button>
              <Button size="small">
                <Link href={`/delete-todo/${id}`} underline="none" style={{ color: '#e43f5a' }}>
                  Delete Todo
                </Link>
              </Button>
            </CardActions>
          </CardContent>
        </Card>
        <br />
        <br />
      </Container>
    </>
  );
};

export default Todos;
