/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import './spinner.css';
import Loading from '../images/spinner.jpg';

const Spinner = ({ loading }) => (
  <div className="text-center">
    <img
      src={Loading}
      className="spinner rounded mx-auto"
      style={{ display: `${loading}`, width: '25%' }}
    />
  </div>
);

export default Spinner;
