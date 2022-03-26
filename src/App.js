import styles from './app.module.scss';
import Mainpage from './components/Mainpage/Mainpage';
import SampleMainPage from './components/Mainpage/SampleMainPage';
import Header from './components/Header/Header';
function App() {
  return (
    <div className={styles.container}>
      <Header/>
      <SampleMainPage />
    </div>
  );
}

export default App;
