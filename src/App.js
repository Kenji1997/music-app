import React, { Component } from 'react';
import Header from './components/header';
import Background from './components/background';
import PlayView from './containers/containerPlayView';
import store from './redux/store';
import { Provider } from 'react-redux';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.x = this.newX = 0;
    this.state = {
      classNameListTrack : "hide",
      listTrackIsEmpty : true
    }
  }

  onStartFunc(e){
    this.newX = 0;
    
    if (e.changedTouches[0].pageY > 73 ){
      // this.x = 0;
      this.x = e.changedTouches[0].pageX;
    };
  }

  // onMoveFunc(e){
  //  this.newX = e.changedTouches[0].pageX;
  //   console.log(this.newX); 
  // }

  onEndFunc(e){
   this.newX = e.changedTouches[0].pageX;

   if (!this.state.listTrackIsEmpty) {
    if (this.newX < this.x) {
      this.setState({ classNameListTrack : "hide" })
    } else if ( this.newX > this.x ) {
      this.setState({ classNameListTrack : "show" })
    }
   }
   console.log(this.x, this.newX);
   // this.x = 0;
   this.newX = 0;
  }

  handleShowClose(arr){
    this.setState({classNameListTrack: "show"});
    arr.length <= 0 ? this.setState({listTrackIsEmpty : true}): this.setState({listTrackIsEmpty : false});
  }

  render() {
    return (
      <div className="Dashboard-01"
        onTouchStart={this.onStartFunc.bind(this)}
        // onTouchMove={this.onMoveFunc.bind(this)}
        onTouchEnd={this.onEndFunc.bind(this)}
      >
        <Background />
          <Header getListTrackByChildState={this.handleShowClose.bind(this)} listTrackClass={this.state.classNameListTrack}/>

          <Provider store={store}>
          	<PlayView />
          </Provider>
      </div>
    );
  }
}

export default App;
