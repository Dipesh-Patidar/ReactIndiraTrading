import React, { useContext, useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Context } from '../../pages/HomePage';

export default () => {
    const { AtpCalculatorData } = useContext(Context);
    const [atpGraphData, setAtpGraphData] = useState("");
    const [BatpGraphData, setBATPGraphData] = useState("");
    const [SatpGraphData, setSATPGraphData] = useState("");
    const [CnbqGraphData, setCnbqGraphData] = useState("");
    const [CnsqGraphData, setCnsqGraphData] = useState("");
    const [NbqGraphData, setNbqGraphData] = useState("");
    const [NsqGraphData, setNsqGraphData] = useState("");
    const [NbvGraphData, setNbvGraphData] = useState("");
    const [NsvGraphData, setNsvGraphData] = useState("");
    const [XAxisDataValues, setXAxisDataValues] = useState("");

    const getAtpGraphData = () => {
        var XAxisData = [];
        var AtpData = [];
        var BatpData = [];
        var SatpData = [];
        var CnbqData = [];
        var CnsqData = [];
        var NbqData = [];
        var NsqData = [];
        var NbvData = [];
        var NsvData = [];
        AtpCalculatorData && AtpCalculatorData.map((item) => {
            AtpData.push(
                [
                    item.ATP]
            )
            BatpData.push([
                item.BATP])
            SatpData.push([
                item.SATP])
            CnbqData.push([
                item.CNBQ])
            CnsqData.push([
                item.CNSQ])
            NbqData.push([
                item.NBQ])
            NsqData.push([
                item.NSQ])
            NbvData.push([
                item.BANP * item.NSQ])
            NsvData.push([
                item.SANP * item.NSQ])
            XAxisData.push([item.Time])
        })

        // console.log("CheckATP",AtpData) 
        setAtpGraphData(AtpData);
        setBATPGraphData(BatpData);
        setSATPGraphData(SatpData);
        setCnbqGraphData(CnbqData);
        setCnsqGraphData(CnsqData);
        setNbqGraphData(NbqData);
        setNsqGraphData(NsqData);
        setNbvGraphData(NbvData);
        setNsvGraphData(NsvData);
        setXAxisDataValues(XAxisData)
    }
    useEffect(() => {
        getAtpGraphData()
    }, [AtpCalculatorData])


    const options = {

        yAxis: [{
            offset: 20,

            labels: {

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
            zoomType: 'xy',
            height: 320,
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

    const options1 = {

        yAxis: [{
            offset: 20,

            labels: {

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
            zoomType: 'xy',
            height: 320,
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

        series: [

            {
                name: 'CNBQ',
                type: 'spline',
                color: '#00FF00',
                data: CnbqGraphData,
                visible: true,
                tooltip: {
                    valueDecimals: 2
                },

            },
            {
                name: 'CNSQ',
                type: 'spline',
                color: '#FF0000',
                data: CnsqGraphData,
                visible: true,
                tooltip: {
                    valueDecimals: 2
                },

            },
            {
                name: 'NBQ',
                type: 'spline',
                color: '#00FF00',
                data: NbqGraphData,
                visible: false,
                tooltip: {
                    valueDecimals: 2
                },

            },
            {
                name: 'NSQ',
                type: 'spline',
                color: '#FF0000',
                data: NsqGraphData,
                visible: false,
                tooltip: {
                    valueDecimals: 2
                },

            },
            {
                name: 'NBV',
                type: 'spline',
                color: '#00FF00',
                data: NbvGraphData,
                visible: false,
                tooltip: {
                    valueDecimals: 2
                },

            },
            {
                name: 'NSV',
                type: 'spline',
                color: '#FF0000',
                data: NsvGraphData,
                visible: false,
                tooltip: {
                    valueDecimals: 2
                },

            },

        ]
    };
    // console.log("Option",options1)
    // if(options1.series[2].visible === "true"){
    //     console.log("Update")
    //     options1.series[0].visible = "false"
    //     options1.series[1].visible = "false"

    // }
    return (
        <>
            <div className="chart">
                <div className="row">
                    <h4>Graphs</h4>

                    <div className="col-md-12">

                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                        />
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options1}
                        />
                    </div>
                    {/* <div className="col-md-12">

                       
                    </div> */}
                </div>
            </div>
        </>
    )
}