import React, { useState } from "react";
import ReactDOM from "react-dom";

//Componente con estado
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

ReactDOM.render(<App />, document.getElementById("root"));
