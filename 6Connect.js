class Connect{
	constructor(draw,chess) {
		this.draw=draw;
		this.chess=chess;
		this.color={
			"1":"#000000",
			"-1":"#ffffff"
		}
		let that=this;
      	draw.canvas.addEventListener('mousemove', function (evt) {
      		that.Check(evt)
      	}, false);
      	draw.canvas.addEventListener('click', function (evt) {
      		that.Put(evt)
      	}, false);
	}
	
	Check(evt){
		let Ans=this.Onboard(evt);
		if(Ans.ans){
			if(Ans.x==this.draw.lastChess.x&&Ans.y==this.draw.lastChess.y){
				return
			}
			if(!this.chess.checkPos(Ans)) return
			this.draw.WriteText(Ans.x+","+Ans.y)
			let tempColor=this.color[""+this.chess.getColor()]
			this.draw.tempChess(tempColor,Ans)
		}
	}
	Put(evt){
		let Ans=this.Onboard(evt);
		if(Ans.ans){
			console.log(Ans)
			let Ans2=this.chess.putChess(Ans)
			if(Ans2.ans){
				this.draw.drawChess(this.color[""+Ans2.color],Ans)
				// if(this.draw.lastChess[0]==Ans.x&&this.draw.lastChess[1]==Ans.y){
				// 	this.draw.lastChess=[]
				// }
			}
		}
	}
	Onboard(evt){
		var pos = [evt.clientX,evt.clientY]
		let xp=Math.floor((pos[0]-this.draw.left+(this.draw.BlockWidth/2))/this.draw.BlockWidth)
		let yp=Math.floor((pos[1]-this.draw.top+(this.draw.BlockWidth/2))/this.draw.BlockWidth)
		if(xp<19&&xp>-1&&yp<19&&yp>-1){
			return {ans:true,x:xp,y:yp}
		}
		else{
			return {ans:false}
		}
	}
}