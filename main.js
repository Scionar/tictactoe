'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var playerType = 'x';

var gameData = {
  box1: 'u',
  box2: 'u',
  box3: 'u',
  box4: 'u',
  box5: 'u',
  box6: 'u',
  box7: 'u',
  box8: 'u',
  box9: 'u'
};

/* Returns true if is possible to add opponent move. False if not. False happens
 * only if lattice is already full.
 */
function opponentsTurn() {
  var openSlots = [];
  var target = null;

  // Gather empty slots
  for (var key in gameData) {
    if (gameData.hasOwnProperty(key)) {
      if (gameData[key] == 'u') {
        openSlots.push(key);
      }
    }
  }

  // If there was empty slots we mark one of them.
  if (openSlots.length) {
    var targetNumber = Math.floor((Math.random() * openSlots.length));
    target = openSlots[targetNumber];
    gameData[target] = 'o';

    return true;
  }
  else {
    return false;
  }
}

var Lattice = React.createClass({
  render: function() {
    let lattices = [];
    for (var i = 1; i <= 9; i++) {
      lattices[i] = <LatticeBox key={i} />;
    }

    return (
      <div className="lattice">
        {lattices}
      </div>
    );
  }
});

var LatticeBox = React.createClass({
  getInitialState: function() {
    return {owner: 'u'};
  },
  handleClick: function() {
    this.changeOwnership('x');
    opponentsTurn();
  },
  _changeOwnership: function($mark) {
    var id = this.props.id;
    gameData[id] = $mark;
    this.setState({owner: gameData[id]});
  },
  render: function() {
    var ownerClass = 'box--' + this.state.owner;
    return (
      <div id={this.props.id} className={['lattice__box', ownerClass].join(' ')} onClick={this.handleClick}>
      </div>
    );
  }
});

ReactDOM.render(
  <Lattice data={gameData} />,
  document.getElementById('container')
);
