import { FEED_DATA, FEED_LIST } from '../actionTypes';

const initialState = {
    feedList: {},
    feedData : {}
};

const FeedReducer = (state = initialState, action) => {
    switch (action.type) {
        case FEED_LIST:
            console.log("setting feedList..")
            return {
                ...state,
                feedList: action.payload
            };
        case FEED_DATA:
            console.log("setting complete FeedData..")
            return {
                ...state,
                feedData: action.payload
            };
        default: return state;
    }
};

export default FeedReducer;