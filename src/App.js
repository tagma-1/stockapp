import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import StockInfo from './components/Stockinfo'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Stock Price App</h1>  
        <StockInfo 
          symbol='NFLX'
          companyName='Netflix Inc.'
          primaryExchange='Nasdaq Global Select'
          latestPrice={ 188.15 }
          latestSource='Close'
          week52High={ 204.38 }
          week52Low={ 113.95 }
        />
      </div>
    );
  }
}

export default App;
