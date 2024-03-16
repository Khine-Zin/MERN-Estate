import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux"
import {store , persistor} from "./assets/redux/store.js";
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
   <GoogleOAuthProvider clientId='959727688562-ai86ccjkqtnaob64s15c5tud8rvmuqf9.apps.googleusercontent.com'>
   <App />
   </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
)
