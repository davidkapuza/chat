import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userFriendsReducer from './slices/user-friends-slice';
import userReducer from "./slices/user-slice"
import chatReduer from '@/modules/chat/chat-slice'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({ 
  userFriends: userFriendsReducer,
  user: userReducer,
  chat: chatReduer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
  devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)