import React from 'react';

class Progress extends React.Component{
	constructor(props){
		super(props);

		var vendors = ['ms', 'moz', 'webkit', 'o'];

		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {

		    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];

		    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] ||

		    window[vendors[x]+'CancelRequestAnimationFrame'];
		}

		this.event = {
			hover : false,
			x : null
		}

		this.curTimeText = "00:00";
		this.progressX_current = 0;

		//time setting
		this.curTimeTextX = 20;
		this.curTimeTextY = 20;
		this.durationTimeTextY = 20;
		this.timeColor = "#fff";

		//progress setting
		this.heightProgress = 15;
		this.progressX = 0;
		this.stepProgress = 500;
		this.progressColor = "#333";
		
		this.update = this.update.bind(this);
		this.pauseProgress = this.pauseProgress.bind(this);
		this.unpauseProgress = this.unpauseProgress.bind(this);
	}

	millisecondsToMin(mill){
		let arr = [];

		let hms = function(mill){
			return {
				hours : Math.floor(mill/(60*60*1000)),
				min : Math.floor((mill/60000)%60),
				sec : Math.floor((mill/1000)%60)
			}
		}(mill);

		if (hms.hours > 0) {
			arr.push(hms.hours)
		}
		arr.push( (hms.min < 10?"0"+hms.min:hms.min) );
		arr.push( (hms.sec <10? "0"+hms.sec:hms.sec) );
		return arr.join(":");
	}

	//drawFrame
	drawFunction(){
		//draw seek time
		if (this.event.hover && this.event.x) {
			this.ctx.beginPath();
			this.ctx.fillStyle = "rgba(51, 51, 51, 0.7)";
			this.ctx.fillRect(0, this.progressY, this.event.x, this.heightProgress);	
		}

		// draw progress
		this.progressX_current = (this.currentTime/this.duration)*this.width;
		this.ctx.beginPath();
		this.ctx.fillStyle = this.progressColor;
		this.ctx.fillRect(this.progressX, this.progressY, this.progressX_current, this.heightProgress);
		
		// console.log(this.progressX_current);
		// draw current time
		this.ctx.beginPath();
		this.ctx.textAlign="left";
		this.ctx.font="16px Verdana";
		this.ctx.fillStyle = this.timeColor;
		this.ctx.fillText(this.curTimeText, this.curTimeTextX, this.curTimeTextY);
		

		// draw duration time
		this.ctx.beginPath();
		this.ctx.textAlign="right";
		this.ctx.fillText(this.durationTimeText, this.durationTimeTextX, this.durationTimeTextY);
	}

	//update frame
	update(){
		// console.log(this.currentTime + "currentTime ddaay");
		let time_now = new Date().getTime();			
		if (time_now - this.last_time >=200) {
			this.ctx.clearRect(0, 0, this.width, this.height);
			this.currentTime+= 200;

			if (time_now - this.last_time2 >=1000) {
				this.currentTimeProgress += 1000;
				this.curTimeText = this.millisecondsToMin(this.currentTimeProgress);
				this.last_time2 = time_now;
			}

			this.drawFunction();
			this.last_time = time_now;
		}

		if (this.currentTimeProgress >= this.duration) {
			this.currentTimeProgress = this.duration;
			console.log('het bai hat');
			this.pauseProgress();
			this.props.progressStatus("finish");
		}

		if (this.RAF) {
			this.myAnimation = window.requestAnimationFrame(this.update);
		}
	}

	init(nextProps){
		if (nextProps.musicAppState.searchReducer.track_duration) {
			
			this.duration = nextProps.musicAppState.searchReducer.track_duration;
			this.durationTimeText = this.millisecondsToMin(this.duration);

			this.last_time2 = this.last_time = new Date().getTime();

			// set for new track		
			this.currentTime = 0;
			this.currentTimeProgress = 0;
			this.props.progressStatus("playing");
			this.RAF = true;
			this.update();
			
			// swap tab support
			document.addEventListener("visibilitychange", function(){
				if (!document.hidden && this.props.musicAppState.searchReducer.track_currentTime) {
					this.currentTimeProgress= this.currentTime = this.props.musicAppState.searchReducer.track_currentTime;

					console.log(this.currentTime + "day la currentTime");
					// self.timePlayed = new Date().getTime() - self.currentTime;
					// this.progressX_current = (this.currentTime/this.duration)*this.width
				}
			}.bind(this), false);
		}
	}

	pauseProgress(){
		// window.cancelAnimationFrame(this.myAnimation);
		this.RAF = false;
	}

	unpauseProgress(){
		this.RAF = true;
		this.update();
	}

	componentDidMount(){
		this.progressCanvas = document.getElementById('progress-bar-01');
		this.ctx = this.progressCanvas.getContext('2d');
		this.width = this.progressCanvas.width;
		this.height = this.progressCanvas.height;

		this.durationTimeTextX = this.width - 20;
		this.progressY = this.height - this.heightProgress;
	}

	componentWillReceiveProps(nextProps, nextState){
		if (nextProps.musicAppState.searchReducer.statusTrack 
			&& nextProps.musicAppState.searchReducer.playing.track_id !== this.track_id) {
			if (nextProps.musicAppState.searchReducer.statusTrack === "play") {
				this.init(nextProps);
				this.track_id = nextProps.musicAppState.searchReducer.playing.track_id;

			}
			// else if(nextProps.musicAppState.searchReducer.statusTrack === "finish"){
			// 	// this.currentTime = 0;
			// 	this.props.
			// 	this.pauseProgress();
			// 	console.log('da set currentTime');
			// }
		} else {
			if (nextProps.musicAppState.PlayViewReducer.statusPlay !== this.props.musicAppState.PlayViewReducer.statusPlay) {
				if (nextProps.musicAppState.PlayViewReducer.statusPlay === "play") {
					this.unpauseProgress();
				} else {
					this.pauseProgress();
				}
			}
		}

		if (true) {}

		if (nextProps.musicAppState.PlayViewReducer.initStatus === true) {
			this.track_id = null;
			this.init(nextProps);
		}
	}

	clickFunc(e){
		if (this.event.hover) {
			let time = (e.pageX/this.width)*this.duration;
			this.props.progressClick(time);
			
			// this.currentTime = time;
			this.currentTimeProgress = this.currentTime = time;
			
			this.progressX_current = (this.currentTime/this.duration)*this.width;
		}
	}

	leaveFunc(e){
		switch (e.type){
			case "mouseleave":
				console.log('mouseleave');
				this.event.hover = false;
				break;

			case "touchend":
				console.log('touch');
				this.event.hover = false;
				break;

			default:
				console.log('new event');
		}
	}

	moveFunc(e){
		switch (e.type){
			case "mousemove":
				// console.log('mousemove');
				this.event.x = e.pageX;
				this.event.hover = true;
				break;

			// case "touchmove":
			// 	console.log('touch');
			// 	this.event.hover = true;
			// 	break;

			default:
				console.log('new event');
		}
	}

	hoverFunc(e){
		switch (e.type){
			case "mouseenter":
				this.event.x = e.pageX;
				this.event.hover = true;
				break;

			// case "touchstart":
			// 	console.log('touch');
			// 	this.event.hover = true;
			// 	break;

			default:
				console.log('new event');
		}
	}

	shouldComponentUpdate(){
		return false;
	}

	render(){
		console.log('progress redering');
		return (
			<canvas id="progress-bar-01" width="375" height="50"
			 onTouchStart={this.hoverFunc.bind(this)}
			 onMouseEnter={this.hoverFunc.bind(this)}

			 onClick={this.clickFunc.bind(this)}
			 onTouchMove={this.moveFunc.bind(this)}
			 onMouseMove={this.moveFunc.bind(this)}
			 
			 onTouchEnd={this.leaveFunc.bind(this)}
			 onMouseLeave={this.leaveFunc.bind(this)}>
			 </canvas>
		)
	}
}

export default Progress;