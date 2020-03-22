import React, { useEffect, useState } from 'react';
import Stock from './Stock';
import './App.css';


const App = () => {
  const [stockData, setStockData] = useState([]);
  const [bizDaysSinceFeb20, setBizDaysSinceFeb20] = useState(null);

  useEffect(() => {
    const startDate = new Date('02/20/2020');
    const endDate = new Date();
     
    const getBusinessDatesCount = (startDate, endDate) => {
      var count = 0;
      var curDate = startDate;
      while (curDate <= endDate) {
          var dayOfWeek = curDate.getDay();
          if(!((dayOfWeek == 6) || (dayOfWeek == 0)))
              count++;
          curDate.setDate(curDate.getDate() + 1);
      }
      return count;
    }
    const numOfDates = getBusinessDatesCount(startDate,endDate);
    setBizDaysSinceFeb20(numOfDates);
    
    const API_KEY = '816c309df2398a5f09e1a375243484d9';
    const STOCK_TICKERS = 'MSFT,FB,AAPL'
    fetch(`https://fmpcloud.io/api/v3/historical-price-full/${STOCK_TICKERS}?timeseries=${numOfDates}&apikey=${API_KEY}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setStockData(data);
      })
  }, []);

  return (
    <div className="App">
      <Stock 
        bizDaysSinceFeb20={bizDaysSinceFeb20}
        stockInfo={stockData}>
      </Stock>
    </div>
  );
}

export default App;
