var CIRCLE_COUNT = 5

//def of circle object.  no methods
var Circle = function () {
  this.top = 0;
  this.left = 0;
  this.color = 0;
  this.content = 0;
};

//mutation of our each circle in our Atom
var updateCircle = function (count, circle) {
  circle.top = Math.round(Math.sin(count / 10) * 10)
  circle.left = Math.round(Math.cos(count / 10) * 10);
  circle.color = (count) % 255;
  circle.content = count % 100;
};

//Imperative tick implementation
var tick = function (circles, gui, count) {
  var newCount = count + 1;

  for (var i=0, len=circles.length; i < len ; ++i) {
    circles[i].top = Math.round(Math.sin(count / 10) * 10)
    circles[i].left = Math.round(Math.cos(count / 10) * 10);
    circles[i].color = (count) % 255;
    circles[i].content = count % 100;
  }
  gui.setProps({circles: circles});
  setTimeout(partial(tick, circles, gui, newCount), 0);
};

var buildStyles = function (circle) {
  return {
    top: circle.top,
    left: circle.left,
    background: "rgb(0, 0, " + circle.color + ")"
  };
};

var CircleComponent = React.createClass({
  render: function () {
    return React.DOM.div({
      className: "box-view"
    }, React.DOM.div({
      className: "box",
      style: buildStyles(this.props.circle) 
    }, this.props.circle.content));
  }
});

var CirclesComponent = React.createClass({
  render: function () {
    var circleComponents = [];
    for (var i=0, len=this.props.circles.length; i < len; i++) {
      circleComponents.push(CircleComponent({
        key: i,
        circle: this.props.circles[i]
      }));
    }

    return React.DOM.div({
      className: "circles",
    }, circleComponents);
  }
});

//build our circle objects in an array
var circles = [];
for (var j=0; j < CIRCLE_COUNT; ++j) {
  circles.push(new Circle);
}

var gui = React.renderComponent(
  CirclesComponent({
    circles: circles
  }),
  document.body
);

setTimeout(partial(tick, circles, gui, 0), 0);
