import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Images from './Images';
import Header from "./Header";
import './img-cnt.css';
import { Loader } from './Loader';
import Modal from 'react-modal';

Modal.setAppElement("#root");
const ImagesContainer = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [modal, setModal] = useState(false);
  const [imgsrc, setImgsrc] = useState('');
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = (method='flickr.photos.getRecent', text='') => {
    setLoader(true);
    if(text!=''){
      setImages([]);
    }
    axios({
      method: 'GET',
      url: `https://www.flickr.com/services/rest/?api_key=2b457190c78d5b4ec6809b7694f43bbf&format=json&nojsoncallback=1`,
      params: {
        method: method,
        api_key: '2b457190c78d5b4ec6809b7694f43bbf',
        format: 'json',
        extras: 'url_m',
        page: page,
        per_page: 30,
        text: text,
        nojsoncallback: 1,
      }
    }).then(res => {
      // console.log(res.data.photos.photo);
      if(text=='') setImages([...images,...res.data.photos.photo]);
      else{
        setImages(res.data.photos.photo);
      }
      setPage(page+1);
      setLoader(false);
    })
  }

  const setOnClick =(e) => {
    console.log(e.target.getAttribute('src'));
    setModal(true);
    setImgsrc(e.target.getAttribute('src'));
  }
  

  return (
    <React.Fragment>
    <Header searchImages={fetchImages}/>
    <InfiniteScroll
      dataLength={images.length}
      next={() => {fetchImages()}}
      hasMore={true}
      // loader={<Loader/>}
    >
    <div id="image-container">
      {
      // loader? (
      //   <Loader />
      // ) : 
      images?.map((img,idx) => (
          <Images key={idx} title={img.title} url={img.url_m} clickFunction={setOnClick}></Images>
      ))
      }
      {loader && <Loader/>}
    </div>
    </InfiniteScroll>
    <Modal 
    isOpen={modal} 
    onRequestClose={() => setModal(false)}
    >
      <img src={imgsrc} style={{display: 'block', width: '500px', height: '500px', 
      margin: '100px auto'}} />
    </Modal>
    </React.Fragment>
  )
}

export default ImagesContainer
