/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/control-has-associated-label */
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
            <Typography variant="p" gutterBottom>
              Category: {category}
            </Typography>
            <br />
            <br />
            <Typography variant="h5" component="h5" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {text}
            </Typography>
            <Typography variant="p" gutterBottom>
              {done_by}
            </Typography>
            <br />
            <br />
            <CardActions>
              <Button
                size="small"
                href={`/update-todo/${id}`}
                style={{ backgroundColor: '#e43f5a', color: 'whitesmoke' }}>
                Change
              </Button>
              <Button
                size="small"
                href={`/delete-todo/${id}`}
                style={{ backgroundColor: '#e43f5a', color: 'whitesmoke' }}>
                Delete
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
