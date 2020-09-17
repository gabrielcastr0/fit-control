import {AsyncStorage} from 'react-native';
import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';

import Reducers from './reducers/index';

//criando persisterReducer
const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['userReducers'],
  },
  Reducers,
);

//criando store
const store = createStore(persistedReducer);

let persistor = persistStore(store);

export {store, persistor};
