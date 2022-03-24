import React,{useState} from 'react';
import styles from './mainpage.module.scss';

const Mainpage = () => {
    const [feedName, setFeedName] = useState("");
    const [feedURL, setFeedURL] = useState("");
    const [ feed, setFeed] = useState({name:'', url:''})

    function handleClick(){

    }
    function handleFeedName(e){
        setFeedName(e.target.value);
    }
    function handleFeedURL(e){
        setFeedURL(e.target.value);
    }
    function handleSubmit(e){
        setFeed({name:feedName, url: feedURL})
        setFeedURL("")
        setFeedName("");
        e.preventDefault();
        console.log(feed)
    }
    return (
        <div className={styles.mainpage}>
            <form className={styles.forms_container} onSubmit={handleSubmit}>
                <input 
                    id="feedName"
                    placeholder="Feed Name"
                    value={feedName}
                    onChange={handleFeedName}
                    minLength="2"
                    maxLength="25"
                    required
                    autoComplete='off'
                    style={{width:'12rem'}}
                    title="custom name for feed URL"
                />
                <input 
                    id="feedURL"
                    placeholder="Feed URL"
                    value={feedURL}
                    onChange={handleFeedURL}
                    minLength="10"
                    maxLength="100"
                    required
                    autoComplete='off'
                    style={{ width: '20rem' }}
                />
                <button type="Submit"> + </button>
            </form>
            <div className={styles.feed_cards}>

            </div>
        </div>
    );
};

export default Mainpage;