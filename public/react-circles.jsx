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

//mutation of our each circle in our Atom
var updateCircle = function (count, circle) {
  circle.top = Math.sin(count / 5) * 2;
  circle.left = Math.cos(count / 5) * 2;
  circle.color = (count) % 255;
  circle.content = count % 100;
};

var tick = function (circles, gui, count) {
  var newCount = count + 1;

  forEach(circles, partial(updateCircle, newCount));
  gui.setProps({circles: circles});
  //requestAnimationFrame(partial(tick, circles, gui, newCount));
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
    var circle = this.props.circle;

    return (
    <div className="box-view">
      <div className="box" style={buildStyles(circle)} >
        {circle.content}
      </div>
    </div>
    );
  }
});

var createCircleComponent = function (circle, index) {
  return <CircleComponent key={index} circle={circle} />;
};

var CirclesComponent = React.createClass({
  render: function () {
    return (
    <div className="circles">
      {map(this.props.circles, createCircleComponent)}
    </div>
    )
  }
});

var gui = React.renderComponent(
  <CirclesComponent circles={circles} />,
  document.body
);

setTimeout(partial(tick, circles, gui, 0), 0);
//requestAnimationFrame(partial(tick, circles, gui, 0));
