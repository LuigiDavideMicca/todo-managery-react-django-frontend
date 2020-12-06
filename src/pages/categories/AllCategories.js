import Categories from '../../components/Categories';

const AllCategories = ({categories}) => {
  return (
    <div className="container">
      <h3 className="display-5 py-5 mb-4 d-flex justify-content-center">Your Categories</h3>
      <div className="row">
        {categories.length > 0 && categories.map(category => 
          <div className="col-6" key={category.id}>
              <Categories key={category.id} title={category.title} id={category.id} /> 
          </div>
            )}
      </div>
    </div>
  );
}

export default AllCategories;
