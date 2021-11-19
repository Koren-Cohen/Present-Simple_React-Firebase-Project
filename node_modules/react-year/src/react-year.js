import React from 'react';

const formats = {
  'numeric' (date) {
    return date.getFullYear().toString();
  },
  '2-digit' (date) {
    return date.getFullYear().toString().slice(-2);
  }
};

const Year = React.createClass({

  propTypes: {
    date (props, propName) {
      if ({}.toString.call(new Date(props[propName])) !== '[object Date]') {
        return new Error('Invalid date supplied');
      }
    },
    format: React.PropTypes.oneOf(Object.keys(formats))
  },

  getDefaultProps () {
    return {
      date: new Date().toString(),
      format: 'numeric'
    };
  },

  render () {
    if (!formats[this.props.format]) {
      return null;
    }

    return (
      <span>{formats[this.props.format].apply(this, [new Date(this.props.date)])}</span>
    );
  }

});

export default Year;
