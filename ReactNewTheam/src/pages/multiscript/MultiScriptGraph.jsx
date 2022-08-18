import React, { useContext, useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Context } from '../../pages/HomePage';


export default () => {
  const { multiScriptData } = useContext(Context);
  const [buySellXAxisTime, setBuySellAxuisTime] = useState();
  const [buyYAxisData, setBuyYAxisdata] = useState();
  const [SellYAxisData, setSellYAxisdata] = useState();
  const [yAxisFilter, setYAxisFilter] = useState("Count");



  // Buy Calculations 

  const getBuyMultiScripts = (data) => {
    var groupedByDate = {};
    for (var key in data) {

      var date = data[key].Time;
      if (!groupedByDate[date]) {
        groupedByDate[date] = [];
      }
      groupedByDate[date].push(data[key]);
    }

    var metaCountArray = [];
    // console.log("groupedByBUY",groupedByDate);
    if (yAxisFilter === "Count") {


      for (var d in groupedByDate) {
        var Count = groupedByDate[d].map((item) => item.Count).reduce((sum, current) => sum + current, 0)
        var Countleng = groupedByDate[d].map((item) => item.Count).length
        var totalCount = Count / Countleng
        metaCountArray.push([d, totalCount])
      }
    }
    else if (yAxisFilter === "Price") {


      for (var d in groupedByDate) {
        var Price = groupedByDate[d].map((item) => item.Price).reduce((sum, current) => sum + current, 0)
        var Priceleng = groupedByDate[d].map((item) => item.Price).length
        var totalPrice = Price / Priceleng
        metaCountArray.push([d, totalPrice])
      }
    }
    setBuyYAxisdata(metaCountArray)
  }

  // Sell Calculations 

  const getSellMultiScripts = (data) => {
    var groupedByDate = {};
    for (var key in data) {

      var date = data[key].Time;
      if (!groupedByDate[date]) {
        groupedByDate[date] = [];
      }
      groupedByDate[date].push(data[key]);
    }

    var metaCountArray = [];
    // console.log("groupedBySELL",groupedByDate);

    if (yAxisFilter === "Count") {


      for (var d in groupedByDate) {
        var Count = groupedByDate[d].map((item) => item.Count).reduce((sum, current) => sum + current, 0)
        var Countleng = groupedByDate[d].map((item) => item.Count).length
        var totalCount = Count / Countleng
        metaCountArray.push([d, totalCount])
      }
    }
    else if (yAxisFilter === "Price") {

      for (var d in groupedByDate) {
        var Price = groupedByDate[d].map((item) => item.Price).reduce((sum, current) => sum + current, 0)
        var Priceleng = groupedByDate[d].map((item) => item.Price).length
        var totalPrice = Price / Priceleng
        metaCountArray.push([d, totalPrice])
      }
    }

    setSellYAxisdata(metaCountArray)
  }

  // console.log("BuyMultiScript",BuyMultiScript)
  useEffect(() => {

    const BuyMultiScript = multiScriptData && multiScriptData.filter((item) => {
      if (item.OType.toString().includes("B")) {
        return item
      }
    });
    const SellMultiScript = multiScriptData && multiScriptData.filter((item) => {
      if (item.OType.toString().includes("S")) {
        return item
      }
    });

    const CommonTimeIntervals = multiScriptData && multiScriptData.map((item) => item.Time).filter((item, index, arr) => arr.indexOf(item) === index);
    setBuySellAxuisTime(CommonTimeIntervals)
    // console.log("CommonTimeIntervals",CommonTimeIntervals)

    getBuyMultiScripts(BuyMultiScript);
    getSellMultiScripts(SellMultiScript)

  }, [multiScriptData, yAxisFilter])

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
      categories: buySellXAxisTime,
      // tickInterval: 5

    },
    yAxis: {
      gridLineWidth: 1,
      title: {
        text: yAxisFilter
      }
    },
    series: [
      {
        name: 'Buy',
        type: 'spline',
        data: buyYAxisData,
        color: '#00FF00',
        tooltip: {
          valueDecimals: 2
        },

      },
      {
        name: 'Sell',
        type: 'spline',
        data: SellYAxisData,
        color: '#FF0000',
        tooltip: {
          valueDecimals: 2
        },

      },

    ]
  };

  return (
    <>

      <div className="chart">
        <div className="row">
          <h4>Graphs</h4>
          <div className="col-md-2 mb-3 common_margin">
            <label style={{ fontWeight: "bold", color: "black" }}>
              Y-Axis
            </label>
            <select
              className="form-control"
              onChange={(e) => {
                setYAxisFilter(e.target.value);
              }}
              value={yAxisFilter}
              name="filter"
            >
              <option value="Count">Count</option>
              <option value="Price">Price</option>

            </select>
          </div>
          <div className="col-md-12">

            <HighchartsReact
              highcharts={Highcharts}
              options={optionsBuy}
            />
          </div>
        </div>
      </div>

    </>
  )
}