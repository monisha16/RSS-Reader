import styles from './app.module.scss';
import Mainpage from './components/Mainpage/Mainpage';
import Header from './components/Header/Header';
function App() {
  return (
    <div className={styles.container}>
      <Header/>
      <Mainpage />
    </div>
  );
}

export default App;
