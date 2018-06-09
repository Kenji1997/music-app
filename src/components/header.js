import React, { Component } from 'react';
import SearchInput from '../containers/containerSearchInput';
import store from '../redux/store';
import { Provider } from 'react-redux';

class Header extends Component {
	render(){
		return (
			<div className="Header--01">
				<div className="Header__content">
					<Provider store={store}>
						<SearchInput />
					</Provider>
				</div>
			</div>
		);
	}
}

export default Header;