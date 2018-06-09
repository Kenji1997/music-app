import actions from './action';
const defaultState = {
	statusPlay : "pause"
}
const PlayViewReducer = (state = defaultState, action)=>{
	switch (action.type){
		case actions.action_control_click:
			return {...state, ...{ statusPlay : action.statusText }}
			break;

		case actions.action_progress_seek:
			return {...state,...{seekTime : action.time}}
			break;

		case actions.action_progress_status:
			return {...state,...{ progress_status : action.status }}
			break;

		case actions.initStateAction:
			return {...defaultState,...action.initObj }
			break;

		default:
			return state;
	}
}

export default PlayViewReducer;