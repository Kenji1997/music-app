const action = {
	keySearchAction : "searchAction",
	initStateAction : " initState action",

	keySearch(resultSearch){
		return {
			type : action.keySearchAction,
			resultSearch
		}
	},

	initState(initObj){
		return {
			type : action.initStateAction,
			initObj
		}
	}
}

export default action;