import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import Reducers from './reducers/index';

//criando persisterReducer
const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['userReducer'],
  },
  Reducers,
);

//criando store
const store = createStore(persistedReducer);

let persistor = persistStore(store);

export {store, persistor};
