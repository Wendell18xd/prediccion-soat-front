import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { AppRouter } from "./routes/AppRouter";
import { store } from "./store/store";
import { AuthProvider } from "./context/AuthProvider";

export const PrediccionApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
};
