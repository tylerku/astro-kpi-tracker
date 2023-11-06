import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { AuthReducer, CounterReducer } from './redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(
  persistConfig, 
  combineReducers({
    counter: CounterReducer,
    auth: AuthReducer
  })
)


const store = configureStore({ reducer: persistedReducer })
let persistor = persistStore(store)
export { store, persistor }

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch