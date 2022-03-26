import styles from './mainpage.module.scss';
import axios from "axios";
import { v4 as uuid } from 'uuid';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { update_feedList, update_feedData } from '../../store/actions/feedAction';

const SampleMainPage = () => {
    //const apiKey = process.env.REACT_APP_API_KEY;
    const apiKey = "s5mybzzw2gktjneccuxfnbs9yikyzd6eohm7d70k";
    const [feedList, setFeedList] = useState({});
    let urlList;
    const { feedListInRedux } = useSelector((state) => {
        const states = {
            feedListInRedux: state?.feedReducer?.feedList,
        }
        return states;
    });

    // Array of { id: mainFeedId, url: feed's URL(RSS -> JSON)}
    // const urlList = Object.keys(feedList).length === 0 ? 
    // Object.keys(feedList).map(id => {
    //     return {
    //         id: id,
    //         name: feedList[id].name,
    //         url: `https://api.rss2json.com/v1/api.json?rss_url=${feedList[id].url}&api_key=${apiKey}&count=5`
    //     }
    // }) :
    // Object.keys(feedListInRedux).map(id => {
    //     return {
    //         id: id,
    //         name: feedListInRedux[id].name,
    //         url: `https://api.rss2json.com/v1/api.json?rss_url=${feedListInRedux[id].url}&api_key=${apiKey}&count=5`
    //     }
    // });

    const getFeeds = async (feedItem) => {
        const { data } = await axios.get(feedItem.url);
        Object.keys(data).forEach(item => {
            if (item === 'items') {
                console.log("item - data[item", item, data[item])
                data[item].forEach(
                    (content) => {
                        console.log("Content: ", content)
                        // setFeedItems((data) => { return { ...data, [uuid()]: content } });
                    });
            }
        });
        let newList = {};
        // newList = feedItems;
        // console.log("feedItems", feedItems)
        // setCompleteFeed((data) => { return { ...data, [feedItem.id]: newList } });
    };

    useEffect(() => {
        urlList && urlList.forEach((feedItem) => {
            getFeeds(feedItem); //iterating through urlList {id,name, view}
        });
        console.log("urlList", urlList)
        console.log(feedList);
    }, [feedList]);

    useEffect(()=>{

        let feedListInSessionStorage = sessionStorage.getItem('FeedList');
        console.log("feedList in session: ", JSON.parse(feedListInSessionStorage));
        Object.keys(feedList).length === 0 ? 
            urlList = Object.keys(feedList).map(id => {
                return {
                    id: id,
                    name: feedList[id].name,
                    url: `https://api.rss2json.com/v1/api.json?rss_url=${feedList[id].url}&api_key=${apiKey}&count=5`
                }
            })
            
        :
            urlList = Object.keys(feedListInRedux).map(id => {
                return {
                    id: id,
                    name: feedListInRedux[id].name,
                    url: `https://api.rss2json.com/v1/api.json?rss_url=${feedListInRedux[id].url}&api_key=${apiKey}&count=5`
                }
            });
        Object.keys(feedList).length === 0 ? 
            setFeedList(JSON.parse(feedListInSessionStorage)) : setFeedList(feedListInRedux);
    },[]);

    // useEffect(()=>{
    //     urlList.forEach((feedItem) => {
    //         getFeeds(feedItem); //iterating through urlList {id,name, view}
    //     });
    //     console.log("urlList", urlList)
    //     console.log(feedList);
    // },[feedListInRedux])


    return (
        <div>
            Helllo SampleMainPage
        </div>
    );
};

export default SampleMainPage;