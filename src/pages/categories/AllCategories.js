import { useState, useEffect } from "react";
import Categories from '../../components/Categories';

const AllCategories = ({token}) => {
  const [categories, setCategories] = useState('');
  useEffect(() => {
    async function getAllCategories() {

        const resp = await fetch('http://127.0.0.1:8000/api/v1/categories/', {
          method: 'GET',
          mode: 'cors', // no-cors, *cors, same-origin
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer',
        })
        const results = await resp.json();
        setCategories(results) 
    }
    getAllCategories()
    }, [])



  return (
    <div className="container">
      <h3 className="display-5 py-5 mb-4 d-flex justify-content-center">Your Categories</h3>
      <div className="row">
        {categories.length > 0 && categories.map(category => 
          <div className="col-6">
              <Categories key={category.id} title={category.title} id={category.id} /> 
          </div>
            )}
      </div>
    </div>
  );
}

export default AllCategories;
