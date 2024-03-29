import { configureStore, combineReducers } from '@reduxjs/toolkit'
import walletReducer from './reducers/walletReducer';
import rulesReducer from './reducers/rulesReducer';
import authReducer from './reducers/authReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import variablesReducer from './reducers/variablesReducer';
export type { AppAction } from './AppAction';


export const rootReducer = combineReducers({
    wallet: walletReducer,
    rules: rulesReducer,
    auth: authReducer,
    variables: variablesReducer
  });
  

export const store = configureStore({
    reducer : rootReducer
  });

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
