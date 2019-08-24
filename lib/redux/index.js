import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

// const configureStore = (initialState = {}) => {
//   const store = createStore(persistedReducer, initialState, applyMiddleware(thunk));

//   const persistor = persistStore(store);

//   return { store, persistor };
// };
const makeConfiguredStore = (storeReducer, initialState = {}) => {
  return createStore(storeReducer, initialState, applyMiddleware(thunk));
};

const makeStore = (initialState = {}, { isServer }) => {
  if (isServer) {
    return makeConfiguredStore(reducer, initialState);
  }
  //we need it only on client side
  const { persistStore, persistReducer } = require('redux-persist');
  // defaults to localStorage for web and AsyncStorage for react-native
  const storage = require('redux-persist/lib/storage').default;

  const persistConfig = {
    key: 'jike',
    storage
  };

  const persistedReducer = persistReducer(persistConfig, reducer);
  const store = makeConfiguredStore(persistedReducer, initialState);
  store.__persistor = persistStore(store); // Nasty hack
  return store;
};

export default makeStore;
// export default configureStore;

// export default function configureStore(initialState = {}) {
//   return createStore(reducer, initialState, applyMiddleware(thunk));
// }

// https://stackblitz.com/edit/redux-persist
