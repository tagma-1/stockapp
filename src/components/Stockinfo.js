import React from 'react';

function StockInfo({
  symbol, // i.e. NFLX
  companyName, // Netflix Inc.
  primaryExchange, // Nasdaq Global Select
  latestPrice, // 188.15
  latestSource, // Close
  week52High, // 204.38
  week52Low // 113.95
}) {
  return (
    <div>
      <h2>{ symbol }: { companyName }</h2>
      <h3>{ latestPrice}</h3>
      <dl>

        <dt>Week 52 High</dt>
        <dd>{ week52High }</dd>

        <dt>Week 52 Low</dt>
        <dd>{ week52Low }</dd>

        <dt>Primary Exchange</dt>
        <dd>{ primaryExchange }</dd>

      </dl>
    </div>
  )
}

export default StockInfo;