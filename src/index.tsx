/**
 * Created by Adrian Pascu at 11-Sep-20
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from "redux";
import {initializeApp, firestore} from 'firebase'
import ROOT_REDUCER from "./reducers/RootReducer";
import ReactKanbanApi from "./api/ReactKanbanApi";
import thunk from 'redux-thunk'


const STORE = createStore(ROOT_REDUCER,applyMiddleware(thunk))
initializeApp(JSON.parse(process.env["REACT_APP_FIREBASE_CONFIG"] as string))
//Init the API
ReactKanbanApi.getInstance(firestore())

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
