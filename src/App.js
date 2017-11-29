import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import StockInfo from './components/Stockinfo'

class App extends Component {
  state={
    quote: {
      symbol: 'NFLX',
      companyName: 'Netflix Inc.',
      primaryExchange: 'Nasdaq Global Select',
      latestPrice: 188.15,
      latestSource: 'Close',
      week52High: 204.38,
      week52Low: 113.95
    }
  }

  render() {
    const { quote } = this.state; 

    return (
      <div className="App">
        <h1>Stock Price App</h1>  
        <StockInfo 
          { ...quote }
        />
      </div>
    );
  }
}

export default App;
