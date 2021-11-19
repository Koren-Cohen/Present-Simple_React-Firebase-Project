# React &lt;Year&gt;

> A react-component to format and display a year.


## Getting Started

- Install with [NPM](https://www.npmjs.org/) - `npm install --save react-year`


## Usage

```javascript
var React = require('react');
var Year  = require('react-year');

var Component = React.createClass({
  render: function () {
    return (
      <Year format="numeric" date="13/06/1982"></Year>
    );
  }
});
```


## Options


Property | Type     | Argument     | Values                   | Default   | Description
---------|----------|--------------|--------------------------|-----------|------------
date     | `string` | `<optional>` | [RFC2822/ISO8601](https://tools.ietf.org/html/rfc2822#page-14)        | `today`   | [RFC2822/ISO8601](https://tools.ietf.org/html/rfc2822#page-14) format.
format   | `string` | `<optional>` | `numeric`, `2-digit`     | `numeric` | representation format.


## Developing

[react-year](https://github.com/jasonbellamy/react-year) is built using **ES6**. Run the following task to compile the `src/` into `dist/`.

```bash
npm run build
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.


## License
Copyright (c) 2015 [Jason Bellamy ](http://jasonbellamy.com)  
Licensed under the MIT license.
