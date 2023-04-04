import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import ReactDOM from 'react-dom';

import Dashboard from "./Dashboard/Dashboard";

//function
export default function route() {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}
