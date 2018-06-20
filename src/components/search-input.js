import React from "react";
import * as FontAwesome from 'react-icons/lib/fa';
import SCStream from '../SC/controlSC';
import TrackItem from './trackItem';
// import data from '../db/connectMongo';

// import SC from '../SC/sc';
// import chooseTrack from '../SC/sendRequest';

class SearchInput extends React.Component {
	constructor(props){
		super(props);

		this.state={
			showTrack : false,
			listTrack : {},
			index : 0,
			offset : 10
		}

		this.textInput = React.createRef();
		this.ListTrackElement = React.createRef();

		this.typingFunc = this.typingFunc.bind(this);
		this.createListTrack = this.createListTrack.bind(this);
		this.clickTrack = this.clickTrack.bind(this);
		this.pauseOrPlayFunc = this.pauseOrPlayFunc.bind(this);
		this.closeSearchInput = this.closeSearchInput.bind(this);
		this.getList = this.getList.bind(this);
	}

	closeSearchInput(e){
		// let searchResult = document.querySelector('.search-result')[0];
		// console.log(searchResult);
		// if ( searchResult !== e.target && searchResult.contains(e.target) ) {
		// 	this.props.keySearch({ statusSearch : false });
		// }
	}

	typingFunc(e){
		if (e.target.value.length == 0) {
			this.setState({ statusSearch : false });
		} else {
			this.setState(
				{
					statusSearch: true,	
					isLoading: true
				}
			);

			// let self = this;
			var trackname = e.target.value;

			fetch('http://192.168.1.5:8080/search/'+ trackname)
			.then(res=>res.json())
			.then(function(parsedData){
				let resultSuggest = {
					// isLoading : false,
					result : parsedData
				};

				this.setState({
					resultSuggest : resultSuggest,
					isLoading: false
				 });
			}.bind(this));

			// fetch('https://api.soundcloud.com/tracks/?q='+trackname+'/related&limit=100&format=json&client_id=ec8f5272bde9a225c71692a876603706')
			// .then(res=>res.json())
			// .then(function(rsTrack){
			// 	let resultSearch = {
			// 		isLoading : false,
			// 		resultTracks : rsTrack
			// 	};
			// 	this.props.keySearch(resultSearch);
			// }.bind(this));
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

			let newIndex = parseInt(t.state.index) + 1;
			document.querySelector("div.mark[track_index='" + newIndex + "']").click();
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
		let ele = e.target.closest("div.mark");
		let track_id = ele.getAttribute("track_id"),
			track_author_name = ele.getAttribute("track_author_name"),
			track_title = ele.getAttribute("track_title"),
			track_index = ele.getAttribute("track_index"),
			track_author_avatar = ele.getAttribute("track_author_avatar");


		// get index cua track dang play
		this.setState({
			index : track_index
		})
		console.log(this.state.index);
		
		console.log(this.textInput.current)
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
		this.onFinish(this.sound, this);
		this.swapTab(this);

		// pass state
		this.props.keySearch({
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
			} else if (nextProps.musicAppState.PlayViewReducer.statusPlay === "next") {
				let newIndex = parseInt(this.state.index) + 1;
				document.querySelector("div.mark[track_index='" + newIndex + "']").click();
			} else if (nextProps.musicAppState.PlayViewReducer.statusPlay === "prev") {
				let newIndex = parseInt(this.state.index) - 1;
				document.querySelector("div.mark[track_index='" + newIndex + "']").click();
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

	scrollListTrack(){
		let e = this.ListTrackElement.current;
		console.log(e.scrollTop, e.clientHeight);
		let loadEle = e.childNodes[1];
		
		let top = loadEle.offsetTop;
		let he = loadEle.clientHeight;

		if (top + he + 15 - e.scrollTop - e.clientHeight === 0){// scroll xuong duoi cung
			console.log("ok");
			this.getList("", this.state.query);
		}; // 15px padding
	}

	shouldComponentUpdate(nextProps, nextState){
		if ( this.state.statusSearch && nextState.statusSearch !== this.state.statusSearch
		|| nextState.isLoading !== this.state.isLoading
		|| nextState.index !== this.state.index
		|| nextState.offset !== this.state.offset
		|| nextProps.listTrackClass !== this.props.listTrackClass) {
			return true;
		}

		return false;
	}

	getList(e, myQuery = ""){
		if (myQuery === "") {
		let query = e.target.textContent;

		fetch('https://api.soundcloud.com/tracks/?q='+query+'/related&limit=10&format=json&client_id=ec8f5272bde9a225c71692a876603706&offset=0')
			.then(res=>res.json())
			.then(function(rsTrack){
				let resultSearch = {
					resultTracks : rsTrack
				};

				// list track data
				// trigger show cac track
				this.setState({
					listTrack : resultSearch,
					showTrack : true,
					statusSearch: false,
					query : query
				});

				this.props.getListTrackByState(rsTrack)
				// this.props.keySearch(resultSearch);
			}.bind(this));

			console.log('im default');
		} else {
			// console.log(myQuery);
			fetch('https://api.soundcloud.com/tracks/?q='+myQuery+'/related&limit=10&format=json&client_id=ec8f5272bde9a225c71692a876603706&offset='+ this.state.offset)
			.then(res=>res.json())
			.then(function(rsTrack){
				let trackState = this.state.listTrack.resultTracks;

				// console.log(trackState);
				rsTrack.map(e=>{
					trackState.push(e);
				})

				console.log(trackState);

				let resultSearch = {
					resultTracks : trackState
				};

				let nextOffset = this.state.offset+10;

				console.log('im change', nextOffset);
				// list track data
				// trigger show cac track
				this.setState({
					offset : nextOffset,
					listTrack : resultSearch
				})

				this.props.getListTrackByState(rsTrack)
				// this.props.keySearch(resultSearch);
			}.bind(this));
		}
	}

	createListSuggest(ele, index){
		let item = <li className="item" key={ index }>
			<span className="suggestText" onClick={ this.getList }>
				{ ele.query }
			</span>
		</li>

		return item;
	}

	createListTrack(ele, index){
		let item = <li className="item" key={ index }>
			<div className="mark"
			track_index = { index }
			track_id={ ele.id }
			track_author_name={ ele.user.username } 
			track_author_avatar={ ele.user.avatar_url }
			track_title = {ele.title}
			onClick={ (e)=>{this.clickTrack(e)} }>
				<TrackItem author = { ele.user.username } title = { ele.title } src = { ele.user.avatar_url } />
			</div>
		</li>

		return item;
	}

	renderTracks(){
		if (this.state.showTrack) {
			const listTrack = this.state.listTrack.resultTracks.map( (ele, index)=>this.createListTrack(ele, index));
			console.log(listTrack);
			return <div className={ 'listTrack--wrapper ' +  ( this.props.listTrackClass|| "" )} ref={ this.ListTrackElement } onScroll = { this.scrollListTrack.bind(this) }>
				<ul>
					{ listTrack }
				</ul>

				<p className="load"></p>
			</div>
		} else {
			return null
		}

	}

	renderSuggest(){
		
		if (this.state.statusSearch) {
			const classSearchResult = ['search-result-wrapper show'];
			
			if(this.state.isLoading) {
				classSearchResult.push('isLoading');

				return (
					<div className={classSearchResult.join(' ')}>
					</div>
				);
			} else {
				console.log(this.state.renderSuggest);
				const listTrack = this.state.resultSuggest.result.map( (ele, index)=>this.createListSuggest(ele, index));
				
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
						<input type="text" className="input-search-01" placeholder="Nhập từ khoá tìm kiếm ..." ref={ this.textInput } onChange={this.typingFunc} onFocus={this.typingFunc} onBlur={ this.closeSearchInput } />
						<button className="button-search-01">
							<FontAwesome.FaSearch />
						</button>
					</form>
				</div>
				{ this.renderSuggest() }
				{ this.renderTracks() }
			</div>
		);
	}
}

export default SearchInput;