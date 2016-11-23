'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var playerType = 'x';

const gameData = [
  'u',
  'u',
  'u',
  'u',
  'u',
  'u',
  'u',
  'u',
  'u'
];

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
    console.log('COM: ' + target);
    return true;
  }
  else {
    return false;
  }
}

class Lattice extends React.Component {
  renderLattice(i) {
      return <LatticeBox key={i} href={'box' + i} owner={gameData[i]} boxId={i} />;
  }

  render() {
    let lattices = [];
    for (var i = 0; i < 9; i++) {
      lattices.push(this.renderLattice(i));
    }

    return (
      <div className="lattice">
        {lattices}
      </div>
    );
  }
};

class LatticeBox extends React.Component {
  constructor() {
    super();
    this.state = {
      owner: 'u'
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.state.owner == 'u') {
      console.log('PLA: ' + this.props.boxId);
      gameData[this.props.boxId] = 'x';
      this.setState({
        owner: 'x'
      });
      opponentsTurn();
      console.log('gameData: ' + gameData.join(','));
      console.log(this.refs.box1);
    }
  }

  render() {
    var ownerClass = 'box--' + this.state.owner;
    return (
      <div className={['lattice__box', ownerClass].join(' ')} onClick={this.handleClick}>
      </div>
    );
  }
};

ReactDOM.render(
  <Lattice data={gameData} />,
  document.getElementById('container')
);
