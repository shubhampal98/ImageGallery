import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Header.css';

const Header = ({searchImages}) => {
  const [search, setSearch] = useState('');
  const onClickSearch = () => {
    searchImages('flickr.photos.search', search);
  }
  const onSetChange = (e) => {
    setSearch(e.target.value);
  }
  return (
    <header>
      <h1>Search Photos</h1>
      <input type="text" placeholder="Search for images" onChange={onSetChange} list="colorList"/>
      <button className="btn" onClick={() =>{onClickSearch()}}>Search</button>
      {/* <p>{search}</p> */}
    </header>
  )
}

export default Header
