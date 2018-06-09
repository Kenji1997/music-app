import Control from '../components/control';
import actions from '../redux/PlayView/action';
import { connect } from 'react-redux';

const mapStateToProps = (state)=>({
	musicAppState : state
})

const mapDispacthToProps = (dispacth)=>{
	return {
		controlClick(statusText){
			dispacth(actions.controlClick(statusText));
		},

		initState(initObj){
			console.log(initObj);
			dispacth(actions.initState(initObj));
		}
	}
}

export default connect(mapStateToProps, mapDispacthToProps)(Control);