import '../images/pic.ico';

const LogoHeader = () => (
  <header className="masthead my-5 py-4">
    <div className="container h-100">
      <div className="row h-100 align-items-center my-5">
        <div className="col-12 text-center">
          <img alt="todo managery logo" src="pic.ico" />
          <h1 className="font-weight-light mt-5">Welcome to Todo Managery</h1>
          <p className="lead my-2 pb-5">Where you can manage your todos easily</p>
        </div>
      </div>
    </div>
  </header>
);

export default LogoHeader;
