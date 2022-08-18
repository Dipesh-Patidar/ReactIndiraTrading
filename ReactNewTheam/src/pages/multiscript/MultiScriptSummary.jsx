import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from '@themesberg/react-bootstrap';
import { Context } from '../../pages/HomePage';
import { CounterWidget } from "../../components/Widgets";
import DataTable from '../../common/DataTable';
import MultiScriptSummaryGraph from './MultiScriptSummaryGraph';



export default (props) => {
    const { backToForm } = props
    const { multiScriptData } = useContext(Context);
    const [multiScriptSummayData, setMultiScriptSummaryData] = useState("")
    const [multiScriptSummayData1, setMultiScriptSummaryData1] = useState("")


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

    const getBuyMultiScripts = (data, yAxisFilter) => {
        var groupedByDate = {};
        for (var key in data) {

            var date = data[key].Time;
            if (!groupedByDate[date]) {
                groupedByDate[date] = [];
            }
            groupedByDate[date].push(data[key]);
        }


        var metaBuyArray = [];


        for (var d in groupedByDate) {
            var Count = groupedByDate[d].map((item) => item.Count).reduce((sum, current) => sum + current, 0);
            var Countleng = groupedByDate[d].map((item) => item.Count).length
            var totalCount = Count / Countleng
            var Price = groupedByDate[d].map((item) => item.Price).reduce((sum, current) => sum + current, 0)
            var Priceleng = groupedByDate[d].map((item) => item.Price).length
            var totalPrice = Price / Priceleng
            metaBuyArray.push({
                BuyTime: d,
                AvgBuyCount: totalCount,
                AvgBuyPrice: Math.round(totalPrice * 100) / 100
            })
        }

        setMultiScriptSummaryData(metaBuyArray)


    }

    const getSellMultiScripts = (data, yAxisFilter) => {
        var groupedByDate = {};
        for (var key in data) {

            var date = data[key].Time;
            if (!groupedByDate[date]) {
                groupedByDate[date] = [];
            }
            groupedByDate[date].push(data[key]);
        }


        var metaSellArray = [];


        for (var d in groupedByDate) {
            var Count = groupedByDate[d].map((item) => item.Count).reduce((sum, current) => sum + current, 0);
            var Countleng = groupedByDate[d].map((item) => item.Count).length
            var totalCount = Count / Countleng
            var Price = groupedByDate[d].map((item) => item.Price).reduce((sum, current) => sum + current, 0)
            var Priceleng = groupedByDate[d].map((item) => item.Price).length
            var totalPrice = Price / Priceleng
            metaSellArray.push({
                SellTime: d,
                AvgSellCount: totalCount,
                AvgSellPrice: Math.round(totalPrice * 100) / 100
            })
        }

        setMultiScriptSummaryData1(metaSellArray)

    }

    //Buy & Sell Traffic Calculation and show in cards


    const TotalBuyCount = multiScriptSummayData && multiScriptSummayData.map((item) => item.AvgBuyCount).reduce((sum, current) => sum + current, 0)
    const TotalSellCount = multiScriptSummayData1 && multiScriptSummayData1.map((item) => item.AvgSellCount).reduce((sum, current) => sum + current, 0)
    const avgBuyCount = Math.round(TotalBuyCount / multiScriptSummayData.length);
    const avgSellCount = Math.round(TotalSellCount / multiScriptSummayData1.length);

//  *********************** End ********************************************************

    useEffect(() => {
        getBuyMultiScripts(BuyMultiScript, "Buy");
        getSellMultiScripts(SellMultiScript, "Sell");

        // getBuyMultiScripts();

    }, [multiScriptData])

    const columns = [

        {
            name: "BuyTime",
            selector: (row) => row.BuyTime,
            sortable: true,
        },
        {
            name: "Average BuyCount",
            selector: (row) => row.AvgBuyCount,
            sortable: true,
        },
        {
            name: "Average BuyPrice",
            selector: (row) => row.AvgBuyPrice,
            sortable: true,
        },
    ];

    const columns1 = [
        {
            name: "SellTime",
            selector: (row) => row.SellTime,
            sortable: true,
        },
        {
            name: "Average SellCount",
            selector: (row) => row.AvgSellCount,
            sortable: true,
        },
        {
            name: "Average SellPrice",
            selector: (row) => row.AvgSellPrice,
            sortable: true,
        },
    ];




    return (
        <>
            <div>
                <div className="content tablesize">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header order_type">
                                    <button
                                        onClick={() => backToForm()}
                                        className="export-btn back back-btn-class">
                                        <FontAwesomeIcon icon={faArrowAltCircleLeft} className="me-1" />
                                        Back </button>

                                    <h4 className="card-title">MultiScript Summary</h4>
                                </div>
                                <div className="content tablesize" >
                                    <div className="row justify-contant-start">

                                        <Row className="justify-content-md-center">
                                            <Col xs={12} sm={6} xl={4} className="mb-4">
                                                <CounterWidget
                                                    category="Buy Traffic"
                                                    title={avgBuyCount}
                                                    // percentage="18.2"
                                                    icon={faChartLine}
                                                    iconColor="shape-secondary"
                                                    percentageColor="text-success"
                                                />
                                            </Col>
                                            <Col xs={12} sm={6} xl={4} className="mb-4">
                                                <CounterWidget
                                                    category="Sell Traffic"
                                                    title={avgSellCount}
                                                    // percentage="18.2"
                                                    icon={faChartLine}
                                                    iconColor="shape-secondary"
                                                    percentageColor="text-danger"

                                                />
                                            </Col>
                                        </Row>
                                        <Row className="justify-content-md-center">
                                            <Col xs={12} sm={6} xl={6} className="mb-4">
                                                <DataTable columns={columns} data={multiScriptSummayData && multiScriptSummayData} />
                                            </Col>
                                            <Col xs={12} sm={6} xl={6} className="mb-4">
                                                <DataTable columns={columns1} data={multiScriptSummayData1 && multiScriptSummayData1} />

                                            </Col>

                                        </Row>

                                    </div>
                                </div>


                            <MultiScriptSummaryGraph buySummaryData={multiScriptSummayData && multiScriptSummayData} sellSummaryData={multiScriptSummayData1 && multiScriptSummayData1}/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}