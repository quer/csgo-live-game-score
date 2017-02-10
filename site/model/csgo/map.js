var map = function (data) {
	this.mode = data.mode;
	this.name = data.name;
	this.phase = data.phase;
	this.round = data.round;
	this.score = {
		ct: data.team_ct.score,
		t: data.team_t.score
	}
	this.update = function (data) {
		if(this.mode != data.mode){

		};
		if(this.name != data.name){

		};
		if(this.phase != data.phase){

		};
		if(this.round != data.round){

		};
		if (this.score.ct !=  data.team_ct.score){

		};
		if (this.score.t !=  data.team_t.score){
		};
		this.mode = data.mode;
		this.name = data.name;
		this.phase = data.phase;
		this.round = data.round;
		this.score = {
			ct: data.team_ct.score,
			t: data.team_t.score
		}
	}
}