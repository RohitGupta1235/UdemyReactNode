import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers"; // Assuming you have defined your reducers
import { thunk } from "redux-thunk"; // Assuming 'thunk' is a named export in redux-thunk

import App from "./components/App";

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

console.log("Stripe Key is :", process.env.REACT_APP_STRIPE_KEY);
console.log("Enviornment is ", process.env.NODE_ENV);
console.log("hey rohit is this working!!");
