import './App.css';
import React, { useState, useEffect } from 'react'
function App() {
  const [counter, setCounter] = useState(0)
  const [isRunning, setRunning] = useState(true)

  useEffect(()=>{
    let interval
    if(isRunning){
      interval = setInterval(()=>{
        setCounter(prevCounter => prevCounter + 1)
      }, 1000)
    }

    return()=>{
      clearInterval(interval)
    }

  }, [isRunning])

  const stopCounter = ()=>{
    setRunning(false)
  }

  return(
    <div class="container">
      <div class="container-contador">
        <h1>Counter: {counter}</h1>
        <button onClick={stopCounter} id="btnCounter">Stop Counter</button>
    </div>
    </div>
  )
    
}

export default App;
