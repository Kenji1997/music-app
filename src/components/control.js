import React from 'react';
import prev from '../assest/images/prev.png';
import next from '../assest/images/next.png';
import pause from '../assest/images/pause.png';
import play from '../assest/images/play.png';

class Control extends React.Component {
	render(){
		return (
			<div className="control-main control-main-01">
				<div className="control-item">
					<img src={prev} alt="prev"/>
				</div>

				<div className="control-item" >
					<img src={pause} alt="pause"/>
				</div>

				<div className="control-item">
					<img src={next} alt="next"/>
				</div>
			</div>
		);
	}
}

export default Control;