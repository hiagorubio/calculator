import React, { Component } from 'react';
import './Calculator.css';
import Button from '../components/Button';
import Display from '../components/Display';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0
};

const OPERATIONS = {
  equals: '=',
  sum: '+',
  subtraction: '-',
  division: '/',
  multiplication: '*'
};

const handleOperation = (values, operation) => {
  console.log('LOG >>>>>: handleOperation -> operation', typeof operation)
  console.log('LOG >>>>>: handleOperation -> values', values)
  const { valueOne, valueTwo } = values;
  switch (operation) {
    case '+':
      console.log('LOG >>>>>: handleOperation -> valueOne', valueOne)
      console.log('LOG >>>>>: handleOperation -> valueTwo', valueTwo)
      console.log('LOG >>>>>: handleOperation -> valueOne + valueTwo', valueOne + valueTwo)
      return valueOne + valueTwo;
    case '-':
      return valueOne - valueTwo;
    case '/':
      return valueOne / valueTwo;
    case '*':
      return valueOne * valueTwo;
    default: return
  }
};

export default class Calculator extends Component {
  state = { ...initialState };

  clearMemory() {
    this.setState({ ...initialState });
  };

  setOperation(operation) {

    if (!this.state.current) {
      this.setState({ operation, current: 1, clearDisplay: 1 })
    } else {
      const state = { ...this.state };
      const isEqualsOperation = operation === OPERATIONS.equals;
      const currentOperation = state.operation;
      const values = state.values;
      console.log('LOG >>>>>: Calculator -> setOperation -> values', values)
      const result = handleOperation(values, currentOperation);
      values[0] = result;
      values[1] = 0;

      this.setState({
        displayValue: values[0],
        operation: isEqualsOperation ? null : operation,
        current: isEqualsOperation ? 0 : 1,
        clearDisplay: !isEqualsOperation,
        values
      })
    }
  };

  addDigit(digit) {
    if (digit === '.' && this.state.displayValue.includes('.')) return;
    const clearDisplay = this.state.clearDisplay || this.state.displayValue === '0';
    const currentValue = clearDisplay ? '' : this.state.displayValue;
    const displayValue = currentValue + digit;
    this.setState({ displayValue, clearDisplay: false });

    if (digit !== '.') {
      const index = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = { ...this.state.values };
      values[index] = newValue;
      this.setState({ values });
    }

  };

  render() {
    const addDigit = digit => this.addDigit(digit);
    const setOperation = operation => this.setOperation(operation);
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={() => this.clearMemory()} triple />
        <Button label={OPERATIONS.division} click={setOperation} operation />
        <Button label="7" click={addDigit} />
        <Button label="8" click={addDigit} />
        <Button label="9" click={addDigit} />
        <Button label={OPERATIONS.multiplication} click={setOperation} operation />
        <Button label="4" click={addDigit} />
        <Button label="5" click={addDigit} />
        <Button label="6" click={addDigit} />
        <Button label={OPERATIONS.subtraction} click={setOperation} operation />
        <Button label="1" click={addDigit} />
        <Button label="2" click={addDigit} />
        <Button label="3" click={addDigit} />
        <Button label={OPERATIONS.sum} click={setOperation} operation />
        <Button label="0" click={addDigit} double />
        <Button label="." click={addDigit} />
        <Button label={OPERATIONS.equals} click={setOperation} operation />
      </div>
    )
  }
}