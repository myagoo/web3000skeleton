var React = require('react');
var DatePicker = require('date-pikinator');

var SelectableItem = React.createClass({
  handleClick: function(){
    this.props.onSelect && this.props.onSelect(this.props.value || this.props.children, this.props.children);
  },
  render: function(){
    return <span onClick={this.handleClick}>{this.props.children}</span>
  }
});

var SelectableDatepicker = React.createClass({
  getInitialState: function(){
    return {
      value: this.props.value
    };
  },
  handleValidate: function(){
    this.props.onSelect && this.props.onSelect(this.state.value, this.state.value);
  },
  handleChange: function(e){
    this.setState({
      value: e.target.value
    });
  },
  render: function(){
    return (
      <div>
        <input
          type="date"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button onClick={this.handleValidate}>'√'</button>
      </div>
    );
  }
});

var Selector = React.createClass({
  getInitialState: function() {
    return {
      open: false,
      displayValue: 'Choisissez une valeur...'
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
  renderDropDown: function() {
    var items = this.props.children.map(function (child, index) {
      child.props.onSelect = this.handleSelect;
      return <li key={index}>{child}</li>;
    }.bind(this));

    return <ul style={this.getDropDownStyle()}>{items}</ul>;
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

var SelectableSelector = React.createClass({
  handleChange: function(formValue, displayValue){
    this.props.onSelect && this.props.onSelect(formValue, displayValue);
  },
  render: function(){
    return this.transferPropsTo(<Selector onChange={this.handleChange}>{this.props.children}</Selector>);
  }
});

var items = [];

for (var i = 0, j = 3 ; i < j ; i++) {
  items.push(<SelectableItem value={i}>{'Item #' + i}</SelectableItem>);
}

items.push(<SelectableDatepicker value="22/09/2014"/>);

var items2 = [];

for (var i = 3, j = 6 ; i < j ; i++) {
  items2.push(<SelectableItem value={i}>{'Item #' + i}</SelectableItem>);
}

items2.push(<SelectableDatepicker value="23/09/2014"/>);

items.push(<SelectableSelector>{items2}</SelectableSelector>);

React.renderComponent(<Selector>{items}</Selector>, document.body);
