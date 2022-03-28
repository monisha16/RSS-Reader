import { FEED_DATA, FEED_LIST } from '../actionTypes';

// export const update_feedList = (data) => (dispatch) => {
//     dispatch({
//         type: FEED_LIST,
//         payload: data
//     })
// }

// export const update_feedData = (data) => (dispatch) => {
//     dispatch({
//         type: FEED_DATA,
//         payload: data
//     })
// }
export const update_feedList = (data) => {
    // console.log("inside Action feedList")
    return {
        type: FEED_LIST,
        payload: data
    }
}

export const update_feedData = (data) => {
    return {
        type: FEED_DATA,
        payload: data,
    }
}