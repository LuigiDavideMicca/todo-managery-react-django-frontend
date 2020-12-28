/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import './spinner.css';

const Spinner = ({ loading }) => (
  <div className="text-center">
    <img
      src={`${process.env.PUBLIC_URL}/spinner.jpg`}
      className="spinner rounded mx-auto"
      style={{ display: `${loading}`, width: '25%' }}
    />
  </div>
);

export default Spinner;
