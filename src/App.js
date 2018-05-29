import React, { Component } from 'react';
import Header from './components/header';
import PlayView from './components/playview';
import Background from './components/background';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="Dashboard-01">
        <Background />
          <Header/>
          <PlayView />
      </div>
    );
  }
}

export default App;
