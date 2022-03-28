import styles from './app.module.scss';
import Header from './components/Header/Header';
import React from 'react';
import RoutesComp from "./Routes";

function App() {

  return (
    <div className={styles.container}>
      <Header />
      <RoutesComp/>
    </div>
  );
}

export default App;
