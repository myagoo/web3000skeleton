var React = require('react/addons');

var Selector = require('./Selector.jsx');
var SelectableDatepicker = require('./SelectableDatepicker.jsx');
var SelectableItem = require('./SelectableItem.jsx');
var SelectableSelector = require('./SelectableSelector.jsx');

var items = [];

for(var i = 0, j = 5000 ; i < j; i++){

  items.push(<SelectableItem>{'Item #' + i}</SelectableItem>);

}
React.renderComponent(<Selector>{items}</Selector>, document.body);
