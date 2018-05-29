import React from 'react';
import loop from '../assest/images/replay.png';
import Control from './control';
import result from '../SC/sc';

class PlayView extends React.Component {
	constructor(props){
		super(props);
		console.log(result);
	}
	
	render(){
		return ( 
			<div className="play-view">
				<div className="play-view__image-wrapper">
					<div className="play-view__image">
						<img src="https://unsplash.it/300/300" alt="" className="image" />
					</div>
				</div>

				<div className="textbox-01 play-view__information">
					<p className="textbox__title"> Some things just like this </p>
					<p className="textbox__subtitle">COLD</p>
				</div>

				<div className="play-view__control">
					<div className="progress-bar">
						<div className="progress-bar__time">
							<span className="time">01:28</span>
							<span className="time">03:28</span>
						</div>

						<div className="progress-bar__line"></div>
					</div>

					<div className="control-main-wrapper">
						<Control styleName="control-01"/>

						<div className="loop-button">
							<img src={loop} alt="loop" />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default PlayView;