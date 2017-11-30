import React from 'react';

function StockInfo({
  symbol, // i.e. NFLX
  companyName, // Netflix Inc.
  primaryExchange, // Nasdaq Global Select
  latestPrice, // 188.15
  latestSource, // Close
  week52High, // 204.38
  week52Low, // 113.95
  logo,
  news
}) {
  return (
    <div>
      <h2><strong>{ symbol }: { companyName }</strong></h2>
      <br />
      <img src={ logo } />
      <h3><strong>Latest Price: </strong>${ latestPrice }</h3>
      <br />
      <div className="row col-md-10">
        <dl className="col-md-4">

          <dt>Week 52 High:</dt>
          <dd>${ week52High }</dd>

          <dt>Week 52 Low:</dt>
          <dd>${ week52Low }</dd>

          <dt>Primary Exchange:</dt>
          <dd>{ primaryExchange }</dd>

        </dl>
        <ul className="col-md-8">
          { news.map((story) => {
            return <li id="news"><a href={story.url}>{story.headline} </a><small>({story.source})</small></li>
          })}
        </ul>
      </div>
      
    </div>
  )
}

export default StockInfo;