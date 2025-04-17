import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from "react-router";
import { AppRouter } from "./routes/AppRouter";

export const PrediccionApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
};
