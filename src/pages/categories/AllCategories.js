/* eslint-disable no-undef */
/* eslint-disable no-inner-declarations */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Categories from '../../components/Categories';

const AllCategories = ({ categories, token, setCategories }) => {
  const [allCatgories, setAllCategories] = useState(categories);
  useEffect(() => {
    if (categories.length === 0) {
      async function getCategories() {
        try {
          const resp = await fetch('http://127.0.0.1:8000/api/v1/categories/', {
            method: 'GET',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
              Authorization: `Token ${token}`,
              'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
          });
          const results = await resp.json();
          setAllCategories(results);
          setCategories(results);
        } catch (e) {
          console.log(e);
        }
      }
      getCategories();
    }
  }, []);
  return (
    <div className="container">
      <h3 className="display-5 py-5 mb-4 d-flex justify-content-center">Your Categories</h3>
      <div className="row">
        {allCatgories.length > 0 &&
          allCatgories.map(category => (
            <div className="col-6" key={category.id}>
              <Categories key={category.id} title={category.title} id={category.id} />
            </div>
          ))}
      </div>
      {allCatgories.length === 0 && (
        <>
          <h3 className="display-5 pt-5 pb-4 my-1 d-flex justify-content-center">We are sorry</h3>
          <h3 className="display-5 pt-5 pb-4 my-1 d-flex justify-content-center">
            It looks like you have not created any category
          </h3>
        </>
      )}
    </div>
  );
};

export default AllCategories;
