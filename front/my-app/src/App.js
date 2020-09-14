import React from 'react';
import logo from './logo.svg';
import './App.css';
import {HashRouter as Router, Link, Route} from 'react-router-dom'
import VertifactionComponent from './vertifactionPage/vertifaction.js'
import HomeComponent from './homePage/home.js'

function App() {
  return (
    <div id="outer">
      <Router id="inner">
        <Route path="/vertifaction" component={VertifactionComponent}/>
        <Route path="/home" component={HomeComponent}/>
      </Router>
    </div>
  );
}

export default App;
