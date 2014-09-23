var React = require('react');

var extend = function ( defaults, options ) {
    var extended = {};
    var prop;
    for (prop in defaults) {
        if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
            extended[prop] = defaults[prop];
        }
    }
    for (prop in options) {
        if (Object.prototype.hasOwnProperty.call(options, prop)) {
            extended[prop] = options[prop];
        }
    }
    return extended;
};

function getOffset(node){
  var top=0;
  var left=0;
  var elmt=node;
  while(elmt) {
    top=top+parseInt(elmt.offsetTop,10);
    left=left+parseInt(elmt.offsetLeft,10);
    elmt=elmt.offsetParent;
  }
  return {top:top-document.body.scrollTop,left:left};
};

var Draggable = React.createClass({
  getDefaultProps: function(){
    return {
      container_width: 200,
      container_height: 200,
      content_width: 50,
      content_height: 50,
      content_top: 0,
      content_left: 0
    };
  },
  getContainerStyle: function(){
    return extend(this.props.style, {
      height: this.props.container_height,
      width: this.props.container_width,
      backgroundColor: 'lightGrey'
    });
  },
  getContentStyle: function(){
    return {
      height: this.props.content_height,
      width: this.props.content_width,
      top: this.state.content_top,
      left: this.state.content_left,
      backgroundColor: 'grey'
    };
  },
  formatContentPosition: function(x, y) {
    var top = Math.max(0, Math.min(this.props.container_height - this.props.content_height, y));
    var left = Math.max(0, Math.min(this.props.container_width - this.props.content_width, x));
    return {top: top, left: left};
  },
  handleMouseMove: function(event){
    if (!this.state.content_mouseClick) {
      return;
    }
    var top = this.state.content_top + (event.pageY - this.state.content_mouseClick.y);
    var left = this.state.content_left + (event.pageX - this.state.content_mouseClick.x);

    var position = this.formatContentPosition(left, top);

    this.setState({
      content_top: position.top,
      content_left: position.left,
      content_mouseClick: {
        x: event.pageX,
        y: event.pageY,
      }
    });

    this.props.onMove && this.props.onMove({top: top, left: left});
  },
  handleMouseDown: function(event){
    this.setState({
      content_mouseClick: {
        x: event.pageX,
        y: event.pageY
      }
    });
  },
  handleMouseUp: function(){
    this.setState({
      content_mouseClick: null
    });
  },
  getInitialState: function(){
    return {
      content_top: this.props.content_top,
      content_left: 0
    };
  },
  handleLeave: function(){
    this.setState({
      content_mouseClick: null
    });
  },
  componentWillReceiveProps:function(props) {
    var position = this.formatContentPosition(props.content_left, props.content_top);
    this.setState({
      content_top: position.top,
      content_left: position.left
    });
  },
  render: function(){
    console.log('Draggable', this.props.style);
    return (
      <div className={'draggable-container'} style={this.getContainerStyle()} onMouseLeave={this.handleLeave}>
      <div ref="content" className={'draggable-content'} style={this.getContentStyle()} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} onMouseMove={this.handleMouseMove}/>
      </div>
    );
  }
});

var ScrollBar = React.createClass({
  getDefaultProps: function(){
    return {
      height: 100,
      handleHeight: 40,
    };
  },
  handleMove: function(position){
    var percent = position.top / (this.props.height - this.props.handleHeight);
    this.props.onScrollBarScroll && this.props.onScrollBarScroll(percent);
  },
  getInitialState: function() {
    return {
      percent: 0
    };
  },
  render: function(){
    console.log('ScrollBar', this.props.style);
    return this.transferPropsTo(
      <Draggable
      ref="draggable"
      container_width={20}
      container_height={this.props.height}
      content_width={20}
      content_height={this.props.handleHeight}
      content_top={this.state.percent * (this.props.height - this.props.handleHeight)}
      onMove={this.handleMove}
      />
    );
  }
});

var Scrollable = React.createClass({
  componentDidMount: function(){

  },
  getScrollBarStyle: function(){
    return {
      display: 'inline-block',
      verticalAlign: 'top'
    };
  },
  getContentStyle: function(){
    return {
      display: 'inline-block',
      verticalAlign: 'top',
      height: this.props.height
    };
  },
  getStyle: function(){
    return {
      overflow: 'hidden'
    };
  },
  render: function(){
    return this.transferPropsTo(<div style={this.getStyle()}>
    <div ref="content" style={this.getContentStyle()}>{this.props.children}</div>
    <ScrollBar ref="scrollbar" style={this.getScrollBarStyle()} height={this.props.height}/>
    </div>);
  }
});

var items = [];

for(var i = 0, j = 5000; i < j ; i++){
  items.push(<li>{"Item #" + i}</li>);
}

React.renderComponent(<Scrollable height={200}><ul>{items}</ul></Scrollable>, document.body);
