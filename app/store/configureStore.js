import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

import {localStorageMiddleWare} from 'app/functions';
import appReducer from 'app/reducers/appReducer';

let middleware = [thunkMiddleware, localStorageMiddleWare];
if(process.env.NODE_ENV !== 'production') {
    let logger = require('redux-logger');
    const loggerMiddleware = logger.createLogger();
    middleware = [...middleware, loggerMiddleware];
}

const configureStore = initialState => {
    return createStore(
        appReducer,
        initialState,
        applyMiddleware(...middleware)
    )
};

export default configureStore;
