'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Lattice = React.createClass({
  render: function() {
    return (
      <div className="lattice">
        <LatticeBox />
        <LatticeBox />
        <LatticeBox />
        <LatticeBox />
        <LatticeBox />
        <LatticeBox />
        <LatticeBox />
        <LatticeBox />
        <LatticeBox />
      </div>
    );
  }
});

var LatticeBox = React.createClass({
  render: function() {
    return (
      <div className="lattice__box">
      </div>
    );
  }
});

ReactDOM.render(
  React.createElement(Lattice, null),
  document.getElementById('container')
);
