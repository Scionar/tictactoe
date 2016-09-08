'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var playerType = 'x';

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
  handleClick: function() {
    console.log('lolo');
    this.setState({owner: 'x'});
  },
  getInitialState: function() {
    return {owner: 'u'};
  },
  render: function() {
    var ownerClass = 'box--' + this.state.owner;
    return (
      <div className="lattice__box" onClick={this.handleClick}>
      </div>
    );
  }
});

ReactDOM.render(
  React.createElement(Lattice, null),
  document.getElementById('container')
);
