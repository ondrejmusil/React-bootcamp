import "./App.css";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  function handleReset() {
    setCount(() => 0);
    setStep(() => 1);
  }

  const today = new Date();
  const adjustedDate = new Date(today.setDate(today.getDate() + count));

  return (
    <div>
      <div>
        <input
          type="range"
          min={0}
          max={10}
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        ></input>
        <span>Step: {step}</span> <br />
      </div>
      <div>
        <button onClick={() => setCount((c) => c - step)}>-</button>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        ></input>
        <button onClick={() => setCount((c) => c + step)}>+</button>
      </div>
      <p>
        {new Date().getDate() === today.getDate() ? (
          <span>Today is: {adjustedDate.toDateString()}</span>
        ) : (
          <span>
            In {count} days it is: {adjustedDate.toDateString()}
          </span>
        )}
      </p>
      {count !== 0 || step !== 1 ? (
        <div>
          <button onClick={handleReset}>RESET</button>
        </div>
      ) : null}
    </div>
  );
}

export default App;
