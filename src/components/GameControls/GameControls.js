import React from 'react';

const gameControls = (props) => {
  return (
    <div>
      <button>Play</button>
      <button>Pass</button>
      <button onClick={props.clear}>Clear</button>
      <button onClick={props.swap}>Swap</button>
    </div>
  );
}

export default gameControls;