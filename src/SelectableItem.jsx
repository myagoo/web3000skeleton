var React = require('react/addons');

var SelectableItem = React.createClass({
  propTypes: {
    children: React.PropTypes.string,
    onSelect: React.PropTypes.func,
    value : React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])
  },
  shouldComponentUpdate: function(nextProps){
    return this.refs.text.props.children !== nextProps.children;
  },
  match: function(value){
    return this.refs.text.props.children.indexOf(value) !== -1;
  },
  handleClick: function(){
    this.props.onSelect && this.props.onSelect(this.props.value || this.props.children, this.props.children);
  },
  render: function(){
    return <li onClick={this.handleClick}><span ref="text">{this.props.children}</span></li>;
  }
});

module.exports = SelectableItem;
