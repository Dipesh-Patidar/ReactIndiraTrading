import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
const OrderTypeLineGraph = (props) => {
  const {
    orderTypeData,
    orderTypeGraph
  } = props

  const [sellData, setSellData] = useState("");
  const [buyData, setBuyData] = useState("");
  const [priceVlues, setPriceValues] = useState("");
  const [priceBuyValue, setPriceBuyvalue] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [timeExtraSell, setTimeExtraSell] = useState("");

  const [extraGraphBuyData, setExtraGraphBuyData] = useState("");
  const [extraGraphSellData, setExtraGraphSellData] = useState("");









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
      categories: priceBuyValue,
      // tickInterval: 5

    },
    yAxis: {
      gridLineWidth: 1,
      title: {
        text: 'Price'
      }
    },
    series: [
      {
        name: 'Buy',
        type: 'spline',
        data: buyData,
        color: '#00FF00',
        tooltip: {
          valueDecimals: 2
        },

      },

    ]
  };

  const optionsSell = {
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
        fontWeight: '700'
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
      categories: priceVlues,
      // tickInterval: 5

    },
    yAxis: {
      gridLineWidth: 1,
      title: {
        text: 'Price'
      }
    },
    series: [
      {
        name: 'Sell',
        type: 'spline',
        data: sellData,

        color: '#FF0000',
        tooltip: {
          valueDecimals: 2
        },

      },

    ]
  };

  const optionsBuyExtra = {
    plotOptions: {
      series: {
        showInNavigator: true,
        gapSize: 6,
        series: [{
          stickyTracking: false,
          events: {
            click: function (evt) {
              this.chart.myTooltip.refresh(evt.point, evt);
            },
            mouseOut: function () {
              this.chart.myTooltip.hide();
            }
          }
        }
        ]
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

      useHTML: true,
      animation: false,
      outside: true,
      delayForDisplay: 100000,
      // hideDelay: ,
      style: {
        // width: '100px',
        // whiteSpace: 'pre-wrap'
      },
      split: false,
      shared: true,



      style: {
        color: '#fff',
        width: '300px !important',
        height: 'auto !important',
        zIndex: '999 !important',
      },
      valueDecimals: 0,
      backgroundColor: '#000',
      borderColor: '#000',
      borderRadius: 10,
      borderWidth: 3,




      formatter: function () {
        //  console.log("tooltip",this)
        var text = '';

        text = "<div class='tooltip1'>" + "<b>Time :</b>" + this.x + '<br>' + "<b>Price :</b>" + this.y + '<br>' + "<b>Count :</b>" + this.points[0].point.Count + '<br>' + "<b>List :</b><br>" + this.points[0].point.List.map((item) => "<li>" + "Price :" + item.price + " TQuantity :" + item.tquantity + " TotalNQ :" + item.totalnq + "</li>") + "</div>"

        return text
      }

    },
    xAxis: {
      type: "category",
      gridLineWidth: 1,
      categories: timeValue,
      // tickInterval: 5

    },
    yAxis: {
      gridLineWidth: 1,
      title: {
        text: 'Price'
      }
    },
    series: [
      {
        name: 'Buy',
        type: 'spline',
        "data": extraGraphBuyData,
        color: '#00FF00',
        tooltip: {
          valueDecimals: 2
        },

      },

    ]
  };

  const optionsSellExtra = {
    plotOptions: {
      series: {
        showInNavigator: true,
        gapSize: 6,
        series: [{
          stickyTracking: false,
          events: {
            click: function (evt) {
              this.chart.myTooltip.refresh(evt.point, evt);
            },
            mouseOut: function () {
              this.chart.myTooltip.hide();
            }
          }
        }
        ]
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

      useHTML: true,
      animation: false,
      outside: true,
      delayForDisplay: 100000,
      split: false,
      shared: true,

      style: {
        color: '#fff',
        width: '300px !important',
        height: 'auto !important',
        zIndex: '999 !important',
      },
      valueDecimals: 0,
      backgroundColor: '#000',
      borderColor: '#000',
      borderRadius: 10,
      borderWidth: 3,




      formatter: function () {
        //  console.log("tooltip",this)
        var text = '';
        text = "<div class='tooltip1'>" + "<b>Time :</b>" + this.x + '<br>' + "<b>Price :</b>" + this.y + '<br>' + "<b>Count :</b>" + this.points[0].point.Count + '<br>' + "<b>List :</b><br>" + this.points[0].point.List.map((item) => "<li>" + "Price :" + item.price + " TQuantity :" + item.tquantity + " TotalNQ :" + item.totalnq + "</li>") + "</div>"

        return text
      }

    },
    xAxis: {
      type: "category",
      gridLineWidth: 1,
      categories: timeExtraSell,
      // tickInterval: 5

    },
    yAxis: {
      gridLineWidth: 1,
      title: {
        text: 'Price'
      }
    },
    series: [
      {
        name: 'Sell',
        type: 'spline',
        "data": extraGraphSellData,
        color: '#FF0000',
        tooltip: {
          valueDecimals: 2
        },

      },

    ]
  };

  const GraphDataCalculationBuy = (data) => {
    var groupedByDate = {};
    for (var key in data) {

      var date = data[key].tquantity;
      if (!groupedByDate[date]) {
        groupedByDate[date] = [];
      }
      groupedByDate[date].push(data[key]);
    }

    var priceValues1 = [];
    var metaArray = [];
    for (var d in groupedByDate) {


      var priceV = groupedByDate[d].map((item) => item.price).reduce((sum, current) => sum + current, 0)
      var pricesleng = groupedByDate[d].map((item) => item.price).length
      var totalPrice = priceV / pricesleng

      priceValues1.push([d])
      metaArray.push([d, Math.round(totalPrice * 100) / 100])
    }

    setPriceBuyvalue(priceValues1)
    return metaArray
  }

  const GraphDataCalculationSell = (data) => {
    var groupedByDate = {};
    for (var key in data) {
      var date = data[key].tquantity;
      if (!groupedByDate[date]) {
        groupedByDate[date] = [];
      }
      groupedByDate[date].push(data[key]);
    }
    var priceValues = [];
    var metaArray = [];
    for (var d in groupedByDate) {
      var priceV = groupedByDate[d].map((item) => item.price).reduce((sum, current) => sum + current, 0)
      var pricesleng = groupedByDate[d].map((item) => item.price).length
      var totalPrice = priceV / pricesleng
      priceValues.push([d])
      metaArray.push([d, Math.round(totalPrice * 100) / 100])
    }
    setPriceValues(priceValues)
    return metaArray
  }


  const GraphDataCalculationBuyExtra = (data) => {
    var groupedByDate = {};
    for (var key in data) {
      var date = data[key].time;
      if (!groupedByDate[date]) {
        groupedByDate[date] = [];
      }
      groupedByDate[date].push(data[key]);
    }
    // console.log("groupedByDate",groupedByDate)
    var timeValues = [];
    var metaArray = [];
    // console.log("keys",Object.keys(groupedByDate))
    // console.log("Obje",Object.Values(groupedByDate))

    Object.keys(groupedByDate).forEach((item) => {
      // console.log("D",item,"Group",groupedByDate[item])

      // console.log("D",item,"GroupTqua",groupedByDate[item].sort( (a, b) =>   b.tquantity - a.tquantity ).map((item)=> item.tquantity))
      // console.log("D",item,"GroupTNq",groupedByDate[item].sort( (a, b) =>   b.totalnq - a.totalnq ).map((item)=> item.totalnq))
      // console.log("D",item,"GroupPrice",groupedByDate[item].sort( (a, b) =>   b.price - a.price ).map((item)=> item.price))
      // console.log("D",item,"GroupOrderId",groupedByDate[item].sort( (a, b) =>   b.orderid - a.orderid ).map((item)=> item.orderid))

      const SortArrayByTQuantity = groupedByDate[item].sort((a, b) => b.tquantity - a.tquantity)
      const SortArrayByTotalNq = groupedByDate[item].sort((a, b) => b.totalnq - a.totalnq)
      const SortArrayByPrice = groupedByDate[item].sort((a, b) => b.price - a.price)
      const SortArrayByOrderId = groupedByDate[item].sort((a, b) => b.orderid - a.orderid)


      if (SortArrayByTQuantity.length == 1) {
        metaArray.push({ y: SortArrayByTQuantity[0].price, Count: SortArrayByTQuantity.length, List: SortArrayByTQuantity.slice(0, 10) })
      }
      else if (SortArrayByTQuantity && SortArrayByTQuantity[0].tquantity > SortArrayByTQuantity[1].tquantity) {
        // console.log("tquantity",SortArrayByTQuantity)

        metaArray.push({ y: SortArrayByTQuantity[0].price, Count: SortArrayByTQuantity.length, List: SortArrayByTQuantity.slice(0, 10) })

      }
      else if (SortArrayByTotalNq && SortArrayByTotalNq[0].totalnq > SortArrayByTotalNq[1].totalnq || SortArrayByTotalNq[0].totalnq) {
        metaArray.push({ y: SortArrayByTotalNq[0].price, Count: SortArrayByTotalNq.length, List: SortArrayByTotalNq.slice(0, 10) })

      }
      else if (SortArrayByPrice && SortArrayByPrice[0].price > SortArrayByPrice[1].price || SortArrayByPrice[0].price) {

        metaArray.push({ y: SortArrayByPrice[0].price, Count: SortArrayByPrice.length, List: SortArrayByPrice.slice(0, 10) })
      }
      else {

        metaArray.push({ y: SortArrayByOrderId[0].price, Count: SortArrayByOrderId.length, List: SortArrayByOrderId.slice(0, 10) })

      }

      timeValues.push([item])

    })

    setTimeValue(timeValues)
    //  console.log("TimeArray",timeValues)
    return metaArray

  }

  const GraphDataCalculationSellExtra = (data) => {
    var groupedByDate = {};
    for (var key in data) {
      var date = data[key].time;
      if (!groupedByDate[date]) {
        groupedByDate[date] = [];
      }
      groupedByDate[date].push(data[key]);
    }

    var timeValues = [];
    var metaArray = [];
    Object.keys(groupedByDate).forEach((item) => {
      // console.log("D",item,"Group",groupedByDate[item])

      // console.log("D",item,"GroupTqua",groupedByDate[item].sort( (a, b) =>   b.tquantity - a.tquantity ).map((item)=> item.tquantity))
      // console.log("D",item,"GroupTNq",groupedByDate[item].sort( (a, b) =>   b.totalnq - a.totalnq ).map((item)=> item.totalnq))
      // console.log("D",item,"GroupPrice",groupedByDate[item].sort( (a, b) =>   b.price - a.price ).map((item)=> item.price))
      // console.log("D",item,"GroupOrderId",groupedByDate[item].sort( (a, b) =>   b.orderid - a.orderid ).map((item)=> item.orderid))

      const SortArrayByTQuantity = groupedByDate[item].sort((a, b) => b.tquantity - a.tquantity)
      const SortArrayByTotalNq = groupedByDate[item].sort((a, b) => b.totalnq - a.totalnq)
      const SortArrayByPrice = groupedByDate[item].sort((a, b) => b.price - a.price)
      const SortArrayByOrderId = groupedByDate[item].sort((a, b) => b.orderid - a.orderid)


      if (SortArrayByTQuantity.length == 1) {
        metaArray.push({ y: SortArrayByTQuantity[0].price, Count: SortArrayByTQuantity.length, List: SortArrayByTQuantity.slice(0, 10) })
      }
      else if (SortArrayByTQuantity && SortArrayByTQuantity[0].tquantity > SortArrayByTQuantity[1].tquantity) {
        // console.log("tquantity",SortArrayByTQuantity)

        metaArray.push({ y: SortArrayByTQuantity[0].price, Count: SortArrayByTQuantity.length, List: SortArrayByTQuantity.slice(0, 10) })

      }
      else if (SortArrayByTotalNq && SortArrayByTotalNq[0].totalnq > SortArrayByTotalNq[1].totalnq || SortArrayByTotalNq[0].totalnq) {
        metaArray.push({ y: SortArrayByTotalNq[0].price, Count: SortArrayByTotalNq.length, List: SortArrayByTotalNq.slice(0, 10) })

      }
      else if (SortArrayByPrice && SortArrayByPrice[0].price > SortArrayByPrice[1].price || SortArrayByPrice[0].price) {

        metaArray.push({ y: SortArrayByPrice[0].price, Count: SortArrayByPrice.length, List: SortArrayByPrice.slice(0, 10) })
      }
      else {

        metaArray.push({ y: SortArrayByOrderId[0].price, Count: SortArrayByOrderId.length, List: SortArrayByOrderId.slice(0, 10) })

      }

      timeValues.push([item])

    })
    setTimeExtraSell(timeValues)

    // console.log("metaArry",metaArray)
    return metaArray
  }

  const GraphData = () => {

    if (orderTypeData) {
      var SortData = orderTypeData.sort(function (a, b) {
        return a.tquantity - b.tquantity;
      });

      var BuyData = SortData.filter((item) => {
        if (item.otype.toString().toLowerCase().includes("b"))
          return item;
      })

      var SellData = SortData.filter((item) => {
        if (item.otype.toString().toLowerCase().includes("s"))
          return item;
      })


      var extraBuyData = orderTypeGraph.filter((item) => {
        if (item.otype.toString().toLowerCase().includes("b"))
          return item;
      })

      var extraSellData = orderTypeGraph.filter((item) => {
        if (item.otype.toString().toLowerCase().includes("s"))
          return item;
      })

      // orderTypeGraph
      const BuyChartData = GraphDataCalculationBuy(BuyData);

      const SellChartData = GraphDataCalculationSell(SellData);



      const ExtraChartBuyData = GraphDataCalculationBuyExtra(extraBuyData);

      const ExtraChartSellData = GraphDataCalculationSellExtra(extraSellData)

      // console.log("extraBuyData",extraBuyData)


      setExtraGraphBuyData(ExtraChartBuyData)
      setExtraGraphSellData(ExtraChartSellData)

      setBuyData(BuyChartData);
      setSellData(SellChartData);
    }

  }

  // console.log("timeValue",timeValue.sort())

  useEffect(() => {
    GraphData()
  }, [orderTypeData])

  return (
    <div className="chart">
      <div className="row">
        <div className="col-md-12">

          <HighchartsReact
            highcharts={Highcharts}
            options={optionsBuy}
          />
        </div>
        <div className="col-md-12">
          <HighchartsReact
            highcharts={Highcharts}
            options={optionsSell}
          />
        </div>

        <div className="col-md-12">
          <HighchartsReact
            highcharts={Highcharts}
            options={optionsBuyExtra}
          />
        </div>
        <div className="col-md-12">
          <HighchartsReact
            highcharts={Highcharts}
            options={optionsSellExtra}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderTypeLineGraph;
