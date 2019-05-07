import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import './App.css';

import Navbar from "./component/layout/Navbar"
import Landing from "./component/layout/Landin"

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar/>
      <Route exact path="/" component={Landing}/>
    </div>
    </Router>
  );
}

export default App;
