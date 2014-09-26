var React = require('react/addons');

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
    if(this.props.match === undefined || this.props.match(this.state.value)){
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
  }
});

module.exports = SelectableDatepicker;
