import { useState } from "react";

function StepCounter({ initialValue = 0, step = 1 }) {
  const [count, setCount] = useState(initialValue);
  const [history, setHistory] = useState([]);
  const [operationCount, setOperationCount] = useState(0);

  const applyChange = (delta) => {
    const nextCount = count + delta;
    setCount(nextCount);
    setHistory((prev) => [...prev, nextCount]);
    setOperationCount((prev) => prev + 1);
  };

  const handleReset = () => {
    setCount(initialValue);
    setHistory([]);
    setOperationCount(0);
  };

  const lastFive = history.slice(-5);

  return (
    <section>
      <h3>StepCounter</h3>

      <p>Current count: {count}</p>
      <p>Total operations: {operationCount}</p>

      <button onClick={() => applyChange(step)}>Increment (+{step})</button>
      <button onClick={() => applyChange(-step)}>Decrement (-{step})</button>
      <button onClick={handleReset}>Reset</button>

      <h4>History (last 5)</h4>
      <ul>
        {lastFive.map((value, index) => (
          <li key={`${value}-${index}`}>{value}</li>
        ))}
      </ul>
    </section>
  );
}

export default StepCounter;
