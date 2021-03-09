import React from "react";
import indexRoutes from "./routes/";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./redux/store";
import { Worker } from "@react-pdf-viewer/core";

import "react-table/react-table.css";
import "react-phone-number-input/style.css";
import "react-flags-select/css/react-flags-select.css";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/print/lib/styles/index.css";
import "./assets/main.css";

const App = () => (
  <Provider store={configureStore()}> 
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js"> 
      <Router basename="/">
        <Switch>
          {indexRoutes.map((prop, key) => {
            return <Route path={prop.path} key={key} component={prop.component} />;
          })}
        </Switch>
      </Router>
    </Worker>
  </Provider>
);

export default App;
