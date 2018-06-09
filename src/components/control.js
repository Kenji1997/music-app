import React from 'react';
import prev from '../assest/images/prev.png';
import next from '../assest/images/next.png';
import pause from '../assest/images/pause.png';
import play from '../assest/images/play.png';

class Control extends React.Component {
	constructor(props){
		super(props);

		this.statusText = "pause";
		this.pause_play_img = play;
		this.track_id = "";
		this.pauseFunc = this.pauseFunc.bind(this);
		this.nextFunc = this.nextFunc.bind(this);
		this.prevFunc = this.prevFunc.bind(this);
	}

	pauseFunc(){
		this.statusText = this.statusText === "pause"?"play":"pause";
		this.pause_play_img = this.pause_play_img === play?pause:play;
		this.props.controlClick(this.statusText);
		// this.statusText = nextProps.musicAppState.searchReducer.statusTrack;
		// this.pause_play_img = nextProps.musicAppState.searchReducer.statusTrack === "play"?pause:play;
	}

	nextFunc(){
		let statusText = "next";

		this.props.controlClick(statusText);
	}

	prevFunc(){
		let statusText = "prev";

		this.props.controlClick(statusText);
	}

	shouldComponentUpdate(nextProps, nextState){
		if (this.props.musicAppState.PlayViewReducer.statusPlay !== nextProps.musicAppState.PlayViewReducer.statusPlay) {
			return true
		}

		if (nextProps.musicAppState.PlayViewReducer.progress_status
			&& nextProps.musicAppState.PlayViewReducer.progress_status !== this.props.musicAppState.PlayViewReducer.progress_status) {
			return true
		}

		return false;
	}

	componentWillReceiveProps(nextProps){
		// support khi 
		if (this.track_id !== nextProps.musicAppState.searchReducer.playing.track_id
			&& nextProps.musicAppState.searchReducer.statusTrack
			&& nextProps.musicAppState.searchReducer.statusTrack !== nextProps.musicAppState.PlayViewReducer.statusPlay) {
			console.log('pauseFunc da thuc thi');
			this.pauseFunc();
			this.track_id = nextProps.musicAppState.searchReducer.playing.track_id;
		}

		if (nextProps.musicAppState.PlayViewReducer.progress_status
			&& nextProps.musicAppState.PlayViewReducer.progress_status !== this.props.musicAppState.PlayViewReducer.progress_status
			&& nextProps.musicAppState.PlayViewReducer.progress_status === "finish") {
			this.pauseFunc();	
		}

		if ( nextProps.musicAppState.searchReducer.initStatus !== null
			&& this.props.musicAppState.PlayViewReducer.initStatus !== nextProps.musicAppState.searchReducer.initStatus) {
			console.log('control initStated');
			this.props.initState({initStatus : nextProps.musicAppState.searchReducer.initStatus});
		}
	}

	render(){
		console.log("control Renderrrrr");
		return (
			<div className="control-main control-main-01">
				<div className="control-item">
					<img src={prev} alt="prev" id="prev_btn" onClick={this.prevFunc} />
				</div>

				<div className="control-item" >
					<img src={this.pause_play_img} alt={this.statusText} id="pause_or_play_btn" onClick={this.pauseFunc} />
				</div>

				<div className="control-item">
					<img src={next} alt="next" id="next_btn" onClick={this.nextFunc} />
				</div>
			</div>
		);
	}
}

export default Control;