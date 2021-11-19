'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var formats = {
  'numeric': function numeric(date) {
    return date.getFullYear().toString();
  },
  '2-digit': function digit(date) {
    return date.getFullYear().toString().slice(-2);
  }
};

var Year = _react2['default'].createClass({
  displayName: 'Year',

  propTypes: {
    date: function date(props, propName) {
      if (({}).toString.call(new Date(props[propName])) !== '[object Date]') {
        return new Error('Invalid date supplied');
      }
    },
    format: _react2['default'].PropTypes.oneOf(Object.keys(formats))
  },

  getDefaultProps: function getDefaultProps() {
    return {
      date: new Date().toString(),
      format: 'numeric'
    };
  },

  render: function render() {
    if (!formats[this.props.format]) {
      return null;
    }

    return _react2['default'].createElement(
      'span',
      null,
      formats[this.props.format].apply(this, [new Date(this.props.date)])
    );
  }

});

exports['default'] = Year;
module.exports = exports['default'];