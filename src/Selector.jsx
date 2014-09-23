var React = require('react');

var Selector = React.createClass({
  getInitialState: function() {
    return {
      open: false,
      displayValue: 'Choisissez une valeur...',
      searchValue: ''
    }
  },
  handleClick: function() {
    this.setState({
      open: !this.state.open
    });
  },
  handleSelect: function(formValue, displayValue){
    this.setState({
      value: formValue,
      displayValue: displayValue,
      open: false
    });

    this.props.onChange && this.props.onChange(formValue, displayValue);
  },
  getDropDownStyle: function(){
    return {
      display: this.state.open ? 'block': 'none',
      position: 'absolute'
    };
  },
  handleSearchChange: function(e){
    this.setState({
      searchValue: e.target.value
    });
  },
  renderDropDown: function() {
    var items = React.Children.map(this.props.children, function (child, index) {
      if(
        this.state.searchValue === ''
        || (child.props.children === undefined && child.props.value === undefined)
        || (child.props.children && child.props.children.toString && child.props.children.toString().indexOf(this.state.searchValue) !== -1)
        || (child.props.value && child.props.value.toString && child.props.value.toString().indexOf(this.state.searchValue) !== -1)
      ){
        child.props.onSelect = this.handleSelect;
        return <li key={index}>{child}</li>;
      }
    }.bind(this));

    return <ul style={this.getDropDownStyle()}>
      <input onChange={this.handleSearchChange} value={this.state.searchValue} placeholder="Filtrer..."/>
      {items}
    </ul>;
  },
  render: function() {
    return (
      <div>
      <span onClick={this.handleClick}>{this.state.displayValue}</span>
      {this.renderDropDown()}
      </div>
    );
  }
});

module.exports = Selector;
