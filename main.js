class Chess{
	constructor(){
		this.chessboard= []
		this.type={
			black:1,
			white:-1,
			blank:0,
		}
		this.pin=this.type.black;
		this.count=0
		
		for(let i=0;i<19;i++){
			this.chessboard.push([])
			for(let j=0;j<19;j++){
				this.chessboard[i].push(this.type.blank)
			}
		}
	}
	putChess(pos){
		if(this.chessboard[pos.x][pos.y]!=this.type.blank)
			return {ans:false}
		this.pin=this.getColor()
		this.chessboard[pos.x][pos.y]=this.pin;
		this.count++
		this.check()
		return {ans:true,color:this.pin}
	}
	getColor(){
		if((this.count+1)%2==0){
			return this.pin*-1
		}
		else{
			return this.pin
		}
	}
	CheckPoint(i,j,assets){
		if(this.chessboard[i][j]!=this.type.blank){
			if(this.chessboard[i][j]==assets.pin){
				assets.length++;
				if(assets.length>=5){
					if(assets.pin==this.type.white){
						alert("白棋胜")
					}
					else{
						alert("黑棋胜")
					}
					
				}
			}
			else{
				assets.length=0;
				assets.pin=this.chessboard[i][j];
			}
		}
		else{
			assets.length=0;
			assets.pin=this.type.blank;
		}
	}
	check(){
		for(let i=0;i<19;i++){
			let assetsLine={length:0,pin:this.type.blank}
			let assetsRow={length:0,pin:this.type.blank}
			for(let j=0;j<19;j++){
				this.CheckPoint(i,j,assetsLine);
				this.CheckPoint(j,i,assetsRow);
			}
		}
		for(let i=5;i<19;i++){
			let assetsLT_RB={length:0,pin:this.type.blank}
			let assetsRB_LT={length:0,pin:this.type.blank}
			let assetsLB_RT={length:0,pin:this.type.blank}
			let assetsRT_LB={length:0,pin:this.type.blank}
			for(let x=i,y=0;x>=0;x--,y++){
				if(i<18){
					this.CheckPoint(x,y,assetsLT_RB);
					this.CheckPoint(y,18-x,assetsLB_RT);
				}
				this.CheckPoint(18-y,18-x,assetsRB_LT);
				this.CheckPoint(18-x,y,assetsRT_LB);
			}
		}
	}




	checkPos(pos){
		if(this.chessboard[pos.x][pos.y]==this.type.blank){
			return true;
		}
		else{
			return false;
		}
	}
}