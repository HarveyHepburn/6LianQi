class Draw{
	constructor(canvas,chess) {
		this.xy = this.GetWandH();
		canvas.width=this.xy[0]
		canvas.height=this.xy[1]
		this.chess=chess;
		this.ctx = canvas.getContext("2d");
		this.left=0;
		this.top=0;
		this.bgColor="#4db6ac"
		this.BlockWidth=44;
		this.panWidth=this.BlockWidth*18;
		this.right=0;
		this.bottom=0;
		this.backgroundInit();
		this.canvas=canvas;
		this.lastChess=false
	}
	backgroundInit(){
		this.ctx.fillStyle = this.bgColor;
		this.ctx.fillRect(0,0,this.xy[0],this.xy[1]);
		this.ctx.strokeStyle = '#e0f2f1';
		let BlockWidth=this.BlockWidth;
		let BlockHeight=BlockWidth;
		let panWidth=this.panWidth
		let h0=(this.xy[1]-panWidth)/2
		let h1=h0+panWidth
		let l0=(this.xy[0]-panWidth)/2
		this.top=h0;
		this.left=l0;
		this.right=this.left+this.panWidth
		this.bottom=this.top+this.panWidth
		this.panWidth=panWidth;
		for(this.line=0;this.line<19;this.line++){
			this.drawLine(this.line*BlockHeight+l0,h0,this.line*BlockHeight+l0,h1)
		}
		let j=0;
		for(this.row=0;this.row<19;this.row++){
			this.drawLine(l0,this.row*BlockWidth+h0,this.xy[0]-l0,this.row*BlockWidth+h0)
		}
	}
	drawLine(x,y,x1,y1){
		this.ctx.beginPath();
		this.ctx.moveTo(x,y);
		this.ctx.lineTo(x1,y1);
		this.ctx.stroke();
	}
	GetWandH(){
		var w = window,
	    d = document,
	    e = d.documentElement,
	    g = d.getElementsByTagName('body')[0],
	    x = w.innerWidth || e.clientWidth || g.clientWidth,
	    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
		return [x,y]
	}
	tempChess(color,position){
		if(!this.lastChess) {
			this.lastChess=position
			return
		}
		if(position.x==this.lastChess.x&&position.y==this.lastChess.y)
			return;
		this.cleanChess(this.lastChess);
		this.lastChess=position
		this.drawChess(color,position)
	}
	cleanChess(position){
		let asasa=this.chess.checkPos(position)
		if(!asasa){
			return
		} 
		this.ctx.fillStyle = this.bgColor;
		let loc=this.getLocation(position)
		this.ctx.fillRect(loc.x-16,loc.y-16,35,35);
		let xa=loc.x-16>=this.left?loc.x-16:this.left
		let ya=loc.y-16>=this.top?loc.y-16:this.top
		let xb=loc.x+20<=this.right?loc.x+20:this.right
		let yb=loc.y+20<=this.bottom?loc.y+19:this.bottom
		this.drawLine(xa,loc.y,xb,loc.y)
		this.drawLine(loc.x,ya,loc.x,yb)
	}
	getLocation(position){
		return {x:this.left+(position.x*this.BlockWidth),y:this.top+(position.y*this.BlockWidth)}
	}
	drawChess(color,position){
		let loc=this.getLocation(position)
		this.ctx.fillStyle = color;
		this.ctx.beginPath();
		this.ctx.arc(loc.x,loc.y,15,0,2*Math.PI);
		this.ctx.stroke();
		this.ctx.fill();
	}
	WriteText(text){
		this.ctx.fillStyle = this.bgColor;
		this.ctx.fillRect(0,0,200,100);
		this.ctx.fillStyle = "#ffffff";
		this.ctx.font = "30px Arial";
		this.ctx.textAlign = "center";
		this.ctx.fillText(text,100,50);
	}
}
