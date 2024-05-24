import React, { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState("-")
  return (
    <div className="App">
      <div> Simple Storage </div>

      <div>
        <span>Data in Storage: </span>
        <span>{data}</span>
      </div>

      <div>
        <button>
          Get Data
        </button>
        <div>
          <input type='text'/>
          <span>Set Data</span>
        </div>
      </div>
    </div>
  );
}

export default App;
