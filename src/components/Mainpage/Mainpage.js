import React,{useState, useEffect} from 'react';
import styles from './mainpage.module.scss';
import axios from "axios";
import { v4 as uuid } from 'uuid';
// s5mybzzw2gktjneccuxfnbs9yikyzd6eohm7d70k
const Mainpage = () => {
  const [completeFeed, setCompleteFeed] = useState({}); //complete data of the feeds
  const [feedList, setFeedList] = useState({}); //just the list of names and urls
  const [ feedItems, setFeedItems] = useState({}); // new feed Item list

    useEffect(() => {
        const feedItemsInSessionStorage = sessionStorage.getItem('FeedList'); //{id, name, url}
        if (feedItemsInSessionStorage) {
            setFeedList(JSON.parse(feedItemsInSessionStorage));
        }
        const feedDataInSessionStorage = sessionStorage.getItem('FeedData'); //{complete data mapping}
        if (feedDataInSessionStorage) {
            setCompleteFeed(JSON.parse(feedDataInSessionStorage));
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem('FeedData', JSON.stringify(completeFeed));
    }, [completeFeed]);
    

//   const apiKey = process.env.REACT_APP_API_KEY;
    const apiKey = "s5mybzzw2gktjneccuxfnbs9yikyzd6eohm7d70k";

    // Array of { id: mainFeedId, url: feed's URL(RSS -> JSON)}
    const urlList = Object.keys(feedList).map(id=> { 
        return {
            id: id,
            name: feedList[id].name,
            url: `https://api.rss2json.com/v1/api.json?rss_url=${feedList[id].url}&api_key=${apiKey}&count=5`
        }
    });


  const getFeeds = async (feedItem) => {
    const { data } = await axios.get(feedItem.url);

    Object.keys(data).forEach(item=>{
        if(item === 'items')
        {
            data[item].forEach(
                (content)=> {
                setFeedItems((data) => { return { ...data, [uuid()]: content }});
            });
        }
    });
    let newList = {};
    newList = feedItems;
    console.log("feedItems", feedItems)
    setCompleteFeed((data) => { return { ...data, [feedItem.id]: newList } });
  };

  // useEffect(() => {
    
  // }, [feedItems])

  useEffect(() => {
    urlList.forEach((feedItem) =>
    {
        getFeeds(feedItem);
        // console.log("urlList - feedItem", urlList, feedItem);
    });
  }, [feedList]);

  useEffect(()=>{
    sessionStorage.setItem("FeedData", JSON.stringify(completeFeed));
    // console.log("completeFeed", completeFeed);
  },[completeFeed])

  return (
    <div>
      {/* <Header />
      {!urls.length ? (
        <NoFeeds text="Add feeds to consume your content" />
      ) : (
        <FeedList feeds={feeds} />
      )} */}
      Main page
    </div>
  );
};

export default Mainpage;