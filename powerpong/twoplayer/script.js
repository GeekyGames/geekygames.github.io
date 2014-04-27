//Game Vars
var paddle1 = {
	x: 250,
	y: 10,
	width: 75,
	height: 10,
	color: "blue",
	draw: function(){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x,this.y,this.width,this.height);
	}
}
var paddle2 = {
	x: 250,
	y: 624,
	width: 75,
	height: 10,
	color: "red",
	draw: function(){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x,this.y,this.width,this.height);
	}
}
var ball = {
	x: 50,
	y: 50,
	radius: 6,
	color: "white",
	vx: 300,
	vy: 300,
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
			ball.x = 5000;
			paddle1.y = 5000;
			paddle2.y = 5000;
			for(var x in powerups){
				powerups[x].x = 5000;
			}
		}
		if(this.y - this.radius < 0){
			ball.x = 5000;
			paddle1.y = 5000;
			paddle2.y = 5000;
			for(var x in powerups){
				powerups[x].x = 5000;
			}
		}
		//check to see if it has hit paddle
		if(this.x - this.radius > paddle2.x && this.x + this.radius < paddle2.x + paddle2.width && this.y + this.radius > paddle2.y){
			this.vy = -this.vy;
		}
		//and the other player's paddle
		if(this.x - this.radius > paddle1.x && this.x + this.radius < paddle1.x + paddle1.width && this.y - this.radius < paddle1.y + paddle1.height){
			this.vy = -this.vy;
		}
	}
}
function powerup(type){
	this.x = Math.random() * 417 + 50;
	this.y = Math.random() * 317 + 50;
	this.type = type;
	this.vx = Math.random() * 500;
	this.vy = Math.random() * 500;
	this.draw = function(){
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
		ctx.fillStyle = this.color;
		ctx.fill();
	},
	this.update = function(){
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
		if(this.x - this.radius > paddle2.x && this.x + this.radius < paddle2.x + paddle2.width && this.y + this.radius > paddle2.y){
			this.x = 5000;
			this.effect("p2");
		}
		//and the enemy's paddle
		if(this.x - this.radius > paddle1.x && this.x + this.radius < paddle1.x + paddle1.width && this.y - this.radius < paddle1.y + paddle1.height){
			this.x = 5000;
			this.effect("p1");
		}
	}
	switch(type){
		case "big":
			this.color = "red";
			this.radius = 6;
			this.effect = function(p){
				switch(p){
					case "p1":
						switch(paddle1.width){
							case 50:
								paddle1.width = 75;
								break;
							case 75:
								paddle1.width = 100;
								break;
							case 100:
								break;
						}
						break;
					case "p2":
						switch(paddle2.width){
							case 50:
								paddle2.width = 75;
								break;
							case 75:
								paddle2.width = 100;
								break;
							case 100:
								break;
						}
						break;
				}
			}
			break;
		case "small":
			this.color = "red";
			this.radius = 6;
			this.effect = function(p){
				switch(p){
					case "p1":
						switch(paddle1.width){
							case 50:
								break;
							case 75:
								paddle1.width = 50;
								break;
							case 100:
								paddle1.width = 75;
								break;
						}
						break;
					case "p2":
						switch(paddle2.width){
							case 50:
								break;
							case 75:
								paddle2.width = 50;
								break;
							case 100:
								paddle2.width = 75;
								break;
						}
						break;
				}
			}
			break;
		case "smallBall":
			this.color = "blue";
			this.radius = 6;
			this.effect = function(){
				switch(ball.radius){
					case 3:
						break;
					case 6:
						ball.radius = 3;
						break;
					case 10:
						ball.radius = 6;
						break;	
				}
			}
			break;
		case "bigBall":
			this.color = "blue";
			this.radius = 6;
			this.effect = function(){
				switch(ball.radius){
					case 3:
						ball.radius = 6;
						break;
					case 6:
						ball.radius = 10;
						break;
					case 10:
						break;
				}
			}
			break;
		case "confuse":
			this.color = "white";
			switch(ball.radius){
				case 3:
					this.radius = 3;
					break;
				case 6:
					this.radius = 6;
					break;
				case 10:
					this.radius = 10;
					break;
			}
			break;
		case "iceBall":
			this.color = "orange";
			this.radius = 6;
			this.effect = function(){
				ball.vx *= 0.75;
				ball.vy *= 0.75;
			}
			break;
		case "fireBall":
			this.color = "orange";
			this.radius = 6;
			this.effect = function(){
				ball.vx *= 1.25;
				ball.vy *= 1.25;
			}
			break;
	}
}
var powerups = [];
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var keys = {
	left: false,
	right: false,
	a: false,
	d: false
}
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
		var choice = Game.Random(1,600);
		if(choice === 1){
			var pick = Game.Random(1,7);
			switch(pick){
				case 1:
					powerups.push(new powerup("big"));
					break;
				case 2:
					powerups.push(new powerup("small"));
					break;
				case 3:
					powerups.push(new powerup("bigBall"));
					break;
				case 4:
					powerups.push(new powerup("smallBall"));
					break;
				case 5:
					powerups.push(new powerup("fireBall"));
					break;
				case 6:
					powerups.push(new powerup("iceBall"));
					break;
				case 7:
					for(i=1;i<=3;i++){
						powerups.push(new powerup("confuse"));
					}
					break;
			}
		}
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ball.update();
		for(var x in powerups){
			powerups[x].update();
		}
		if(keys.left === true){
			paddle1.x -= 10;
		}
		if(keys.right === true){
			paddle1.x += 10;
		}
		if(keys.a === true){
			paddle2.x -= 10;
		}
		if(keys.d === true){
			paddle2.x += 10;
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
	switch(c){
		case 65:
			keys.a = true;
			break;
		case 68:
			keys.d = true;
			break;
		case 37:
			keys.left = true;
			break;
		case 39:
			keys.right = true;
			break;
	}
};
document.onkeyup = function(e){
	e = e || window.event;
	c = e.keyCode;
	switch(c){
		case 65:
			keys.a = false;
			break;
		case 68:
			keys.d = false;
			break;
		case 37:
			keys.left = false;
			break;
		case 39:
			keys.right = false;
			break;
	}
};
