import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import userReducer from "./slices/user-slice"
import chatReduer from '@/modules/chat/chat-slice'

const persistConfig = {
  key: 'root',
  blacklist: ["user"],
  storage,
}

const rootReducer = combineReducers({ 
  user: userReducer,
  chat: chatReduer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export const persistor = persistStore(store)