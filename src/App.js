import React, { Component } from 'react';
import Header from './components/header';
import Background from './components/background';
import PlayView from './containers/containerPlayView';
import store from './redux/store';
import { Provider } from 'react-redux';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="Dashboard-01">
        <Background />
          <Header/>
          
          <Provider store={store}>
          	<PlayView />
          </Provider>
      </div>
    );
  }
}

export default App;
