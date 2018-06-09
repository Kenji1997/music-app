import Progress from '../components/progress';
import actions from '../redux/PlayView/action';
import { connect } from 'react-redux';

const mapStateToProps = (state)=>({
	musicAppState : state
});

const mapDispacthToProps = (dispacth)=>{
	return {
		progressClick(time){
			console.log(time);
			dispacth(actions.progressClick(time));
		},

		progressStatus(status){
			dispacth(actions.progressStatus(status));
		}
	}
}

export default connect(mapStateToProps, mapDispacthToProps)(Progress);