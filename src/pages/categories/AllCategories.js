/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-undef */
/* eslint-disable no-inner-declarations */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
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
    <div className="container">
      <Spinner loading={loading} />
      <h3
        className="display-5 py-5 mb-4 d-flex justify-content-center"
        style={{ visibility: `${visible}` }}>
        Your Categories
      </h3>
      <div className="row" style={{ visibility: `${visible}` }}>
        {allCatgories.length > 0 &&
          allCatgories.map(category => (
            <div className="col-md-6 col-sm-12" key={category.id}>
              <Categories key={category.id} title={category.title} id={category.id} />
            </div>
          ))}
      </div>
      {allCatgories.length === 0 && (
        <>
          <h3
            className="display-5 pt-5 pb-4 my-1 d-flex justify-content-center"
            style={{ visibility: `${visible}` }}>
            We are sorry
          </h3>
          <h3
            className="display-5 pt-5 pb-4 my-1 d-flex justify-content-center"
            style={{ visibility: `${visible}` }}>
            It looks like you have not created any category
          </h3>
        </>
      )}
    </div>
  );
};

export default AllCategories;
