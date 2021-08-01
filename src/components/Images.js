import React from 'react';
import './Images.css';

const Images = ({title, url,clickFunction}) => {
  // console.log(title);

  return (
    <img id="img" src={url} alt={title} width='25%' onClick={clickFunction}/>
  )
}

export default Images
