# tictactoe

React tic-tac-toe game. Opponent is computer which sets random ownerships. Do not expect a smart opponent. ;)

## Install and play

Clone repo to your desktop or download zip. No need to install any packages. Just open index.html in your browser and click boxes for your turn.

## My first react app

This was my first React project. Idea was unique at it's time. When project was almost finished, I noticed this was also in official react tutorial. Whole app would have been even easier with state container like Redux. Because data flow wasn't easiest part to handle.

## What did I learn?

Some documentation what I learned.

### Data to base container without exceptions

My first idea was to have external data and update it from child components. Also idea was to use opponent logic from function outside of react components. This idea was too complex. In the end I put data as an array to base container state. Also child components refer to method in base component. This method updates state.

### Make own function for creating components in loop

Creating boxes with copypaste felt bad and not DRY. Everyone needed it's own parameters. Eventually made for-loop which creates boxes with function.

```
renderLattice(i) {
  return <LatticeBox onClick={() => this.handleClick(i)} key={i} status={this.state.boxStatus[i]} />;
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
```

### Yeah, JavaScript changes a lot...

I know that React is still in development and JavaScript has got a lot of changes. React got used syntax update in document. Also ES6 has brought lots of new stuff. New features feel helping but also making stuff hidden and not so easy to read. Making short gibberish to make writing shorter does make me unsure.
