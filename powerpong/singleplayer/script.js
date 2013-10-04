//Game Vars
var mouse = {
	x: 400,
}
var score = 0;
var alive = true;
var alerted = false;
var paddle = {
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
		this.x = mouse.x;
	}
}
var enemypaddle = {
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
		this.x = ball.x - 37;
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
			if(alerted === false){
				alert("You failed! Your score was: "+score);
				alerted = true;
				alive = false;
				ball.x = 5000;
				paddle.y = 5000;
				enemypaddle.x = 5000;
				for(var x in powerups){
					powerups[x].x = 5000;
				}
			}
		}
		if(this.y - this.radius < 0){
			this.vy = -this.vy;
		}
		//check to see if it has hit paddle
		if(this.x - this.radius > paddle.x && this.x + this.radius < paddle.x + paddle.width && this.y + this.radius > paddle.y){
			this.vy = -this.vy;
			this.vx += 50 * level;
			this.vy += 50 * level;
		}
		//and the enemy's paddle
		if(this.x - this.radius > enemypaddle.x && this.x + this.radius < enemypaddle.x + enemypaddle.width && this.y - this.radius < enemypaddle.y + enemypaddle.height){
			this.vy = -this.vy;
		}
	}
}
function powerup(type){
	this.x = Math.random() * 417 + 50;
	this.y = Math.random() * 317 + 50;
	this.type = type;
	this.radius = 6;
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
		if(this.x - this.radius > paddle.x && this.x + this.radius < paddle.x + paddle.width && this.y + this.radius > paddle.y){
			this.x = 5000;
			this.effect();
		}
		//and the enemy's paddle
		if(this.x - this.radius > enemypaddle.x && this.x + this.radius < enemypaddle.x + enemypaddle.width && this.y - this.radius < enemypaddle.y + enemypaddle.height){
			this.vy = -this.vy;
		}
	}
	switch(type){
		case "big":
			this.color = "red";
			this.effect = function(){
				switch(paddle.width){
					case 50:
						paddle.width = 75;
						break;
					case 75:
						paddle.width = 100;
						break;
					case 100:
						break;
				}
			}
			break;
		case "small":
			this.color = "red";
			this.effect = function(){
				switch(paddle.width){
					case 50:
						break;
					case 75:
						paddle.width = 50;
						break;
					case 100:
						paddle.width = 75;
						break;
				}
			}
			break;
		case "smallBall":
			this.color = "blue";
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
			//doesnt do anything but add another ball that is the same size as the normal one
			//which confuses the player because they must decide between them
			break;
		case "iceBall":
			this.color = "orange";
			this.effect = function(){
				ball.vx *= 0.75;
				ball.vy *= 0.75;
			}
			break;
		case "fireBall":
			this.color = "orange";
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
var rect = canvas.getBoundingClientRect();
var Game = {
	FPS: 60,
	Tick: function(){
		Game.Update();
		Game.Draw();
	},
	Draw: function(){
		ctx.font = "18px Garamond";
		ctx.fillStyle = "black";
		ctx.fillText("Score: "+score,20,20);
		paddle.draw();
		enemypaddle.draw();
		ball.draw();
		for(var x in powerups){
			powerups[x].draw();
		}
	},
	Update: function(){
		if(alive === true){
			score += 1;
		}
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
		paddle.update();
		enemypaddle.update();
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
document.onmousemove = function(e){
	e = e || window.event;
	mouse.x = e.pageX - rect.left;
};
