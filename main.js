'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var playerType = 'x';

/* Returns number of cell if is possible to add opponent move. False if not. False happens
 * only if lattice is already full.
 *
 * data
 * Array of status.
 */
function opponentsTurn(data) {
  var openSlots = [];
  var target = null;

  // Gather empty slots
  for (var i = 0; i < data.length; i++) {
    if (data[i] == 'u') {
      openSlots.push(i);
    }
  }

  // If there was empty slots we mark one of them.
  if (openSlots.length) {
    var targetNumber = Math.floor((Math.random() * openSlots.length));
    target = openSlots[targetNumber];
    console.log('COM: ' + target);
    return target;
  }
  else {
    return false;
  }
}

class Lattice extends React.Component {
  constructor() {
    super();
    this.state = {
      boxStatus: Array(9).fill('u'),
    };
  }

  handleClick(i) {
    const boxStatus = this.state.boxStatus.slice();
    boxStatus[i] = 'x';

    // Computer turn
    let target = opponentsTurn(boxStatus);
    if (target !== false) {
      boxStatus[target] = 'o';
    }
    this.setState({boxStatus: boxStatus});
  }

  renderLattice(i) {
      return <LatticeBox onClick={() => this.handleClick(i)} key={i} href={'box' + i} status={this.state.boxStatus[i]} bodId={i} />;
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
  render() {
    var ownerClass = 'box--' + this.props.status;
    return (
      <div className={['lattice__box', ownerClass].join(' ')} onClick={() => this.props.onClick()}>
      </div>
    );
  }
};

ReactDOM.render(
  <Lattice />,
  document.getElementById('container')
);
