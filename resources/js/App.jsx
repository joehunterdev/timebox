import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/index";
import Header from "./Components/Layout/Header";
import BoxApp from "./Components/BoxApp";

const App = () => {
    return (
        <Provider store={store}>
            <Header />
            <BoxApp />
        </Provider>
    );
};
const root = document.getElementById("root");
ReactDOM.createRoot(root).render(<App />);
