import React, { useState, useEffect } from 'react';
import styles from './feedItems.module.scss';
import { v4 as uuid } from 'uuid';
import axios from "axios";
import deleteImg from '../../assets/icons/delete.png';
import { useDispatch, useSelector } from 'react-redux';
import { update_feedList, update_feedData } from '../../store/actions/feedAction';
import { FEED_DATA, FEED_LIST } from '../../store/actionTypes';



const FeedItemsCard = ({ feed, id, toggleSetFeed }) => {
    const dispatch = useDispatch();
    // 1. Decide what feeds get viewed through checkboxes | toggle view
    // 2. Delete a feed on click of delete
    // 3. Edit the name of the feed
    // 4. fix SCROLLING
    const { feedList, feedData, bookmarkData } = useSelector((state) => {
        const states = {
            feedList: state.feedReducer.feedList,
            feedData: state.feedReducer.feedData,
            bookmarkData: state.feedReducer.bookmarkData
        }
        return states;
    });
    function deleteFeed(e, id) {
        let newFeedList1 = { ...feedData}
        delete newFeedList1[id];

        let newFeedList2 = { ...feedList }
        delete newFeedList2[id];
        dispatch({
            type: FEED_DATA,
            payload: newFeedList1
        });
        dispatch({
            type: FEED_LIST,
            payload: newFeedList2
        });
        // let newFeedList = Object.keys(feed)
            // .filter((key) => key !== id)
            // .reduce((obj, key) => {
            //     // console.log("dele OBJ, KEY: ", obj, key)
            //     obj[key] = feed[key];
            //     return obj;
            // }, {});
        // sessionStorage.setItem('FeedList', JSON.stringify(newFeedList));
        // toggleSetFeed(newFeedList2);
    }

    function handleSelect(e, id) {
        let newObj = {
            ...feed[id],
            view: !feed[id].view
        }
        let newFeed = { ...feed, [id]: newObj };

        // sessionStorage.setItem('FeedList', JSON.stringify(newFeed));
        // toggleSetFeed(newFeed);
        dispatch({
            type: FEED_LIST,
            payload: newFeed
        });
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
    const apiKey = "s5mybzzw2gktjneccuxfnbs9yikyzd6eohm7d70k";
    const [feedName, setFeedName] = useState(""); // name Input
    const [feedURL, setFeedURL] = useState(""); // URL Input

    const dispatch = useDispatch();
    const { feedList, feedData, bookmarkData } = useSelector((state) => {
        const states = {
            feedList: state.feedReducer.feedList,
            feedData: state.feedReducer.feedData,
            bookmarkData: state.feedReducer.bookmarkData
        }
        return states;
    });

    useEffect(() => {
        sessionStorage.setItem('FeedList', JSON.stringify(feedList));
    }, [feedList]);

    const getFeeds = async (feedItem) => {
        const { data } = await axios.get(feedItem.url);
        console.log(data);
        let tempFeedItems = {};
        
        data['items'].forEach(
            (content) => {
                tempFeedItems = { ...tempFeedItems, [uuid()]: content }; 
            });
        return tempFeedItems;

    };

    useEffect(() => {
        // Array of { id: mainFeedId, url: feed's URL(RSS -> JSON)}
        const urlList = Object.keys(feedList).map(id => {
            return {
                id: id,
                name: feedList[id].name,
                url: `https://api.rss2json.com/v1/api.json?rss_url=${feedList[id].url}&api_key=${apiKey}&count=5`
            }
        });

        urlList.length !==0 && urlList.forEach(async(feedItem) => {
            let newData = await getFeeds(feedItem);
            let tempFeedData = { ...feedData, [feedItem.id]: newData }
            dispatch({
            type: FEED_DATA,
            payload: tempFeedData
        });
            // setCompleteFeed((data) => { return { ...data, [feedItem.id]: newData } });
        });
    }, [feedList]);

    useEffect(()=>{
        sessionStorage.setItem('FeedData', JSON.stringify(feedData));
    },[feedData])

    function handleFeedName(e) {
        setFeedName(e.target.value);
    }
    function handleFeedURL(e) {
        setFeedURL(e.target.value);
    }
    function handleSubmit(e) {
        let tempFeedList = { ...feedList, [uuid()]: { name: feedName, url: feedURL, view: true } };
        dispatch({
            type: FEED_LIST,
            payload: tempFeedList
        });
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
                {Object.keys(feedList).length === 0 ?
                    <h2> No Feeds </h2>
                    :
                    Object.keys(feedList).map((id) => {
                        return <FeedItemsCard key={id} feed={feedList} id={id} />
                    })
                } 
            </div>
        </>
    );
}

const FeedItemsWithFeedData = ({ toggle }) => {

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

export default FeedItemsWithFeedData;