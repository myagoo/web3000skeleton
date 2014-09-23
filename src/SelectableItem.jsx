var React = require('react');

var SelectableItem = React.createClass({
  handleClick: function(){
    this.props.onSelect && this.props.onSelect(this.props.value || this.props.children, this.props.children);
  },
  render: function(){
    if(this.props.matcher === undefined || this.props.matcher())
    return <span onClick={this.handleClick}>{this.props.children}</span>
  }
});

module.exports = SelectableItem;
