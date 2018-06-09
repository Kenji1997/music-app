import action from './action';

const musicAppState = {
	isLoading: true,
	playing : {
		title : "maps",
		authorAvatar : "https://unsplash.it/300/300",
		authorName : 'Maroon5'
	}
};

const searchReducer = (state = musicAppState, actions)=>{
	switch (actions.type){
		case action.keySearchAction:
			return {...state,...actions.resultSearch};
			break;

		case action.initStateAction:
			return {...musicAppState,...actions.initObj}
			break;

		default:
			return state;
	}
}

export default searchReducer;