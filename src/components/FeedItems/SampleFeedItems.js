import React, { useState, useEffect } from 'react';
import styles from './feedItems.module.scss';
import { v4 as uuid } from 'uuid';
import deleteImg from '../../assets/icons/delete.png';
import { useDispatch, useSelector } from 'react-redux';
import { update_feedList, update_feedData } from '../../store/actions/feedAction';
import { FEED_DATA, FEED_LIST } from '../../store/actionTypes';



const FeedItemsCard = ({ feed, id, toggleSetFeed }) => {
    // 1. Decide what feeds get viewed through checkboxes | toggle view
    // 2. Delete a feed on click of delete
    // 3. Edit the name of the feed
    // 4. fix SCROLLING

    function deleteFeed(e, id) {
        let newFeedList = Object.keys(feed)
            .filter((key) => key !== id)
            .reduce((obj, key) => {
                // console.log("dele OBJ, KEY: ", obj, key)
                obj[key] = feed[key];
                return obj;
            }, {});
        // sessionStorage.setItem('FeedList', JSON.stringify(newFeedList));
        toggleSetFeed(newFeedList);
    }

    function handleSelect(e, id) {
        let newObj = {
            ...feed[id],
            view: !feed[id].view
        }
        let newFeed = { ...feed, [id]: newObj };

        // sessionStorage.setItem('FeedList', JSON.stringify(newFeed));
        toggleSetFeed(newFeed);
    }
    return (
        <div className={styles.items_container}
            style={{ background: feed[id].view ? 'green' : 'red' }}
        >
            <div className={styles.feedName} onClick={(e) => handleSelect(e, id)}>{feed[id].name}</div>
            <img className={styles.feedcard_close} src={deleteImg} alt={"delete-feed"} onClick={(e) => deleteFeed(e, id)} />
        </div>
    );
}

const FormSection = () => {

    const [feedName, setFeedName] = useState(""); // name Input
    const [feedURL, setFeedURL] = useState(""); // URL Input
    const [formFeed, setFormFeed] = useState({}); //Final Form Value

    const dispatch = useDispatch();

    useEffect(() => {
        const feedItemsInSessionStorage = sessionStorage.getItem('FeedList');
        if (feedItemsInSessionStorage) {
            setFormFeed(JSON.parse(feedItemsInSessionStorage));
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem('FeedList', JSON.stringify(formFeed));
        dispatch({
            type: FEED_LIST,
            payload: formFeed
        });
    }, [formFeed]);

    function handleFeedName(e) {
        setFeedName(e.target.value);
    }
    function handleFeedURL(e) {
        setFeedURL(e.target.value);
    }
    function handleSubmit(e) {
        setFormFeed((data) => {
            return { ...data, [uuid()]: { name: feedName, url: feedURL, view: true } };
        })
        setFeedURL("")
        setFeedName("");
        e.preventDefault();
    }

    return (
        <>
            <form className={styles.formSection} onSubmit={handleSubmit}>
                <input
                    id="feedName"
                    placeholder="Feed Name"
                    value={feedName}
                    onChange={handleFeedName}
                    minLength="2"
                    maxLength="25"
                    required
                    autoComplete='off'
                    style={{ width: '12rem' }}
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
                <button type="Submit"> Add </button>
            </form>

            <div className={styles.feedList}>
                {Object.keys(formFeed).length === 0 ?
                    <h2> No Feeds </h2>
                    :
                    Object.keys(formFeed).map((id) => {
                        return <FeedItemsCard key={id} feed={formFeed} id={id} toggleSetFeed={setFormFeed} />
                    })
                }
            </div>
        </>
    );
}


const SampleFeedItems = ({ toggle }) => {

    function handleClose() {
        toggle((modal) => !modal);
    }
    return (
        <div className={styles.container}>
            <div className={styles.container__modal}>
                <div className={styles.close}>
                    <button onClick={handleClose}> X </button>
                </div>
                <FormSection />
            </div>
        </div>
    );
};

export default SampleFeedItems;