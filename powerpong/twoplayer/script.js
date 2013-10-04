var paddle1 = {
	x: 250,
	y: 624,
	width: 75,
	height: 10,
	color: "blue",
	draw: function(){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x,this.y,this.width,this.height);
	},
	update: function(){
		
	}
}
var paddle2 = {
	x: 250,
	y: 7,
	width: 75,
	height: 10,
	color: "red",
	draw: function(){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x,this.y,this.width,this.height);
	},
	update: function(){
		
	}
}
var ball = {
	x: 50,
	y: 50,
	radius: 6,
	color: "white",
	vx: 200,
	vy: 200,
	draw: function(){
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
		ctx.fillStyle = this.color;
		ctx.fill();
	},
	update: function(){
		this.x += this.vx / Game.FPS;
		this.y += this.vy / Game.FPS;
		//collision detection
		if(this.x + this.radius > canvas.width){
			this.vx = -this.vx;
		}
		if(this.x - this.radius < 0){
			this.vx = -this.vx;
		}
		if(this.y + this.radius > canvas.height){
			this.vy = -this.vy;
		}
		if(this.y - this.radius < 0){
			this.vy = -this.vy;
		}
		//check to see if it has hit paddle
		if(this.x - this.radius > paddle1.x && this.x + this.radius < paddle1.x + paddle1.width && this.y + this.radius > paddle1.y){
			this.vy = -this.vy;
		}
		//and the other player's paddle
		if(this.x - this.radius > paddle2.x && this.x + this.radius < paddle2.x + paddle2.width && this.y - this.radius < paddle2.y + paddle2.height){
			this.vy = -this.vy;
		}
	}
}
function powerup(type){
	this.x = null;
	this.y = null;
	this.type = type;
	this.radius = 4;
	this.vx = null;
	this.vy = null;
	this.draw = function(){
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
		ctx.fillStyle = this.color;
		ctx.fill();
	},
	this.update = function(){
		this.x += this.vx / Game.FPS;
		this.y += this.vy / Game.FPS;
	}
	switch(type){
		case "big":
			this.color = "red";
			this.effect = function(){
				switch(paddle.width){
					case "#"://small
						break;
					case "#"://normal
						break;
					case "#"://big already
						break;
				}
			};
			break;
	//and so on...
	}
}
var powerup_types = ["big", "small", "bigBall", "smallBall", "iceBall", "fireBall"];//no multiball, thats too hard to implement here
var powerups = [];
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var Game = {
	FPS: 60,
	Tick: function(){
		Game.Update();
		Game.Draw();
	},
	Draw: function(){
		paddle1.draw();
		paddle2.draw();
		ball.draw();
		for(var x in powerups){
			powerups[x].draw();
		}
	},
	Update: function(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		paddle1.update();
		paddle2.update();
		ball.update();
		for(var x in powerups){
			powerups[x].update();
		}
	},
	Random: function(min,max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
};
setInterval(Game.Tick,1000/Game.FPS);
document.onkeydown = function(e){
	e = e || window.event;
	c = e.keyCode;
};
document.onkeyup = function(e){
	e = e || window.event;
	c = e.keyCode;
};
