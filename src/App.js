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
    guessedChar: '',
    round: 0,
    corrects: 0,
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
    }, 250);

    setTimeout(() => {
      this.setState({
        shouldHideMetric: true
      })
    }, 500)
  }

  startNewRound = () => {
    const { metric, guessedChar, highlightedX, highlightedY } = this.state;

    const isCorrect = guessedChar && guessedChar === metric[highlightedX][highlightedY];

    this.setState(prevState => ({
      round: prevState.round + 1,
      shouldHideMetric: false,
      corrects: isCorrect ? prevState.corrects + 1 : prevState.corrects,
      guessedChar: ''
    }), () => {
      this.setMetric();
    })
  }

  handleGuessedChar = ({ target: { value }}) => {
    const { highlightedX, highlightedY } = this.state;
    
    this.setState({
      guessedChar: value
    })
  }

  render() {
    const { metric, corrects, round, highlightedY, highlightedX, shouldHideChar } = this.state;

    return (
      <div className="App">
        {corrects} / {round}
        {
          this.state.shouldHideMetric ? 
          <div className="controls">
            <input maxLength="1" value={this.state.guessedChar} onChange={this.handleGuessedChar} />
            <button onClick={this.startNewRound}>Next Round</button>
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
