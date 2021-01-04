/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
import Link from '@material-ui/core/Link';
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
            <Button size="small" color="primary">
              <Link href={`/category-todos/${title}`} underline="none" style={{ color: '#e43f5a' }}>
                See All Todos in this category
              </Link>
            </Button>
            <Button size="small" color="primary">
              <Link href={`/edit-category/${id}`} underline="none" style={{ color: '#e43f5a' }}>
                Change Category
              </Link>
            </Button>
            <Button size="small" color="primary">
              <Link href={`/delete-category/${id}`} underline="none" style={{ color: '#e43f5a' }}>
                Delete Category
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

export default Categories;
