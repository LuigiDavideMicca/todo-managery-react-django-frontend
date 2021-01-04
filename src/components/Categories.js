/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Categories = ({ title, id }) => (
  <>
    <Container>
      <Card variant="outlined" style={{ maxWidth: '30rem' }}>
        <CardContent style={{ backgroundColor: '#1f4068', color: 'whitesmoke' }}>
          <Typography gutterBottom variant="h5" component="h5">
            {title}
          </Typography>
          <CardActions>
            <Button
              size="small"
              href={`/category-todos/${title}`}
              style={{ backgroundColor: '#e43f5a', color: 'whitesmoke' }}>
              Todos in {title}
            </Button>
            <Button
              size="small"
              href={`/edit-category/${id}`}
              style={{ backgroundColor: '#e43f5a', color: 'whitesmoke' }}>
              Edit
            </Button>
            <Button
              size="small"
              href={`/delete-category/${id}`}
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

export default Categories;
