import PlayView from '../components/playview';
import action from '../redux/search/action';
import { connect } from 'react-redux';

const mapStateToProps = (state)=>({
	musicAppState : state
});

export default connect( mapStateToProps )( PlayView );