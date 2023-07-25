import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { App } from "./App";
import { Provider } from "react-redux";
import store from "./infrastructure/redux/store";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
