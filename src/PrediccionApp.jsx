import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { AppRouter } from "./routes/AppRouter";
import { store } from "./store/store";

export const PrediccionApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
};
