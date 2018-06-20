import React, { Component } from 'react';

class TrackItem extends Component {
	render() {
		return (
			<div className="TrackItem ${this.props.className}">
				<div className="media-wrapper">	
					<img src={this.props.src} alt={this.props.author} />
				</div>

				<div className="textbox">
					<p> { this.props.title } </p>
					<p> { this.props.author } </p>
				</div>
			</div>
		)
	}
}

export default TrackItem;