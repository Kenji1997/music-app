import React, { Component } from 'react';
import * as FontAwesome from 'react-icons/lib/fa'

class Header extends Component {
	render(){
		return (
			<div className="Header--01">
				<div className="Header__content">
					<span className="logo">
						<FontAwesome.FaBars />
					</span>

					<span className="button--01" onclick={this.props.search}>
						<FontAwesome.FaSearch />
					</span>					
				</div>
			</div>
		);
	}
}

export default Header;