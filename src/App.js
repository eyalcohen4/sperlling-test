import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Row = ({ row, highlightIndex, hide }) => {
  console.log(highlightIndex);
  return (
    <div className="row">
      {row.map((char, index) => <span className={`char ${highlightIndex !== null && highlightIndex === index && hide ? 'highlight' : ''}`}>
      {hide ? '' : char}
      </span>)}
    </div>
  )
}

const Metric = ({ metric, onClick, highlightedX, highlightedY, shouldHideChar }) => {
  return (
    <div className="metric">
      {metric.map((row, index) => (
        <Row onClick={onClick} hide={shouldHideChar} highlightIndex={highlightedX === index ? highlightedY : null} row={row} index={index} />)
      )}
    </div>
  )
};

class App extends Component {
  chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  state = {
    metric: [],
    highlightedX: null,
    highlightedY: null,
    shouldHideChar: false,
    shouldHideMetric: false,
    guessedChar: ''
  }

  componentDidMount() {
    this.setMetric();
  }
  
  setMetric = () => {
    let metric = [];

    for (let i = 0; i < 3; i++) {
      let row = [];

      for (let j = 0; j < 3; j++) {
        const random = Math.floor(Math.random() * Math.floor(this.chars.length));
        row.push(this.chars[random]);
      }
    
      metric.push(row);
      row = [];
    }

    this.setState({
      metric,
      shouldHideChar: true,
      highlightedX: Math.floor(Math.random() * Math.floor(metric.length)),
      highlightedY: Math.floor(Math.random() * Math.floor(metric.length))
    });

    setTimeout(() => {
      this.setState({
        shouldHideChar: false
      });
    }, 500);

    setTimeout(() => {
      this.setState({
        shouldHideMetric: true
      })
    }, 750)
  }

  handleGuessedChar = ({ target: { value }}) => {
    const { highlightedX, highlightedY } = this.state;
    
    this.setState({
      guessedChar: value
    })
  }

  render() {
    const { metric, highlightedY, highlightedX, shouldHideChar } = this.state;

    return (
      <div className="App">
        {
          this.state.shouldHideMetric ? 
          <div>
            <input maxLength="1" value={this.state.guessedChar} onChange={this.handleGuessedChar} />
            {this.state.guessedChar && this.state.guessedChar === metric[highlightedX][highlightedY] ? 'WON' : '...'}
          </div> :
          this.state.metric && 
          this.state.metric.length ? 
          <Metric metric={metric} shouldHideChar={shouldHideChar} highlightedY={highlightedY} highlightedX={highlightedX} /> :
          <div>LOADING...</div>
        }
      </div>
    );
  }
}

export default App;
