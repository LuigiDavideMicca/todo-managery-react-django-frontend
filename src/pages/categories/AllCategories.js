/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-undef */
/* eslint-disable no-inner-declarations */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Categories from '../../components/Categories';
import Spinner from '../../components/Spinner';

const AllCategories = ({ categories, token, setCategories }) => {
  const [allCatgories, setAllCategories] = useState(categories);
  const [loading, setLoading] = useState('inline');
  const [visible, setVisible] = useState('hidden');
  useEffect(() => {
    if (categories.length === 0) {
      async function getCategories() {
        try {
          const resp = await fetch(
            'https://luigidavidemicca.pythonanywhere.com/api/v1/categories/',
            {
              method: 'GET',
              mode: 'cors',
              credentials: 'same-origin',
              headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
              },
              redirect: 'follow',
              referrerPolicy: 'no-referrer',
            }
          );
          const results = await resp.json();
          setAllCategories(results);
          setCategories(results);
          setLoading('none');
          setVisible('visible');
        } catch (e) {
          console.log(e);
        }
      }
      getCategories();
    } else {
      setLoading('none');
      setVisible('visible');
    }
  }, []);
  return (
    <Container style={{ textAlign: 'center' }}>
      <Spinner loading={loading} />
      <Typography
        variant="h4"
        // eslint-disable-next-line react/jsx-closing-bracket-location
        style={{ visibility: `${visible}` }}>
        Your Categories
      </Typography>
      <br />
      <br />
      <Grid container style={{ visibility: `${visible}` }} alignItems="center">
        {allCatgories.length > 0 &&
          allCatgories.map(category => (
            <Grid item xs={12} key={category.id}>
              <Categories key={category.id} title={category.title} id={category.id} />
            </Grid>
          ))}
      </Grid>
      {allCatgories.length === 0 && (
        <>
          <Typography
            variant="h4"
            // eslint-disable-next-line react/jsx-closing-bracket-location
            style={{ visibility: `${visible}` }}>
            We are sorry
          </Typography>
          <Typography
            variant="h6"
            // eslint-disable-next-line react/jsx-closing-bracket-location
            style={{ visibility: `${visible}` }}>
            It looks like you have not created any category
          </Typography>
        </>
      )}
    </Container>
  );
};

export default AllCategories;
