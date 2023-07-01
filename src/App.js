import React,{ useState } from "react";
import './App.css';
import ReactDOM from 'react-dom';

function App() {
  const [timer, setTimer] = useState(0);
  const [counter, setCounter] = useState(0);
  const [profileName, setProfileName] = useState("");
  const [employeeList, setEmployeeList] = useState([]);

  const handleStart = () => {
    setTimer(0);
    const interval = setInterval(() => {
      setTimer(timer + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  };

  const handleStop = () => {
    clearInterval(timerInterval);
  };

  const handleReset = () => {
    setTimer(0);
    setCounter(0);
  };

  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  const handleDecrement = () => {
    setCounter(counter - 1);
  };

  const handleSelectEmployee = (employeeName) => {
    setProfileName(employeeName);
  };

  const handleSubmit = () => {
    const data = {
      timer: timer,
      counter: counter,
      profileName: profileName,
    };

    fetch("http://localhost:3000/api/submit", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  const formatTime = (time) => {
    const date = new Date(time * 1000);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  return (
    <div className="App">
      <h1>Timer</h1>
      <div>
        <p>Timer: {formatTime(timer)}</p>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div>
        <p>Counter: {counter}</p>
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div>
        <p>Profile Name: {profileName}</p>
        <select
          name="employeeName"
          onChange={(event) => setProfileName(event.target.value)}
        >
          {employeeList.map((employee) => (
            <option key={employee} value={employee}>
              {employee}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        placeholder="New Employee"
        onChange={(event) => {
          const newEmployee = event.target.value;
          if (newEmployee) {
            setEmployeeList((prevEmployees) => [...prevEmployees, newEmployee]);
          }
        }}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;