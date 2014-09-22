var React = require('react');
var DatePicker = require('react-datepicker-component/DatePicker.jsx');
var DatePickerInput = require('react-datepicker-component/DatePickerInput.jsx');

var Selector = React.createClass({
  getInitialState: function() {
    return {
      open: false
    }
  },
  handleClick: function() {
    this.setState({
      open: !this.state.open
    });
  },
  renderDropDown: function() {
    if(this.state.open === false){
      return undefined;
    }

    var items = React.Children.map(this.props.children, function (child) {
      return <li>{child}</li>;
    });

    return <ul>{items}</ul>;
  },
  render: function() {
    return (
      <div>
      <span onClick={this.handleClick}>Choisissez une valeur</span>
      {this.renderDropDown()}
      </div>
    );
  }
});

var items = [];

for (var i = 0, j = 3 ; i < j ; i++) {
  items.push(i);
}
items.push(<DatePicker date={new Date(2014, 0, 8)} />);

React.renderComponent(<Selector><DatePickerInput
        classNamePrefix={"wide-datepicker"}
        date={new Date(2012, 0, 4)} /></Selector>, document.body);
