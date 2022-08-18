import React, { useEffect, useState } from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default function LineGrapgh(props) {
  const {
    dataTrade,
    tradingData
  } = props;

  const [atpGraphData, setAtpGraphData] = useState("");
  const [BatpGraphData, setBATPGraphData] = useState("");
  const [SatpGraphData, setSATPGraphData] = useState("");
  const [XAxisDataValues, setXAxisDataValues] = useState("");

  const GraphData = () => {
    var XAxisData = [];
    var AtpData = [];
    var BatpData = [];
    var SatpData = [];
    Object.values(dataTrade).map((item) => {
      AtpData.push(
        [
          item.ATP]
      )
      BatpData.push([
        item.BATP])
      SatpData.push([
        item.SATP])
      XAxisData.push([item.Time])
    })

    // console.log("CheckATP",AtpData) 
    setAtpGraphData(AtpData);

    setBATPGraphData(BatpData);
    setSATPGraphData(SatpData)
    setXAxisDataValues(XAxisData)
  }

  useEffect(() => {
    GraphData()
  }, [])
  // console.log("varDtaa", VarData)

  const options = {

    yAxis: [{
      offset: 20,

      labels: {
        //  formatter: function () {
        //    return numberFormat.format(this.value) 
        //  }
        //  ,
        x: -15,
        style: {
          "color": "#000", "position": "absolute"

        },
        align: 'left'
      },
    },

    ],
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
      text: `Stock price`
    },
    chart: {
      type: 'spline',
      zoomBySingleTouch: true,
      zoomType: 'x',
      height: 450,
    },

    credits: {
      enabled: false
    },

    legend: {
      enabled: true,
      itemStyle: {
        fontSize: '15px',
        fontWeight: '700'
      }
    },
    //  xAxis: {
    //    type: 'time',
    //   // visible:false,


    //  },
    tooltip: {
      animation: false,
      split: true,
      shared: true

    },

    xAxis: {
      type: 'datetime',
      gridLineWidth: 1,

      categories: XAxisDataValues
    },
    yAxis: {
      gridLineWidth: 1
    },
    rangeSelector: {
      buttons: [{
        type: 'minutes',
        count: 1,
        text: '1m',
      }, {
        type: 'minutes',
        count: 5,
        text: '5m'
      }, {
        type: 'minutes',
        count: 10,
        text: '10m'
      }, {
        type: 'minutes',
        count: 15,
        text: '15m'
      },
      {
        type: 'all',
        text: 'All'
      }],
      selected: 4,

      enabled: false,
      inputEnabled: false
    },
    series: [

      {
        name: 'BATP',
        type: 'spline',
        color: '#00FF00',
        data: BatpGraphData,
        tooltip: {
          valueDecimals: 2
        },

      },
      {
        name: 'SATP',
        type: 'spline',
        color: '#FF0000',
        data: SatpGraphData,
        tooltip: {
          valueDecimals: 2
        },

      },
      {
        name: 'ATP',
        type: 'spline',
        color: '#3d3635',
        data: atpGraphData,
        tooltip: {
          valueDecimals: 2
        },

      },
    ]
  };

  return (
    <div className="chart">
      {/* <h1>Chart</h1> */}

      <div className="row">
        <div className="col-md-12">
          {/* <ReactHighcharts config = {configPrice}></ReactHighcharts> */}
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
          />
        </div>
        <div className="col-md-6"
        >
          {/* <ReactHighcharts config = {configPrice}></ReactHighcharts> */}
        </div>
        <div className="col-md-6">
          {/* <ReactHighcharts config = {configPrice}></ReactHighcharts> */}
        </div>
      </div>

    </div>


  );
}
