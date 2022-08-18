
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter } from "react-router-dom";

// core styles
import "./scss/volt.scss";
import "./App.css"

// vendor styles
import "react-datetime/css/react-datetime.css";

import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";

if(module.hot && process.env.NODE_ENV !== 'production'){
  module.hot.accept();
}

ReactDOM.render(
    <React.StrictMode>
  <BrowserRouter>
    <ScrollToTop />
    <HomePage />
  </BrowserRouter>
 </React.StrictMode> 
  ,
  document.getElementById("root")
);
