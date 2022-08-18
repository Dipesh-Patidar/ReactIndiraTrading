import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default (props) =>{
const {buySummaryData,sellSummaryData} = props

// Calculation for buy Sell Graph 

 var buySellTime = [];
 var buyAvgCount = [];
 var sellAvgCount = [];

 buySummaryData && buySummaryData.map((item)=>{
   buySellTime.push([item.BuyTime]);
   buyAvgCount.push([item.AvgBuyCount]);
 })

 sellSummaryData && sellSummaryData.map((item)=>{
   sellAvgCount.push([item.AvgSellCount]);
 })

//  ************************** End **************************************
  
   const optionsBuy = {
      plotOptions: {
        series: {
          showInNavigator: true,
          gapSize: 6,
  
        }
      },
      rangeSelector: {
        //  selected: 1
      },
      title: {
        text: ''
      },
      chart: {
        type: 'spline',
        zoomBySingleTouch: true,
        zoomType: 'x',
        height: 300,
      },
  
      credits: {
        enabled: false
      },
  
      legend: {
        //     enabled: false,
        itemStyle: {
          fontSize: '15px',
          fontWeight: '700',
  
        },
        enabled: true,
        align: 'center',
        verticalAlign: 'top',
        floating: true
      },
      tooltip: {
        animation: false,
        split: true,
        shared: true
  
      },
      xAxis: {
        gridLineWidth: 1,
        categories: buySellTime,
        // tickInterval: 5
  
      },
      yAxis: {
        gridLineWidth: 1,
        title: {
          text: 'AvgCount'
        }
      },
      series: [
        {
          name: 'Buy',
          type: 'spline',
          data: buyAvgCount,
          color: '#00FF00',
          tooltip: {
            valueDecimals: 2
          },
  
        },
        {
          name: 'Sell',
          type: 'spline',
          data: sellAvgCount,
          color: '#FF0000',
          tooltip: {
            valueDecimals: 2
          },
  
        },
  
      ]
    };
   return(<>
 
 <div className="chart">
        <div className="row">
          <h4>Graphs</h4>
          <div className="col-md-12">

            <HighchartsReact
              highcharts={Highcharts}
              options={optionsBuy}
            />
          </div>
        </div>
      </div>
   </>)
}