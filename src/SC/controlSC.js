import SC from "./sc";

function SCStream(track_id){
	console.log(typeof(SC.stream('tracks/'+track_id)));
	return new Promise(resolve=>{
		let t = SC.stream('tracks/'+track_id)
		resolve(t);
	});
}

// console.log(SCStream())

export default SCStream;