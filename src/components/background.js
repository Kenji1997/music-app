import React from 'react';
import Wave from './Wave'

class Background extends React.Component{
	constructor(props){
		super(props);
		var vendors = ['ms', 'moz', 'webkit', 'o'];

		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {

		    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];

		    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] ||

		    window[vendors[x]+'CancelRequestAnimationFrame'];
		}

		this.drawFunc = this.drawFunc.bind(this);
	};

	initFunc(){
		this.myCanvas = document.querySelector('#Background-Canvas'),
			this.ctx = this.myCanvas.getContext('2d');
		this.ctx.globalCompositeOperation = "source-over";

		this.grd1=this.ctx.createLinearGradient(0,0,this.myCanvas.width/2,0);
		this.grd2=this.ctx.createLinearGradient(0,0,2*this.myCanvas.width/3,0);
		this.grd3=this.ctx.createLinearGradient(0,0,this.myCanvas.width/2,0);
		
		this.grd1.addColorStop(0,"#7f49a6");
		this.grd1.addColorStop(1,"#df4d7c");

		this.grd2.addColorStop(0,"#734297");
		this.grd2.addColorStop(1,"#c24472");

		this.grd3.addColorStop(0,"#563275");
		this.grd3.addColorStop(1,"#86315c");
		this.timeNow = this.timeExecute = new Date().getTime()
	};

	drawFunc(){
		this.timeNow = new Date().getTime();
		if (this.timeNow - this.timeExecute >=150) {
			this.ctx.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
			this.c.draw();
			this.b.draw();
			this.wave1.draw();
			this.timeExecute = this.timeNow;
		};
		window.requestAnimationFrame(this.drawFunc);
	}

	componentDidMount(){
		let t = new Promise((resolve, reject)=>{
			this.initFunc();
			this.wave1 = new Wave("1", 130, 35, 0.2, this.myCanvas, this.ctx, this.grd1);
			this.b = new Wave("2", 150, 40, 0.2, this.myCanvas, this.ctx, this.grd2);
			this.c = new Wave("3", 140, 35, 0.3, this.myCanvas, this.ctx, this.grd3);
			resolve();
		});

		t.then(()=>{
			this.drawFunc();
		})
	};

	shouldComponentUpdate(){
		return false;
	}

	render(){
		console.log('background rendering');
		return <canvas id="Background-Canvas" width="375" height="667" className="bg-01"></canvas>
	}
}

export default Background;