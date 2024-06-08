import React, { useState } from 'react';
import './App.css';
import { StarknetProvider } from './providers/StarknetProvider';
import Home from './pages/Home';

function App() {
  const [data, setData] = useState("-")
  return (
    <div className='h-screen w-full bg-sky-950 text-white p-8'>
      <Home/>
    </div>
  );
}

export default App;
