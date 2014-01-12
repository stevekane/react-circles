var _ = require('lodash')
  , range = _.range
  , forEach = _.forEach
  , partial = _.partial
  , map = _.map
  , CIRCLE_COUNT = 100

//def of circle object.  no methods
var Circle = function () {
  this.top = 0;
  this.left = 0;
  this.color = 0;
  this.content = 0;
};

//build our circle objects in an array
var circles = map(range(CIRCLE_COUNT), function () {
  return new Circle;
});

/*
our "atom" is the list of circles.  We will change props
on the array of circles on every tick of our loop
and then shove the new circle array into the properties
of our react root component (called "CirclesComponent")
*/

//mutation of our each circle in our Atom
var updateCircle = function (count, circle) {
  circle.top = Math.sin(count / 10) * 10;
  circle.left = Math.cos(count / 10) * 10;
  circle.color = (count) % 255;
  circle.content = count % 100;
};

var tick = function (circles, gui, count) {
  var newCount = count + 1;

  forEach(circles, partial(updateCircle, newCount));
  requestAnimationFrame(partial(tick, circles, gui, newCount));
};

var gui = {};

//kick the loop off
requestAnimationFrame(partial(tick, circles, gui, 0));
