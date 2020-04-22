import React from 'react';
import './Button.css';
const handleClasses = props => {
  let classes = 'button';
  classes += props.operation ? ' operation' : '';
  classes += props.double ? ' double' : '';
  classes += props.triple ? ' triple' : '';
  return classes;
};
export default props => (
  <button
    onClick={() => props.click && props.click(props.label)}
    className={handleClasses(props)}
  >
    {props.label}
  </button>
)