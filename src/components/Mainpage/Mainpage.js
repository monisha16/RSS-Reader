import React,{useState, useEffect} from 'react';
import styles from './mainpage.module.scss';
import axios from "axios";
import { v4 as uuid } from 'uuid';
// s5mybzzw2gktjneccuxfnbs9yikyzd6eohm7d70k
const Mainpage = () => {
   const [completeFeed, setCompleteFeed] = useState({}); //complete data of the feeds
   const [feedList, setFeedList] = useState({}); //just the lit of names and urls
    const [ feedItems, setFeedItems] = useState({}); // new feed Item list

    useEffect(() => {
        const feedItemsInSessionStorage = sessionStorage.getItem('FeedList');
        if (feedItemsInSessionStorage) {
            setFeedList(JSON.parse(feedItemsInSessionStorage));
        }
        const feedDataInSessionStorage = sessionStorage.getItem('FeedData');
        if (feedDataInSessionStorage) {
            setCompleteFeed(JSON.parse(feedDataInSessionStorage));
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem('FeedData', JSON.stringify(completeFeed));
    }, [completeFeed]);
    
    useEffect(() => {
        console.log("feedList", feedList)
    }, [feedList]);

    // const { userFeeds } = useContext(FeedContext);
//   const [feeds, setFeeds] = useState([]);

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

    /**
    return
    {

    }
    */

  const getFeeds = async (url, index) => {
    const { data } = await axios.get(url);
    Object.keys(data).forEach(item=>{
        if(item=== 'items')
        {
            setFeedItems({});
            data[item].forEach(
                (content)=> {
                    let newItems = {};
                    newItems = { [uuid()]: content }
                    setFeedItems((data)=>{return {...data, newItems}});
            });
            console.log("insideIF", feedItems);
        }
    });
  };

  useEffect(() => {
    urlList.forEach((feedItem) =>
    {
        let newList = {};
        // getFeeds(feedItem.url);
        // console.log("feedContent", feedItems);
    })

    // urls.forEach((url, index) => getFeeds(url, index));
    // localStorage.setItem("userFeeds", JSON.stringify(userFeeds));
  }, [feedList]);

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