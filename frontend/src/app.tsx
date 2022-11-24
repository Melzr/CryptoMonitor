import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "./state";
import { Router } from "./router/router";

export const App = () => {
  return (
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID ?? ""}
    >
      <Provider store={store}>
        <Router />
      </Provider>
    </GoogleOAuthProvider>
  );
};
