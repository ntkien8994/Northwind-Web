import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ConfigProvider } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import { createStore,applyMiddleware,combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
//reducers
import { layouts } from './reducers/layoutReducer';
import {customers} from './reducers/customerReducer';
//end reducers

//sagas
import rootSaga from './sagas';
//end sagas

let sagaMiddleware = createSagaMiddleware();
let reducers= combineReducers({layouts,customers});
let store = createStore(reducers,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
ReactDOM.render(
  <React.StrictMode>

    <ConfigProvider locale={viVN}>
      <Provider store={store} >
        <App />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
