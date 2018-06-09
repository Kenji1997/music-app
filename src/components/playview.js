import React from 'react';
import loop from '../assest/images/replay.png';
import Control from '../containers/containerControlButton';
import Progress from '../containers/containerProgress';
import store from '../redux/store';
import { Provider } from 'react-redux';

class PlayView extends React.Component {
	constructor(props){
		super(props);

		this.min = "00";
		this.sec = "00";
	}
	
	render(){
		var title = this.props.musicAppState.searchReducer.playing.title,
			avatar = this.props.musicAppState.searchReducer.playing.authorAvatar,
			name = this.props.musicAppState.searchReducer.playing.authorName;
		return ( 
			<div className="play-view">
				<div className="play-view__image-wrapper">
					<div className="play-view__image">
						<img src={ avatar } alt={ name } className="image" />
					</div>
				</div>

				<div className="textbox-01 play-view__information">
					<p className="textbox__title"> { title } </p>
					<p className="textbox__subtitle">{ name }</p>
				</div>

				<div className="play-view__control">
					<div className="progress-bar">
						<Provider store={store}>
							<Progress/>
						</Provider>
					</div>

					<div className="control-main-wrapper">
						<Provider store={ store }>
							<Control styleName="control-01"/>
						</Provider>

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