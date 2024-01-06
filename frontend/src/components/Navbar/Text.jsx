import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Text(props) {
  const [index, setIndex] = useState(false);

  useEffect(() => {
    console.log(props.set);
  }, [props.set]);

  const handleClick = (event) => {
    if (props.container) {
      const targetElement = document.querySelector(props.container);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        event.preventDefault();
      }
    }
       
    
    props.setRotatedValues(props.rotateArrayToTarget(props.rotatedValues , props.value)); 

    console.log(props.rotatedValues);

    if (props.value === 'Competition' || props.value === 'Sponsors' || props.value === 'Teams') {
      if (typeof props.setS === 'function') {
        props.setS((prevSet) => !prevSet);
      }
    } else {
      if (typeof props.setS === 'function') {
        props.setS(false);
      }
    }

  };

  useEffect(() => {
    setIndex(props.container);
    if (props.set) {
      setIndex("");
    } else {
      setIndex(props.container);
    }
  }, [props.container, props.set]);

  return (
    <div style={props.style} className="option" onClick={handleClick}>
      <Link to={index}>{props.value}</Link>
    </div>
  );
}

export default Text;
