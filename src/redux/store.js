import { createStore, applyMiddleware ,compose} from 'redux';
// import { createLogger } from 'redux-logger';
import reducers from './reducers';
// import logger from './logger-middleware';
// const logger = createLogger(); 
import logger from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware';
export function configureStore(initialState) {

    const middlewares = [promiseMiddleware,logger];

    const store = createStore(
        reducers,
        initialState,
        applyMiddleware(...middlewares)
    );

    return store;
}
