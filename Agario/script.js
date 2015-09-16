function randNum( min, max ) {
    return Math.random() * ( max - min ) + min;
}
function distance( x, y, x2, y2 ) {
    return Math.sqrt((x2-x)*(x2-x)+(y2-y)*(y2-y));
}
var canvas = document.getElementById( "canvas" );
var ctx = canvas.getContext( "2d" );
var FPS = 30;
var balls = 22;
var particles = [];
var mouse = {
	x: 0,
	y: 0
}
var keys = {
	up: false,
	down: false,
	left: false,
	right: false
}
window.onmousemove = function( e ) {
    e = e || window.event;
    mouse.x = e.clientX || e.pageX;
    mouse.y = e.clientY || e.pageY;
};
window.onkeydown = function( e ) {
	e = e || window.event;
	var code = e.keyCode || e.which;
	switch ( code ) {
		case 37:
			keys.left = true;
			break;
		case 38:
			keys.up = true;
			break;
		case 39:
			keys.right = true;
			break;
		case 40:
			keys.down = true;
			break;
		default:
			break;
	}
};
window.onkeyup = function( e ) {
	e = e || window.event;
	var code = e.keyCode || e.which;
	switch ( code ) {
		case 37:
			keys.left = false;
			break;
		case 38:
			keys.up = false;
			break;
		case 39:
			keys.right = false;
			break;
		case 40:
			keys.down = false;
			break;
		default:
			break;
	}
};
var player = {
	x: 0,
	y: 0,
	velocityX: 0,
	velocityY: 0,
	radius: 22,
	color: "rgba(10,10,10,.7)",
	pop: function() {
		this.x = randNum( 25, canvas.width - 25 );
		this.y = randNum( 25, canvas.height - 25 );
		this.radius = 15;
	}
}
var player2 = {
	x: 0,
	y: 0,
	velocityX: 0,
	velocityY: 0,
	radius: 22,
	color: "rgba(10,10,10,.7)",
	pop: function() {
		this.x = randNum( 25, canvas.width - 25 );
		this.y = randNum( 25, canvas.height - 25 );
		this.radius = 15;
	}
}
player.pop();
player2.pop();
for ( var i = 1; i <= balls; i++ ) {
	if ( Math.random() >= 0.5 ) var right = true;
	else var right = false;
	if ( Math.random() >= 0.5 ) var up = true;
	else var up = false;
	particles.push({
		x: randNum( 25, canvas.width - 25 ),
		y: randNum( 25, canvas.height - 25 ),
		velocityX: 0,
		velocityY: 0,
		headingRight: right,
		headingDown: up,
		radius: randNum( 5,20 ),
		color: "rgba(" + Math.floor( randNum( 20, 220 ) ) + "," + Math.floor( randNum( 20, 220 ) ) + "," + Math.floor( randNum( 20, 220 ) ) + ",.7)",
		pop: function() {
			this.x = randNum( 25, canvas.width - 25 );
			this.y = randNum( 25, canvas.height - 25 );
			this.radius = randNum( 5,20 );
		}
	});
}
function draw() {
	ctx.clearRect( 0, 0, canvas.width, canvas.height );
	for ( var i = 0; i < particles.length; i++ ) {
		var p = particles[i];
		ctx.beginPath();
		ctx.arc( p.x, p.y, p.radius, 0, 2 * Math.PI );
		ctx.fillStyle = p.color;
		ctx.fill();
	}
	ctx.beginPath();
	ctx.arc( player.x, player.y, player.radius, 0, 2 * Math.PI );
	ctx.fillStyle = player.color;
	ctx.fill();
	ctx.beginPath();
	ctx.arc( player2.x, player2.y, player2.radius, 0, 2 * Math.PI );
	ctx.fillStyle = player2.color;
	ctx.fill();
}
function update() {
	for ( var i = 0; i < particles.length; i++ ) {
		var p = particles[i];
		if ( p.radius > canvas.height / 2 ) p.pop();
		p.velocityX = (1 / p.radius) * 444;
		p.velocityY = (1 / p.radius) * 444;
		if ( !p.headingRight ) p.velocityX = -p.velocityX;
		if ( !p.headingDown ) p.velocityY = -p.velocityY;
		p.x += p.velocityX / FPS;
		p.y += p.velocityY / FPS;
		if ( ( p.x - p.radius ) < 0 ) {
			p.x = p.radius;
			p.headingRight = true;
		}
		if ( ( p.x + p.radius ) > canvas.width ) {
			p.x = canvas.width -p.radius;
			p.headingRight = false;
		}
		if ( ( p.y - p.radius ) < 0 ) {
			p.y = p.radius;
			p.headingDown = true;
		}
		if ( ( p.y + p.radius ) > canvas.height ) {
			p.y = canvas.height - p.radius;
			p.headingDown = false;
		}
		
		if ( player.radius > canvas.height / 2 ) player.pop();
		if ( player2.radius > canvas.height / 2 ) player2.pop();
		player.velocityX = (1 / player.radius) * 300;
		player.velocityY = (1 / player.radius) * 300;
		player2.velocityX = (1 / player2.radius) * 300;
		player2.velocityY = (1 / player2.radius) * 300;
		
		var theta = Math.atan2( mouse.y - player.y, mouse.x - player.x );
		player.x += player.velocityX / FPS * Math.cos( theta );
		player.y += player.velocityY / FPS * Math.sin( theta );
		
		if ( keys.right ) player2.x += player2.velocityX / FPS;
		if ( keys.left ) player2.x -= player2.velocityX / FPS;
		if ( keys.down ) player2.y += player2.velocityY / FPS;
		if ( keys.up ) player2.y -= player2.velocityY / FPS;
		
		if ( ( player.x - player.radius ) < 0 ) player.x = player.radius;
		if ( ( player.x + player.radius ) > canvas.width ) player.x = canvas.width - player.radius;
		if ( ( player.y - player.radius ) < 0 ) player.y = player.radius;
		if ( ( player.y + player.radius ) > canvas.height ) player.y = canvas.height - player.radius;
		
		if ( ( player2.x - player2.radius ) < 0 ) player2.x = player2.radius;
		if ( ( player2.x + player2.radius ) > canvas.width ) player2.x = canvas.width - player2.radius;
		if ( ( player2.y - player2.radius ) < 0 ) player2.y = player2.radius;
		if ( ( player2.y + player2.radius ) > canvas.height ) player2.y = canvas.height - player2.radius;
	}
	for ( var j = 0; j < particles.length; j++ ) {
		for ( var k = 0; k < particles.length; k++ ) {
			if ( j == k ) continue;
			var x = particles[j];
			var y = particles[k];
			var bigger;
			var smaller;
			if ( x.radius > y.radius * 1.1 ) {
				bigger = x;
				smaller = y;
			} else if ( y.radius > x.radius * 1.1 ) {
				bigger = y;
				smaller = x;
			} else {
				continue;
			}
			if ( distance( bigger.x, bigger.y, smaller.x, smaller.y) <= bigger.radius ) {
				bigger.radius += Math.floor( smaller.radius / Math.PI );
				smaller.pop();
			}
		}
		var it = particles[j];
		var bigger;
		var smaller;
		
		if ( player.radius > it.radius * 1.1 ) {
			bigger = player;
			smaller = it;
		} else if ( it.radius > player.radius * 1.1 ) {
			bigger = it;
			smaller = player;
		}
		if ( distance( bigger.x, bigger.y, smaller.x, smaller.y ) <= bigger.radius ) {
			bigger.radius += Math.floor( smaller.radius / Math.PI );
			smaller.pop();
		}
		
		if ( player2.radius > it.radius * 1.1 ) {
			bigger = player2;
			smaller = it;
		} else if ( it.radius > player2.radius * 1.1 ) {
			bigger = it;
			smaller = player2;
		}
		if ( distance( bigger.x, bigger.y, smaller.x, smaller.y ) <= bigger.radius ) {
			bigger.radius += Math.floor( smaller.radius / Math.PI );
			smaller.pop();
		}
	}
	
	var bigger;
	var smaller;
	
	if ( player.radius > player2.radius * 1.1 ) {
		biggger = player;
		smaller = player2;
	} else if ( player2.radius > player.radius * 1.1 ) {
		bigger = player2;
		smaller = player;
	}
	if ( distance( bigger.x, bigger.y, smaller.x, smaller.y ) <= bigger.radius ) {
		bigger.radius += Math.floor( smaller.radius / Math.PI );
		smaller.pop();
	}
}
function tick() {
	draw();
	update();
}
setInterval( tick, 1000 / FPS );