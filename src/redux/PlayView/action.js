const actions = {
	action_control_click: "controlClick",
	action_progress_seek: "seek track",
	action_progress_status : "get status progress",
	initStateAction : "init State",

	controlClick( statusText ){
		return {
			type: actions.action_control_click,
			statusText
		}
	},

	initState(initObj){
		return {
			type : actions.initStateAction,
			initObj
		}
	},

	progressClick(time){
		return {
			type : actions.action_progress_seek,
			time
		}
	},

	progressStatus(status){
		return {
			type: actions.action_progress_status,
			status
		}
	}
}

export default actions;