import styles from './app.module.scss';
import Header from './components/Header/Header';
import React,{useEffect} from 'react';
import RoutesComp from "./Routes";

function App() {

  return (
    <div className={styles.container}>
      <Header />
      {/* <SampleMainPage /> */}
      {/* <Mainpage /> */}
      {/* <Bookmarks /> */}
      <RoutesComp/>
    </div>
  );
}

export default App;
