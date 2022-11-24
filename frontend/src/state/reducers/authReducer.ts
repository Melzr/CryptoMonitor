import { AnyAction, Reducer } from "redux";

export type AuthState = {
  token: string | null;
  role: 'ADMIN' | 'USER';
}

const initialState: AuthState = {
  token: null,
  role: 'USER'
}

const authReducer: Reducer<AuthState, AnyAction> = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case "LOGIN":
      return { token: action.payload.token, role: action.payload.role };
    case "LOGOUT":
      return { token: null, role: 'USER' };
    default:
      return state;
  }
}

export default authReducer;