import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

//relative imports

import Home from "./containers/Home";
import store from "./store";
import "./stylesheets/style.scss";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <Home />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
