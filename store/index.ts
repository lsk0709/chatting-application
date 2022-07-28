import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const logger = createLogger({
  collapsed: true
});

const middleware = [logger];
const enhancer =
  process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middleware))
    : compose(applyMiddleware(...middleware))
    // : composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(rootReducer, enhancer);


export default store;


