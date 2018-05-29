const action = {
	clickName : 'click button search',

	clickBtn : (className)=>{
		type : clickName,
		className
	}
}

export default action;