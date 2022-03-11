import React, { useEffect, useState } from 'react';

function App() {
  // useEffect(() => {
  //   fetch('/hej')
  //     .then((response) => response.json())
  //     .then((data) => setData(data.message))
  //     .catch((error) => console.log(error));
  // }, []);

  const buttonHandler = () => {
    console.log('inne');
    fetch('/hej')
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="App">
      <p>heej mmm!! lala</p>
      <button onClick={buttonHandler}>klicka</button>
    </div>
  );
}

export default App;
