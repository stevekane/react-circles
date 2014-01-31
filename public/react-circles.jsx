var _ = require('lodash')
  , range = _.range
  , forEach = _.forEach
  , partial = _.partial
  , extend = _.extend
  , map = _.map
  , CIRCLE_COUNT = 100

var createCircle = function () {
  return {
    top: 0,
    left: 0,
    color: 0,
    content: 0 
  };
};

//mutate each circle in our circles atom
var updateCircle = function (count, circle) {
  extend(circle, newProps);
};

var calculateProps = function (count) {
  return {
    top: Math.round(Math.sin(count / 10) * 10),
    left: Math.round(Math.cos(count / 10) * 10),
    color: count % 255,
    content: count % 100
  }
};

var tick = function (circles, gui, count) {
  var newCount = count + 1
    , newProps = calculateProps(newCount);

  forEach(circles, partial(updateCircle, newProps));
  gui.setProps({circles: circles});
  requestAnimationFrame(partial(tick, circles, gui, newCount), 0);
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
    return (
    <div className="box-view">
      <div className="box" style={buildStyles(this.props.circle)} >
        {this.props.circle.content}
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

var circles = map(range(CIRCLE_COUNT), createCircle);
var gui = React.renderComponent(
  <CirclesComponent circles={circles} />,
  document.body
);

requestAnimationFrame(partial(tick, circles, gui, 0), 0);
