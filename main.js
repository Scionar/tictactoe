import React from 'react';
import ReactDOM from 'react-dom';

const playerType = 'x';

/**
 * Returns number of cell if is possible to add opponent move. NULL if not.
 * NULL happens only if lattice is already full.
 *
 * @param {Array.<string>} data Game status.
 *
 * @return {?number} Number for opponents chosen box number. NULL if
 *     if no more free boxes.
 */
function opponentsTurn(data) {
  let openSlots = [];
  let target = null;

  // Gather empty slots
  for (let i = 0; i < data.length; i++) {
    if (data[i] == 'u') {
      openSlots.push(i);
    }
  }

  // If there was empty slots we mark one of them.
  if (openSlots.length) {
    let targetNumber = Math.floor((Math.random() * openSlots.length));
    target = openSlots[targetNumber];
    return target;
  }
  else {
    return null;
  }
}

/**
 * Returns 'x' or 'o' depending on winner. False if no yet winner.
 *
 * @param {Array.<string>} data Game status.
 *
 * @return {?string} Returns players mark as string. If no winner found
 *     returns NULL.
 */
function check(data) {
  let winLines = [
    // Horizontal lines
    [0,1,2],
    [3,4,5],
    [6,7,8],
    // Vertical lines
    [0,3,6],
    [1,4,7],
    [2,5,8],
    // Oblique lines
    [0,4,8],
    [2,4,6]
  ];

  for (let i = 0; i < winLines.length; i++) {
    let line = winLines[i];
    // All the boxes are same?
    if (data[line[0]] === data[line[1]] && data[line[0]] === data[line[2]]) {
      if (data[line[0]] !== 'u') {
        return data[line[0]];
      }
    }
  }
  return null;
}

class Lattice extends React.Component {
  constructor() {
    super();
    this.state = {
      boxStatus: Array(9).fill('u'),
      winner: false,
    };
  }

  handleClick(i) {
    if (this.state.winner == false) {
      const boxStatus = this.state.boxStatus.slice();
      if (boxStatus[i] === 'u') {
        boxStatus[i] = 'x';

        // Check status
        let winner = check(boxStatus);
        if (winner !== null) {
          console.log(winner + ' won!');
          this.setState({
            boxStatus: boxStatus,
            winner: winner
          });
          return;
        }

        // Computer turn
        let target = opponentsTurn(boxStatus);
        if (target !== null) {
          boxStatus[target] = 'o';
        }

        // Check status
        winner = check(boxStatus);
        if (winner !== null) {
          console.log(winner + ' won!');
          this.setState({winner: winner});
        }

        this.setState({boxStatus: boxStatus});
      }
    }
  }

  renderLattice(i) {
    return <LatticeBox key={i} onClick={() => this.handleClick(i)} status={this.state.boxStatus[i]} />;
  }

  render() {
    let lattices = [];
    for (let i = 0; i < 9; i++) {
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
    let boxClasses = [];
    boxClasses.push('lattice__box');
    boxClasses.push('lattice__box--' + this.props.status);
    return (
      <div className={boxClasses.join(' ')} onClick={() => this.props.onClick()}>
      </div>
    );
  }
};

ReactDOM.render(
  <Lattice />,
  document.getElementById('container')
);
