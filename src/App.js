import React, { useState } from 'react';
import './App.css';
import * as math from 'mathjs';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('0');

  const handleNumberClick = (value) => {
    if (value === '0' && input === '0') return;
    if (value === '.' && input.includes('.')) return;
    setInput((prevInput) => prevInput + value);
  };   

  const handleOperatorClick = (value) => {
    if (input === '') return;
    const lastChar = input[input.length - 1];
    const secondLastChar = input[input.length - 2];
    
    if (['+', '*', '/'].includes(lastChar)) {
      if (value === '-') {
        setInput((prevInput) => prevInput + value);
      } else {
        setInput((prevInput) => prevInput.slice(0, -1) + value);
      }
    } else if ((lastChar === '-' && secondLastChar !== '-') || (lastChar === '+' && secondLastChar !== '-')) {
      setInput((prevInput) => prevInput.slice(0, -1) + value);
    } else {
      setInput((prevInput) => prevInput + value);
    }
  };          

  const handleClear = () => {
    setInput('');
    setOutput('0');
  };

  const handleEquals = () => {
    try {
      const result = math.evaluate(input);
      // Round the result to 4 decimal places
      setOutput(parseFloat(result.toFixed(4)).toString());
      setInput(result.toString());
    } catch (error) {
      setOutput('Error');
    }
  };  

  const handleClick = (value) => {
    if (value === '=') {
      handleEquals();
    } else if (value === 'C') {
      handleClear();
    } else if (['+', '-', '*', '/'].includes(value)) {
      handleOperatorClick(value);
    } else {
      handleNumberClick(value);
    }
  };

  return (
    <div className="calculator">
      <div id="display" className="display">
        {input || output}
      </div>
      <div className="buttons">
        <button id="clear" className="button" onClick={() => handleClick('C')}>
          C
        </button>
        <button id="seven" className="button" onClick={() => handleClick('7')}>
          7
        </button>
        <button id="eight" className="button" onClick={() => handleClick('8')}>
          8
        </button>
        <button id="nine" className="button" onClick={() => handleClick('9')}>
          9
        </button>
        <button id="divide" className="button" onClick={() => handleClick('/')}>
          ÷
        </button>
        <button id="four" className="button" onClick={() => handleClick('4')}>
          4
        </button>
        <button id="five" className="button" onClick={() => handleClick('5')}>
          5
        </button>
        <button id="six" className="button" onClick={() => handleClick('6')}>
          6
        </button>
        <button id="multiply" className="button" onClick={() => handleClick('*')}>
          ×
        </button>
        <button id="one" className="button" onClick={() => handleClick('1')}>
          1
        </button>
        <button id="two" className="button" onClick={() => handleClick('2')}>
          2
        </button>
        <button id="three" className="button" onClick={() => handleClick('3')}>
          3
        </button>
        <button id="subtract" className="button" onClick={() => handleClick('-')}>
          -
        </button>
        <button id="zero" className="button" onClick={() => handleClick('0')}>
          0
        </button>
        <button id="decimal" className="button" onClick={() => handleClick('.')}>
          .
        </button>
        <button id="equals" className="button" onClick={() => handleClick('=')}>
          =
        </button>
        <button id="add" className="button" onClick={() => handleClick('+')}>
          +
        </button>
      </div>
    </div>
  );
}

export default App;
