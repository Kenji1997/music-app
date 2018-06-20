import React, { Component } from 'react';
import SearchInput from '../containers/containerSearchInput';
import store from '../redux/store';
import { Provider } from 'react-redux';

class Header extends Component {
	getListTrackByChildStateFunc(arr){
		this.props.getListTrackByChildState(arr);
	}

	render(){
		return (
			<div className="Header--01">
				<div className="Header__content">
					<Provider store={store}>
						<SearchInput listTrackClass={this.props.listTrackClass} getListTrackByState={this.getListTrackByChildStateFunc.bind(this)} />
					</Provider>
				</div>
			</div>
		);
	}
}

export default Header;