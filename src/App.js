import styles from './app.module.scss';
import Mainpage from './components/Mainpage/Mainpage';
import SampleMainPage from './components/Mainpage/SampleMainPage';
import Header from './components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { FEED_DATA, FEED_LIST, BOOKMARK_DATA } from './store/actionTypes';
import React,{useEffect} from 'react';
import Bookmarks from './components/Bookmarks/Bookmarks';
import Routes from "./Routes";

function App() {

  return (
    <div className={styles.container}>
      {/* <Header /> */}
      {/* <SampleMainPage /> */}
      {/* <Mainpage /> */}
      {/* <Bookmarks /> */}
      <Routes/>
    </div>
  );
}

export default App;
