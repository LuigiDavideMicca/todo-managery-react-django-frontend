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
      {categories.length === 0 && 
            <>
              <h3 className="display-5 pt-5 pb-4 my-1 d-flex justify-content-center">We're sorry</h3>
              <h3 className="display-5 pt-5 pb-4 my-1 d-flex justify-content-center">It looks like you haven't created any category</h3>
            </>
      }
    </div>
  );
}

export default AllCategories;
