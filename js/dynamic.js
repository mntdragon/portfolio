
// function Particle( x, y, radius ) {
// 	this.init( x, y, radius );
// }

// Particle.prototype = {

// 	init: function( x, y, radius ) {

// 		this.alive = true;

// 		this.radius = radius || 10;
// 		this.wander = 0.15;
// 		this.theta = random( TWO_PI );
// 		this.drag = 0.92;
// 		this.color = '#fff';

// 		this.x = x || 0.0;
// 		this.y = y || 0.0;

// 		this.vx = 0.0;
// 		this.vy = 0.0;
// 	},

// 	move: function() {

// 		this.x += this.vx;
// 		this.y += this.vy;

// 		this.vx *= this.drag;
// 		this.vy *= this.drag;

// 		this.theta += random( -0.5, 0.5 ) * this.wander;
// 		this.vx += sin( this.theta ) * 0.1;
// 		this.vy += cos( this.theta ) * 0.1;

// 		this.radius *= 0.96;
// 		this.alive = this.radius > 0.5;
// 	},

// 	draw: function( ctx ) {

// 		ctx.beginPath();
// 		ctx.arc( this.x, this.y, this.radius, 0, TWO_PI );
// 		ctx.fillStyle = this.color;
// 		ctx.fill();
// 	}
// };

// // ----------------------------------------
// // Example
// // ----------------------------------------

// var MAX_PARTICLES = 280;
// var COLOURS = [ '#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423' ];

// var particles = [];
// var pool = [];

// var demo = Sketch.create({
// 	container: document.getElementById( 'dynamic' )
// });

// demo.setup = function() {

// 	// Set off some initial particles.
// 	var i, x, y;

// 	for ( i = 0; i < 20; i++ ) {
// 		x = ( demo.width * 0.5 ) + random( -100, 100 );
// 		y = ( demo.height * 0.5 ) + random( -100, 100 );
// 		demo.spawn( x, y );
// 	}
// };

// demo.spawn = function( x, y ) {

// 	if ( particles.length >= MAX_PARTICLES )
// 		pool.push( particles.shift() );

// 	particle = pool.length ? pool.pop() : new Particle();
// 	particle.init( x, y, random( 5, 40 ) );

// 	particle.wander = random( 0.5, 2.0 );
// 	particle.color = random( COLOURS );
// 	particle.drag = random( 0.9, 0.99 );

// 	theta = random( TWO_PI );
// 	force = random( 2, 8 );

// 	particle.vx = sin( theta ) * force;
// 	particle.vy = cos( theta ) * force;

// 	particles.push( particle );
// }

// demo.update = function() {

// 	var i, particle;

// 	for ( i = particles.length - 1; i >= 0; i-- ) {

// 		particle = particles[i];

// 		if ( particle.alive ) particle.move();
// 		else pool.push( particles.splice( i, 1 )[0] );
// 	}
// };

// demo.draw = function() {

// 	demo.globalCompositeOperation  = 'lighter';
	
// 	for ( var i = particles.length - 1; i >= 0; i-- ) {
// 		particles[i].draw( demo );
// 	}
// };

// demo.mousemove = function() {

// 	var particle, theta, force, touch, max, i, j, n;

// 	for ( i = 0, n = demo.touches.length; i < n; i++ ) {

// 		touch = demo.touches[i], max = random( 1, 4 );
// 		for ( j = 0; j < max; j++ ) demo.spawn( touch.x, touch.y );
// 	}
// };


var colors = new Array(
	  [63,155,255], //blue
	  [63,123,239],
	  [111,149,223],
	  [45,175,230],
	  [118,236,217],
	  [102,195,255]);
  
  var step = 0;
  //color table indices for: 
  // current color left
  // next color left
  // current color right
  // next color right
  var colorIndices = [0,1,2,3];
  
  //transition speed
  var gradientSpeed = 0.002;
  
  function updateGradient()
  {
	
	if ( $===undefined ) return;
	
  var c0_0 = colors[colorIndices[0]];
  var c0_1 = colors[colorIndices[1]];
  var c1_0 = colors[colorIndices[2]];
  var c1_1 = colors[colorIndices[3]];
  
  var istep = 1 - step;
  var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  var color1 = "rgb("+r1+","+g1+","+b1+")";
  
  var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
  var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  var color2 = "rgb("+r2+","+g2+","+b2+")";
  
   $('#dynamic').css({
	 background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
	  background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
	
	step += gradientSpeed;
	if ( step >= 1 )
	{
	  step %= 1;
	  colorIndices[0] = colorIndices[1];
	  colorIndices[2] = colorIndices[3];
	  
	  //pick two new target color indices
	  //do not pick the same as the current one
	  colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
	  colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
	  
	}
  }
  
  setInterval(updateGradient,5);