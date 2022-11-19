/* import { AnyAction, Reducer } from 'redux';
import { AppAction } from '../AppAction';

type HigherOrderState<S> = {
  content: S;
  actionCount: number;
};

function getInitialState<S>(reducer: Reducer<S, AnyAction>): S {
  return reducer(undefined, { type: undefined });
}

export function higherOrderReducer<S>(
  reducer: Reducer<S, AppAction>
): Reducer<HigherOrderState<S>, AppAction> {
  const initialState = {
    content: getInitialState(reducer),
    actionCount: 0,
  };
  return (state = initialState, action) => {
    return {
      content: reducer(state.content, action),
      actionCount: state.actionCount + 1,
    };
  };
}
*/

export {}