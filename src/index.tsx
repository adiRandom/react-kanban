/**
 * Created by Adrian Pascu at 11-Sep-20
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import {createStore} from "redux";
import ROOT_REDUCER from "./reducers/RootReducer";

const STORE = createStore(ROOT_REDUCER)

ReactDOM.render(
    <React.StrictMode>
        <Provider store={STORE}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
