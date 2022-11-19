import { createStore } from 'redux';

import { rootReducer } from './reducers';
export type { AppAction } from './AppAction';

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>; 

