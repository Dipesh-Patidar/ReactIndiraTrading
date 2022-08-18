import React, { useContext, useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Context } from '../../pages/HomePage';

export default () => {
    const { OrderTypeData } = useContext(Context);
    const [sellData, setSellData] = useState("");
    const [buyData, setBuyData] = useState("");
    const [sellDataWithTooltip, setSellDataWithTooltip] = useState("");
    const [buyDataWithTooltip, setBuyDataWithTooltip] = useState("");
    const [tQuantityBuyVlues, setTQuantityBuyValues] = useState("");
    const [tQuantitySellVlues, setTQuantitySellValues] = useState("");
    const [buyTimeXAxis, setBuyTimeXAxis] = useState("");
    const [sellTimeXAxis, setSellTimeXAxis] = useState("");




    const getOrderTypeBuyData = (data) => {
        var groupedByDate = {};
        for (var key in data) {

            var date = data[key].TQuantity;
            if (!groupedByDate[date]) {
                groupedByDate[date] = [];
            }
            groupedByDate[date].push(data[key]);
        }

        var priceValues1 = [];
        var metaArray = [];
        for (var d in groupedByDate) {


            var priceV = groupedByDate[d].map((item) => item.Price).reduce((sum, current) => sum + current, 0)
            var pricesleng = groupedByDate[d].map((item) => item.Price).length
            var totalPrice = priceV / pricesleng

            priceValues1.push([d])
            metaArray.push([d, Math.round(totalPrice * 100) / 100])
        }
        // console.log("metaArraybuy",metaArray)
        setTQuantityBuyValues(d)
        setBuyData(metaArray);

    }

    const getOrderTypeSellData = (data) => {
        var groupedByDate = {};
        for (var key in data) {

            var date = data[key].TQuantity;
            if (!groupedByDate[date]) {
                groupedByDate[date] = [];
            }
            groupedByDate[date].push(data[key]);
        }

        var priceValues1 = [];
        var metaArray = [];
        for (var d in groupedByDate) {


            var priceV = groupedByDate[d].map((item) => item.Price).reduce((sum, current) => sum + current, 0)
            var pricesleng = groupedByDate[d].map((item) => item.Price).length
            var totalPrice = priceV / pricesleng

            priceValues1.push([d])
            metaArray.push([d, Math.round(totalPrice * 100) / 100])
        }
        // console.log("metaArraySell",metaArray)
        setTQuantitySellValues(d)

        setSellData(metaArray);
    }

    const getOrderTypeBuyWithTootip = (data) => {
        var groupedByDate = {};
        for (var key in data) {
            var date = data[key].Time;
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

            // console.log("D",item,"GroupTqua",groupedByDate[item].sort( (a, b) =>   b.TQuantity - a.TQuantity ).map((item)=> item.TQuantity))
            // console.log("D",item,"GroupTNq",groupedByDate[item].sort( (a, b) =>   b.TotalNQ - a.TotalNQ ).map((item)=> item.TotalNQ))
            // console.log("D",item,"GroupPrice",groupedByDate[item].sort( (a, b) =>   b.Price - a.Price ).map((item)=> item.Price))
            // console.log("D",item,"GroupOrderId",groupedByDate[item].sort( (a, b) =>   b.OrderID - a.OrderID ).map((item)=> item.OrderID))

            const SortArrayByTQuantity = groupedByDate[item].sort((a, b) => b.TQuantity - a.TQuantity)
            const SortArrayByTotalNq = groupedByDate[item].sort((a, b) => b.TotalNQ - a.TotalNQ)
            const SortArrayByPrice = groupedByDate[item].sort((a, b) => b.Price - a.Price)
            const SortArrayByOrderId = groupedByDate[item].sort((a, b) => b.OrderID - a.OrderID)


            if (SortArrayByTQuantity.length == 1) {
                metaArray.push({ y: SortArrayByTQuantity[0].Price, Count: SortArrayByTQuantity.length, List: SortArrayByTQuantity.slice(0, 10) })
            }
            else if (SortArrayByTQuantity && SortArrayByTQuantity[0].TQuantity > SortArrayByTQuantity[1].TQuantity) {
                // console.log("TQuantity",SortArrayByTQuantity)

                metaArray.push({ y: SortArrayByTQuantity[0].Price, Count: SortArrayByTQuantity.length, List: SortArrayByTQuantity.slice(0, 10) })

            }
            else if (SortArrayByTotalNq && SortArrayByTotalNq[0].TotalNQ > SortArrayByTotalNq[1].TotalNQ || SortArrayByTotalNq[0].TotalNQ) {
                metaArray.push({ y: SortArrayByTotalNq[0].Price, Count: SortArrayByTotalNq.length, List: SortArrayByTotalNq.slice(0, 10) })

            }
            else if (SortArrayByPrice && SortArrayByPrice[0].Price > SortArrayByPrice[1].Price || SortArrayByPrice[0].Price) {

                metaArray.push({ y: SortArrayByPrice[0].Price, Count: SortArrayByPrice.length, List: SortArrayByPrice.slice(0, 10) })
            }
            else {

                metaArray.push({ y: SortArrayByOrderId[0].Price, Count: SortArrayByOrderId.length, List: SortArrayByOrderId.slice(0, 10) })

            }

            timeValues.push([item])

        })

        setBuyTimeXAxis(timeValues)
        //  console.log("metaArrayBuy",metaArray)
        // return metaArray
        setBuyDataWithTooltip(metaArray)
    }

    const getOrderTypeSellWithTootip = (data) => {
        var groupedByDate = {};
        for (var key in data) {
            var date = data[key].Time;
            if (!groupedByDate[date]) {
                groupedByDate[date] = [];
            }
            groupedByDate[date].push(data[key]);
        }

        var timeValues = [];
        var metaArray = [];
        Object.keys(groupedByDate).forEach((item) => {
            // console.log("D",item,"Group",groupedByDate[item])

            // console.log("D",item,"GroupTqua",groupedByDate[item].sort( (a, b) =>   b.TQuantity - a.TQuantity ).map((item)=> item.TQuantity))
            // console.log("D",item,"GroupTNq",groupedByDate[item].sort( (a, b) =>   b.TotalNQ - a.TotalNQ ).map((item)=> item.TotalNQ))
            // console.log("D",item,"GroupPrice",groupedByDate[item].sort( (a, b) =>   b.Price - a.Price ).map((item)=> item.Price))
            // console.log("D",item,"GroupOrderId",groupedByDate[item].sort( (a, b) =>   b.OrderID - a.OrderID ).map((item)=> item.OrderID))

            const SortArrayByTQuantity = groupedByDate[item].sort((a, b) => b.TQuantity - a.TQuantity)
            const SortArrayByTotalNq = groupedByDate[item].sort((a, b) => b.TotalNQ - a.TotalNQ)
            const SortArrayByPrice = groupedByDate[item].sort((a, b) => b.Price - a.Price)
            const SortArrayByOrderId = groupedByDate[item].sort((a, b) => b.OrderID - a.OrderID)


            if (SortArrayByTQuantity.length == 1) {
                metaArray.push({ y: SortArrayByTQuantity[0].Price, Count: SortArrayByTQuantity.length, List: SortArrayByTQuantity.slice(0, 10) })
            }
            else if (SortArrayByTQuantity && SortArrayByTQuantity[0].TQuantity > SortArrayByTQuantity[1].TQuantity) {
                // console.log("TQuantity",SortArrayByTQuantity)

                metaArray.push({ y: SortArrayByTQuantity[0].Price, Count: SortArrayByTQuantity.length, List: SortArrayByTQuantity.slice(0, 10) })

            }
            else if (SortArrayByTotalNq && SortArrayByTotalNq[0].TotalNQ > SortArrayByTotalNq[1].TotalNQ || SortArrayByTotalNq[0].TotalNQ) {
                metaArray.push({ y: SortArrayByTotalNq[0].Price, Count: SortArrayByTotalNq.length, List: SortArrayByTotalNq.slice(0, 10) })

            }
            else if (SortArrayByPrice && SortArrayByPrice[0].Price > SortArrayByPrice[1].Price || SortArrayByPrice[0].Price) {

                metaArray.push({ y: SortArrayByPrice[0].Price, Count: SortArrayByPrice.length, List: SortArrayByPrice.slice(0, 10) })
            }
            else {

                metaArray.push({ y: SortArrayByOrderId[0].Price, Count: SortArrayByOrderId.length, List: SortArrayByOrderId.slice(0, 10) })

            }

            timeValues.push([item])

        })
        setSellTimeXAxis(timeValues)

        // console.log("metaArrySell",metaArray)
        // return metaArray
        setSellDataWithTooltip(metaArray)
    }

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
            split: false,
            shared: true

        },
        xAxis: {
            gridLineWidth: 1,
            //   categories: tQuantityBuyVlues,
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
                fontWeight: '700',

            },
            enabled: true,
            align: 'center',
            verticalAlign: 'top',
            floating: true
        },
        tooltip: {
            animation: false,
            split: false,
            shared: true

        },
        xAxis: {
            gridLineWidth: 1,
            //   categories: tQuantitySellVlues,
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

                text = "<div class='tooltip1'>" + "<b>Time :</b>" + this.x + '<br>' + "<b>Price :</b>" + this.y + '<br>' + "<b>Count :</b>" + this.points[0].point.Count + '<br>' + "<b>List :</b><br>" + this.points[0].point.List.map((item) => "<li>" + "Price :" + item.Price + " TQuantity :" + item.TQuantity + " TotalNQ :" + item.TotalNQ + "</li>") + "</div>"

                return text
            }

        },
        xAxis: {
            type: "category",
            gridLineWidth: 1,
            categories: buyTimeXAxis,
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
                "data": buyDataWithTooltip,
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
                text = "<div class='tooltip1'>" + "<b>Time :</b>" + this.x + '<br>' + "<b>Price :</b>" + this.y + '<br>' + "<b>Count :</b>" + this.points[0].point.Count + '<br>' + "<b>List :</b><br>" + this.points[0].point.List.map((item) => "<li>" + "Price :" + item.Price + " TQuantity :" + item.TQuantity + " TotalNQ :" + item.TotalNQ + "</li>") + "</div>"

                return text
            }

        },
        xAxis: {
            type: "category",
            gridLineWidth: 1,
            categories: sellTimeXAxis,
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
                "data": sellDataWithTooltip,
                color: '#FF0000',
                tooltip: {
                    valueDecimals: 2
                },

            },

        ]
    };

    useEffect(() => {
        var BuyData = OrderTypeData && OrderTypeData.filter((item) => {
            if (item.OType.toString().toLowerCase().includes("b"))
                return item;
        })

        var SellData = OrderTypeData && OrderTypeData.filter((item) => {
            if (item.OType.toString().toLowerCase().includes("s"))
                return item;
        })

        var BuyDataWithTooltip = OrderTypeData && OrderTypeData.filter((item) => {
            if (item.OType.toString().toLowerCase().includes("b"))
                return item;
        })

        var SellDataWithTooltip = OrderTypeData && OrderTypeData.filter((item) => {
            if (item.OType.toString().toLowerCase().includes("s"))
                return item;
        })


        getOrderTypeBuyData(BuyData);
        getOrderTypeSellData(SellData);
        getOrderTypeBuyWithTootip(BuyDataWithTooltip);
        getOrderTypeSellWithTootip(SellDataWithTooltip);

    }, [OrderTypeData])
    return (
        <>
            <div className="chart">
                <div className="row">
                    <h4>Graphs</h4>

                    <div className="col-md-12">

                        <HighchartsReact
                            highcharts={Highcharts}
                            options={optionsBuy}
                        />
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={optionsSell}
                        />
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={optionsBuyExtra}
                        />
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={optionsSellExtra}
                        />
                    </div>
                    {/* <div className="col-md-12">

                       
                    </div> */}
                </div>
            </div>
        </>
    )
}