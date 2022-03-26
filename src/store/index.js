import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import FeedReducer from './reducers/feedReducer';

const rootReducers = combineReducers({
    feedReducer: FeedReducer,
})
let store = createStore(rootReducers, applyMiddleware(thunk));
export default store;