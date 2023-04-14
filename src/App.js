import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routerPaths } from "./routerPaths";
import { Signin } from "./components/pages/Signin/Signin";
import { Homepage } from "./components/pages/Homepage/Homepage";
import { Results } from "./components/pages/Results/Results";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={routerPaths.signin} element={<Signin />} />
          <Route path={routerPaths.home} element={<Homepage />} />
          <Route path={routerPaths.results} element={<Results />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
