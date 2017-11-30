import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import StockInfo from './components/Stockinfo'
import { fetchStockQuote } from './api/iex'


class App extends Component {
  state={
    quote: null
  }
  
  componentDidMount() {
    fetchStockQuote('nflx')
      .then((quote) => {
        this.setState({ quote: quote })
      })
  }

  render() {
    const { quote } = this.state; 

    return (
      <div className="App">
        <h1>Stock Price App</h1> 
        {
          !!quote ? (
            <StockInfo
              { ...quote }
            />
          ) : (
            <p>Loading...</p>
          )
        } 
      </div>
    );
  }
}

export default App;
