import React, { useEffect, useState } from 'react';

const Stock = (props) => {

  const { bizDaysSinceFeb20, stockInfo } = props;

  const potProfitMargin = (potProfMarg) => {
    return potProfMarg.toFixed(3);
  }
 
  return(
    <div>
      <div style={styles.header}>
        <h4>Company</h4>
        <h4>Feb. 20th Price</h4>
        <h4>Current Price</h4>
        <h4>Pot. Profit Margin</h4>
      </div>
      {
        Object.entries(stockInfo).map(data => {
          return Object.values(data[1]).map(data => {
            console.log('data ', data.historical)
            return(
              <div key={data.symbol} style={styles.stockItem}>
                <div>{data.symbol}</div>
                <div>{data.historical[bizDaysSinceFeb20 - 1].low}</div>
                <div>{data.historical[0].low}</div>
                <div>{potProfitMargin(1 - data.historical[0].low / data.historical[bizDaysSinceFeb20 - 1].low)}</div>
              </div>
            )
          })
        })
      }
    </div>
  )
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  stockItem: {
    display: 'flex',
    justifyContent: 'space-evenly'
  }
}

export default Stock;