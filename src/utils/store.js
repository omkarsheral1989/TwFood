import { createStore} from 'redux';

import reducers from '../reducers';

//const createStoreWithMiddleware = applyMiddleware()(createStore);
//const store = createStoreWithMiddleware(reducers);

const store = createStore(
    reducers,
    undefined,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;