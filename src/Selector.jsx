var React = require('react/addons');

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
    var children = React.Children.map(this.props.children, function (child, index) {
      if(this.state.searchValue === '' || this.refs['child-' + index] && this.refs['child-' + index].match(this.state.searchValue) === true){
        return React.addons.cloneWithProps(child, {
          ref: 'child-' + index,
          key: 'child-' + index,
          onSelect: this.handleSelect
        });
      }
    }.bind(this));

    return <ul style={this.getDropDownStyle()}>
    <input onChange={this.handleSearchChange} value={this.state.searchValue} placeholder="Filtrer..."/>
    {children}
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
