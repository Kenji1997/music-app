
import React from "react";
import * as FontAwesome from 'react-icons/lib/fa';
import SCStream from '../SC/controlSC';
// import SC from '../SC/sc';
// import chooseTrack from '../SC/sendRequest';

class SearchInput extends React.Component {
	constructor(props){
		super(props);

		this.typingFunc = this.typingFunc.bind(this);
		this.createListTrack = this.createListTrack.bind(this);
		this.clickTrack = this.clickTrack.bind(this);
		this.pauseOrPlayFunc = this.pauseOrPlayFunc.bind(this);
		this.closeSearchInput = this.closeSearchInput.bind(this);
	}

	closeSearchInput(e){
		let searchResult = document.querySelector('.search-result')[0];
		console.log(searchResult);
		// if ( searchResult !== e.target && searchResult.contains(e.target) ) {
		// 	this.props.keySearch({ statusSearch : false });
		// }
	}

	typingFunc(e){
		if (e.target.value.length == 0) {
			this.props.keySearch({ statusSearch : false });
		} else {
			this.props.keySearch(
				{
					statusSearch: true,	
					isLoading: true
				}
			);

			// let self = this;
			var trackname = e.target.value;

			fetch('https://api.soundcloud.com/tracks/?q='+trackname+'/related&limit=100&format=json&client_id=ec8f5272bde9a225c71692a876603706')
			.then(res=>res.json())
			.then(function(rsTrack){
				let resultSearch = {
					isLoading : false,
					resultTracks : rsTrack
				};
				this.props.keySearch(resultSearch);
			}.bind(this));
		}
	}

	// eventListener
	onPlay(sound, t){
		sound.on("play-start play", function(){
			console.log('played');
			t.props.keySearch({
				track_duration : sound.getDuration(),
				statusTrack : "play"
			});
		});
	}

	onPause(sound, t){
		sound.on("pause", function(){
  			console.log("paused")
			t.props.keySearch({
				statusTrack : "pause"
			});
		});
	}

	onFinish(sound, t){
		sound.on("finish", function(){
	  		console.log("finished")
	  		t.props.keySearch({
				statusTrack : "finish"
			});
	  	});
	}

	swapTab(t){
		document.addEventListener("visibilitychange", function(){
			if (!document.hidden) {
				t.props.keySearch({
					track_currentTime : t.sound.currentTime()
				});
			}
		}, false);
	}

	pauseOrPlayFunc(sound){
		if (this.props.musicAppState.searchReducer.statusTrack === "play") {
	  		sound.pause();
	  	} else {
	  		sound.play();
	  	}
	}

	// click track
	async clickTrack(e){
		e.preventDefault();
		let track_id = e.target.getAttribute("track_id"),
			track_title = e.target.textContent,
			track_author_name = e.target.getAttribute("track_author_name"),
			track_author_avatar = e.target.getAttribute("track_author_avatar");
		
		// init state
		this.props.initState({initStatus : true});
		// pause sound
		if (this.sound) {
			this.sound.pause();
		}

		// load sound
		this.sound = await SCStream(track_id); // get sound tu SCcontro;
		// play
		this.sound.play();
		// add event listener
		this.onPlay(this.sound, this);
		this.onPause(this.sound, this);
		// this.onFinish(this.sound, this);
		this.swapTab(this);

		// pass state
		this.props.keySearch({
			statusSearch: false,
			isLoading: false,
			playing : {
				track_id : track_id,
				title : track_title,
				authorName : track_author_name,
				authorAvatar : track_author_avatar
			}
		});
		console.log('im playing');
	}

	componentWillReceiveProps(nextProps){
		// seek time khi co event click chuot vao progress bar
		if (this.sound
			&& nextProps.musicAppState.PlayViewReducer.seekTime !== null
			&& nextProps.musicAppState.PlayViewReducer.seekTime !== this.sound.currenttime
			){
			console.log('Da seek');
			this.sound.seek(nextProps.musicAppState.PlayViewReducer.seekTime);
			this.sound.currenttime = nextProps.musicAppState.PlayViewReducer.seekTime;
		}

		// statusPlay thay doi thi thay doi theo , ngoai tru truong hop finish track
		if (this.props.musicAppState.searchReducer.statusTrack 
			&& this.sound
			&& nextProps.musicAppState.PlayViewReducer.progress_status !== "finish"
			&& nextProps.musicAppState.PlayViewReducer.statusPlay !== this.props.musicAppState.searchReducer.statusTrack) {
			if (nextProps.musicAppState.PlayViewReducer.statusPlay === "play") {
				console.log('search input play track');
				this.sound.play();
			} else {
				this.sound.pause();
			}
		}

		// kich ban la 
		if (this.props.musicAppState.searchReducer.initStatus === true
			&& nextProps.musicAppState.PlayViewReducer.initStatus === true) {
				console.log('search input change initState');
			this.props.initState({initStatus : false});
		}
	}

	shouldComponentUpdate(nextProps, nextState){
		if ( nextProps.musicAppState.searchReducer.statusSearch !== this.props.musicAppState.searchReducer.statusSearch
		|| nextProps.musicAppState.searchReducer.isLoading !== this.props.musicAppState.searchReducer.isLoading ) {
			return true;
		}

		return false;
	}

	createListTrack(ele, index){
		let item = <li className="item" key={ index }>
			<a href={ ele.permalink_url } track_id={ ele.id } track_author_name={ ele.user.username } track_author_avatar={ ele.user.avatar_url } onClick={ this.clickTrack }>
				{ ele.title }
			</a>
		</li>

		return item;
	}

	renderResult(){
		
		if (this.props.musicAppState.searchReducer.statusSearch) {
			const classSearchResult = ['search-result-wrapper show'];
			
			if(this.props.musicAppState.searchReducer.isLoading) {
				classSearchResult.push('isLoading');

				return (
					<div className={classSearchResult.join(' ')}>
					</div>
				);
			} else {
				const listTrack = this.props.musicAppState.searchReducer.resultTracks.map( (ele, index)=>this.createListTrack(ele, index));
				
				return (
					<div className={ classSearchResult}>
						<ul className="search-result">
							{ listTrack }
						</ul>
					</div>
				);
			}			
		} else {
			return null;
		}
	}

	render(){
		console.log("search-input rendering");
		return (
			<div className="search-wrapper">
				<div className="search-form-wrapper">
					<form className="search-form-01">
						<input type="text" className="input-search-01" placeholder="Nhập từ khoá tìm kiếm ..." onChange={this.typingFunc} onFocus={this.typingFunc} onBlur={ this.closeSearchInput } />
						<button className="button-search-01">
							<FontAwesome.FaSearch />
						</button>
					</form>
				</div>
				{ this.renderResult() }
			</div>
		);
	}
}

export default SearchInput;