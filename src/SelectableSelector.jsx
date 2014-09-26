var React = require('react/addons');

var SelectableSelector = React.createClass({
  handleChange: function(formValue, displayValue){
    this.props.onSelect && this.props.onSelect(formValue, displayValue);
  },
  render: function(){
    if(this.props.match === undefined || this.props.match()){
      return this.transferPropsTo(<Selector onChange={this.handleChange}>{this.props.children}</Selector>);
    }
  }
});

module.exports = SelectableSelector;
