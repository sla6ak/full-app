import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "components/App/App";
import "../node_modules/modern-normalize/modern-normalize.css";
import { BrowserRouter } from "react-router-dom"; // это маршрутизатор для обработки js страниц
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter basename="/">
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
// basename="/goit-react-hw-08-phonebook/" всегда со слешами с обеих сторон!
