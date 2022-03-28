import { FEED_DATA, FEED_LIST, BOOKMARK_DATA } from '../actionTypes';

const initialState = {
    // feedList: sessionStorage.getItem('FeedList') ? sessionStorage.getItem('FeedList') : {},
    // feedData: sessionStorage.getItem('FeedData') ? sessionStorage.getItem('FeedData') : {},
    // bookmarkData: localStorage.getItem('Bookmark') ? localStorage.getItem('Bookmark') : {},
    feedList:  {},
    feedData:{},
    bookmarkData:{},
};

const FeedReducer = (state = initialState, action) => {
    switch (action.type) {
        case FEED_LIST:
            // console.log("setting feedList..")
            sessionStorage.setItem('FeedList', JSON.stringify(action.payload));
            return {
                ...state,
                feedList: action.payload
            };
        case FEED_DATA:
            // console.log("setting complete FeedData..")
            sessionStorage.setItem('FeedData', JSON.stringify(action.payload));
            return {
                ...state,
                feedData: action.payload
            };
        case BOOKMARK_DATA:
            // console.log("setting bookmarkData..")
            return {
                ...state,
                bookmarkData: action.payload
            };
        default: return state;
    }
};

export default FeedReducer;