/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import '../images/pic.ico';
import './spinner.css';

const Spinner = ({ loading }) => (
  <div className="text-center">
    <img src="pic.ico" className="spinner rounded mx-auto" style={{ display: `${loading}` }} />
  </div>
);

export default Spinner;
