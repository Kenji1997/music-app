import { connect } from 'react-redux';
import action from '../redux/search/action';
import SearchInput from '../components/search-input';

const mapStateToProps = (state)=>({
	musicAppState : state
});

const mapDispacthToProps = (dispacth)=>{
	return {
		keySearch(resultSearch){
			dispacth(action.keySearch(resultSearch));
		},

		initState(initObj){
			dispacth(action.initState(initObj));
		}
	}
}

export default connect(mapStateToProps, mapDispacthToProps)(SearchInput);
