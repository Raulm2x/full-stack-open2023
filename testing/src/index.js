import React, { useState } from "react";
import ReactDOM from "react-dom/client";


//Componente con estado
/*
const App = () => {
  const [counter, setCounter] = useState(0);
  const operations = {
    increaseByOne: () => setCounter(counter + 1),
    decreaseByOne: () => setCounter(counter - 1),
    zero: () => setCounter(0),
  };

  //setTimeout(() => setCounter(counter + 1), 1000);
  //console.log("Rendering... " + counter);

  return (
    <div>
      <Display counter={counter} />
      <Button handleClick={operations.increaseByOne} text={"plus"} />
      <Button handleClick={operations.decreaseByOne} text={"minus"} />
      <Button handleClick={operations.zero} text={"zero"} />
    </div>
  );
};

const Display = ({ counter }) => (
  <>
    <p>{counter}</p>
  </>
);

const Button = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
};

//Estado complejo
const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))    
    setLeft(left + 1)  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))   
    setRight(right + 1)  }

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <History allClicks={allClicks} />
    </div>
  )
}
*/

const esPrimo = (num) => {
  if (num < 4) {
    return true;
  }

  const root_num = num ** (1 / 2);
  let count = 2;

  while (count <= root_num) {
    if (num % count === 0) {
      return false;
    }
    count += 1;
  }

  return true;
};

const siguiente = (num) => {
  num += 1;

  while (true) {
    if (esPrimo(num)) {
      return num;
    }
    num += 1;
  }
};

const App = () => {
  const [primo, setPrimo] = useState(1);
  const [allClicks, setAll] = useState([]);

  const handPrimo = () => {
    const nextPrimo = siguiente(primo);
    setAll(allClicks.concat(nextPrimo));
    setPrimo(nextPrimo);
  };
  const resetPrimo = () => {
    setPrimo(1);
    setAll([]);
  };

  return (
    <div>
      {primo}
      <br />
      <button onClick={handPrimo}>Next</button>
      <button onClick={resetPrimo}>Reset</button>
      <History allClicks={allClicks} />
    </div>
  );
};

const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }

  return <div>button press history: {props.allClicks.join(" ")}</div>;
};

const rootElement = document.getElementById('root');

// ReactDOM.render(<App />, rootElement);
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
