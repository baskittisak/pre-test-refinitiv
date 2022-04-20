import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState("");
  const [method, setMethod] = useState("isPrime");
  const [result, setResult] = useState(false);

  const onChangeNumber = useCallback((value) => {
    let number = "";
    if (value) {
      const isDecimal = value % 1 !== 0;
      const isNegative = value < 1;
      if (isDecimal) {
        number = Math.round(value);
      } else if (isNegative) {
        number = 1;
      } else {
        number = value;
      }
    }
    setNumber(number);
  }, []);

  const isPrime = useCallback((num) => {
    for (let i = 2; i < num; i++) if (num % i === 0) return false;
    return num >= 2;
  }, []);

  const isFibonacci = useCallback((num) => {
    if (num === 1) return true;
    let firstPrevNumber = num - 1,
      secondPrevNumber = num - 2;
    return firstPrevNumber + secondPrevNumber === num;
  }, []);

  const onSetResult = useCallback(() => {
    switch (method) {
      case "isPrime":
        setResult(isPrime(+number));
        break;
      case "isFibonacci":
        setResult(isFibonacci(+number));
        break;
      default:
        break;
    }
  }, [method, number, isPrime, isFibonacci]);

  useEffect(() => {
    onSetResult();
  }, [number, onSetResult]);

  return (
    <div className="row">
      <div className="first-col">
        <input
          type="number"
          value={number}
          onChange={(e) => onChangeNumber(e.target.value)}
        />
      </div>
      <div className="middle-col">
        <select onChange={(e) => setMethod(e.target.value)}>
          <option value="isPrime">isPrime</option>
          <option value="isFibonacci">isFibonacci</option>
        </select>
      </div>
      <div className="last-col">{result.toString()}</div>
    </div>
  );
}

export default App;