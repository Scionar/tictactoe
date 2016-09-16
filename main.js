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

var Lattice = React.createClass({
  render: function() {
    return (
      <div className="lattice">
        <LatticeBox id="box1" handleChange={this.props.data.box1} />
        <LatticeBox id="box2" handleChange={this.props.data.box2} />
        <LatticeBox id="box3" handleChange={this.props.data.box3} />
        <LatticeBox id="box5" handleChange={this.props.data.box4} />
        <LatticeBox id="box4" handleChange={this.props.data.box5} />
        <LatticeBox id="box6" handleChange={this.props.data.box6} />
        <LatticeBox id="box7" handleChange={this.props.data.box7} />
        <LatticeBox id="box8" handleChange={this.props.data.box8} />
        <LatticeBox id="box9" handleChange={this.props.data.box9} />
      </div>
    );
  }
});

var LatticeBox = React.createClass({
  getInitialState: function() {
    return {owner: 'u'};
  },
  handleClick: function() {
    var id = this.props.id;
    gameData[id] = 'x';
    //this.setState({owner: gameData[id]});
  },
  handleChange: function(e) {
    if (this.state.owner != e) {
      this.setState({owner: e});
    }
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
