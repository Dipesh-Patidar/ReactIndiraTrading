import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Table } from '@themesberg/react-bootstrap';
import { Context } from '../../pages/HomePage';
import DataTable from '../../common/DataTable';



export default (props) => {
    const { backToForm } = props
    const { OrderTypeData } = useContext(Context);
    const [oderDetailCount, setOrderDetailCount] = useState("");
    const [nSLO, setNSLO] = useState("");
    const [pendOrders, setPendOrders] = useState("");
    const [OrderIdTime, setOrderIdTime] = useState("");
    const [OrderIdTQuantity, setOrderIdTQuantity] = useState("");
    const [OrderIdTotalNQ, setOrderIdTotalNQ] = useState("");

    //Filters State

    const [activeFilters, setActiveFilters] = useState([]);
    const [filteredValues, setFilteredValues] = useState([]);

    const [selectTQuantity, setSelectTQuantity] = useState("");
    const [tQuantityFilter, setTQuantityFilter] = useState("");
    const [noOfOrders,setNoOfOrders] = useState("");




    // console.log("OrderTypeData", OrderTypeData)
    const FilterBuySell = (sb, order) => {
        const sellBuy = OrderTypeData && OrderTypeData.filter((item) => {
            if (item.OType.toString().toLowerCase().includes(sb)) {
                return item;
            }
        });
        var dSellBuy = sellBuy && sellBuy.filter((item) => {
            if (item.OrderN.toString().toLowerCase().includes(order)) {
                return item;
            }
        });
        return dSellBuy;
    };

    const TotalQuantity = (sb, order, tq) => {
        const Value = FilterBuySell(sb, order);
        if (tq == "tq") {
            var Tq = Value.map((item) => {
                return item.TQuantity;
            });
        }
        if (tq == "nq") {
            var Tq = Value.map((item) => {
                return item.TotalNQ;
            });
        }
        const total = Tq.reduce((a, b) => a + b, 0);
        return total;
    };

    //***************************** */ OrderDetails counter Calclulation ***************************

    const orderDetailsCounter = (e) => {
        if (e.target.value === "") {
            setOrderIdTime("");
            setOrderIdTQuantity("");
            setOrderIdTotalNQ("");
            setOrderDetailCount("");
            setNSLO("");
            setPendOrders("")
        }
        var Orders = OrderTypeData && OrderTypeData.filter((item) => {
            if (item.OrderID.toString() === e.target.value) {
                return item;
            }
        })
        setOrderIdTime(Orders[0].Time)
        setOrderIdTQuantity(Orders[0].TQuantity)
        setOrderIdTotalNQ(Orders[0].TotalNQ)
        const orderId = Orders[0].OrderID;
        const Price = Orders[0].Price;
        const OType = Orders[0].OType;
        const OrderCount = OrderTypeData && OrderTypeData.filter((item) => {
            if (item.OrderID < orderId && item.OType === OType && item.Price === Price && item.TotalNQ > item.TQuantity) {
                return item;
            }
        })
        setOrderDetailCount(OrderCount.length)
        // console.log("oCount",OrderCount);
        const NoSLO = OrderCount.filter((item) => {
            if (item.OrderN === 'SLO') {
                return item;
            }
        })
        var OrderSlo = 0
        if (Orders[0].OrderN === 'SLO') {
            var OrderSlo = 1
        }
        setNSLO(NoSLO.length + OrderSlo)

        const PendTotalNq = OrderCount.map((item) => {
            return item.TotalNQ
        })
        const SumTotalNq = PendTotalNq.reduce((a, b) => a + b, 0) + Orders[0].TotalNQ
        // console.log("pendNQ",SumTotalNq);

        const PendTQuantity = OrderCount.map((item) => {
            return item.TQuantity
        })
        const SumTQuantity = PendTQuantity.reduce((a, b) => a + b, 0) + Orders[0].TQuantity
        //  console.log("pendTQ",SumTQuantity);
        setPendOrders(SumTotalNq - SumTQuantity)
    }

    // *******************************************End *********************************************

    const columns = [
        {
            name: "SNo.",
            selector: (row) => row.SNO,
            sortable: true,

        },
        {
            name: "Quantity",
            selector: (row) => row.TotalNQ,
            sortable: true,

        },
        {
            name: "Count",
            selector: (row) => row.SQCount,
            sortable: true,
        },


    ];


    var data1 = []
    var data2 = []

    var Buy = filteredValues && filteredValues.filter((item) => {
        if (item.OType.toString().toLowerCase().includes('b')) {
            return item;
        }
    });

    var sell = filteredValues && filteredValues.filter((item) => {
        if (item.OType.toString().toLowerCase().includes('s')) {
            return item;
        }
    });

    function uniqueByKey(array, key) {
        return [...new Map(array.map((x) => [x[key], x])).values()];
    }


    const uniqueValBuy = uniqueByKey(Buy, "TotalNQ")
    uniqueValBuy.map((item, index) => {
        data1.push({
            SNO: index,
            TotalNQ: item.TotalNQ,
            SQCount: item.SQCount,

        })
    })


    const uniqueValSell = uniqueByKey(sell, "TotalNQ")

    uniqueValSell.map((item, index) => {
        data2.push({
            SNO: index,
            TotalNQ: item.TotalNQ,
            SQCount: item.SQCount,
        })

    })

    const searchRecord = (event) => {
        const { target } = event;

        const isInFilter = activeFilters.some((element) => element.name === target.name);
        if (!isInFilter) {
            setActiveFilters((currentState) => {
                return [...currentState, { name: target.name, value: target.value }];
            });
        } else {
            setActiveFilters((currentState) => {
                return [...currentState.filter((x) => x.name !== target.name), { name: target.name, value: target.value }];
            });
        }
    }


    useEffect(() => {
        // Just set full data as filtered values if no filter is active


        if (activeFilters.length === 0) {
            // console.log("OrderTypeData",OrderTypeData)
            setFilteredValues(OrderTypeData && OrderTypeData);
            return;
        };

        let finalData = [...OrderTypeData];


        // OrderN Filter Calculations


        // Returns undefined if it cannot find the element with .name === 'list' in array, otherwise it will return that element
        const noOfOrdersNData = activeFilters.find((element) => (element.name == 'noOfOrders'));
        if (noOfOrdersNData) {
            // Do some filtering for first select/dropdown
            const { value, name } = noOfOrdersNData;
            setNoOfOrders(value);

            // value is the value of your select dropdown that was selected
            finalData =  value === "" ? finalData : finalData.slice(0, value)

        }

        // TQuantity Filter Calculations


        // Returns undefined if it cannot find the element with .name === 'list' in array, otherwise it will return that element
        const lessThanTQData = activeFilters.find((element) => (element.name == 'lessThanTQ'));
        if (lessThanTQData) {
            // Do some filtering for third select/dropdown
            const { value, name } = lessThanTQData;
            setTQuantityFilter(value);
            // value is the value of your select dropdown that was selected
            finalData = finalData.filter((item) => (value === "" ? item.TotalNQ.toString().includes('') : item.TotalNQ <= value));
           
        }

        // Returns undefined if it cannot find the element with .name === 'list' in array, otherwise it will return that element
        const greaterThanTQData = activeFilters.find((element) => (element.name == 'greaterThanTQ'));
        if (greaterThanTQData) {
            // Do some filtering for third select/dropdown
            const { value, name } = greaterThanTQData;
            setTQuantityFilter(value);
            // value is the value of your select dropdown that was selected
            finalData = finalData.filter((item) => (value === "" ? item.TotalNQ.toString().includes('') : item.TotalNQ >= value));
           
        }

        // Returns undefined if it cannot find the element with .name === 'list' in array, otherwise it will return that element
        const equalsTQData = activeFilters.find((element) => (element.name == 'equalsTQ'));
        if (equalsTQData) {
            // Do some filtering for third select/dropdown
            const { value, name } = equalsTQData;
            setTQuantityFilter(value);
            // value is the value of your select dropdown that was selected
            finalData = finalData.filter((item) => (value === "" ? item.TotalNQ.toString().includes('') : item.TotalNQ.toString() == value.toString()));

        }





        setFilteredValues(finalData);
        // You can go with multiple if statements to filter everything step by step
    }, [activeFilters, OrderTypeData]);


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


                                    <h4 className="card-title">Order Type Summary</h4>
                                </div>
                                <div className="content tablesize" >
                                    <div className="row justify-contant-start">

                                        <Row className="justify-content-md-center">
                                            <Col xs={12} sm={6} xl={3} className="mt-4">
                                                <div>
                                                    <h6>Disclose Order</h6>
                                                    <Table striped bordered hover className="table-style1">
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>Buy</th>
                                                                <th>Sell</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Count</td>
                                                                <td>{FilterBuySell("b", "diso").length}</td>
                                                                <td>{FilterBuySell("s", "diso").length}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Trade Quantity</td>
                                                                <td>{TotalQuantity("b", "diso", "tq")}</td>
                                                                <td>{TotalQuantity("s", "diso", "tq")}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>New Order Quantity</td>
                                                                <td>{TotalQuantity("b", "diso", "nq")}</td>
                                                                <td>{TotalQuantity("s", "diso", "nq")}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </Col>
                                            <Col xs={12} sm={6} xl={3} className="mt-4 normalordertabel">
                                                <div>
                                                    <h6>Normal Order</h6>
                                                    <Table striped bordered hover className="table-style1">
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>Buy</th>
                                                                <th>Sell</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Count</td>
                                                                <td>{FilterBuySell("b", "nrml").length}</td>
                                                                <td>{FilterBuySell("s", "nrml").length}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Trade Quantity</td>
                                                                <td>{TotalQuantity("b", "nrml", "tq")}</td>
                                                                <td>{TotalQuantity("s", "nrml", "tq")}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>New Order Quantity</td>
                                                                <td>{TotalQuantity("b", "nrml", "nq")}</td>
                                                                <td>{TotalQuantity("s", "nrml", "nq")}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </Col>
                                            <Col xs={12} sm={6} xl={3} className="mt-4 stoplosstabel">
                                                <div>
                                                    <h6>Stop Loss Order</h6>
                                                    <Table striped bordered hover className="table-style1">
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>Buy</th>
                                                                <th>Sell</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Count</td>
                                                                <td>{FilterBuySell("b", "slo").length}</td>
                                                                <td>{FilterBuySell("s", "slo").length}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Trade Quantity</td>
                                                                <td>{TotalQuantity("b", "slo", "tq")}</td>
                                                                <td>{TotalQuantity("s", "slo", "tq")}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>New Order Quantity</td>
                                                                <td>{TotalQuantity("b", "slo", "nq")}</td>
                                                                <td>{TotalQuantity("s", "slo", "nq")}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </Col>
                                            <Col xs={12} sm={6} xl={6} className="mt-4 mb-4">
                                                <div className="col-md-9">
                                                    <div className="order-detials-heading">
                                                        <h6>Order Details</h6>
                                                        <input type="text" className="form-control" placeholder="order id"
                                                            onChange={(e) => orderDetailsCounter(e)}
                                                        />
                                                    </div>
                                                    <Table striped bordered hover>
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>order details</th>
                                                                {/* <th>Sell</th> */}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Time</td>
                                                                <td>  {OrderIdTime}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>TQuantity</td>
                                                                <td>  {OrderIdTQuantity}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>TotalNQ</td>
                                                                <td>  {OrderIdTotalNQ}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Count</td>
                                                                <td> {oderDetailCount}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Pending Quantity</td>
                                                                <td>{pendOrders}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>No. of SLO</td>
                                                                <td>  {nSLO}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </Col>
                                        </Row>

                                        <div className="row box-design">
                                            <div className="heading-section">
                                                <h3>Summary Quantity</h3>

                                            </div>
                                            {/* <div className="col-md-2"> */}
                                            <div className="row">

                                                <div className="col-md-2">
                                                    <label style={{ fontWeight: "bold", color: "black" }}>
                                                        No. Of Orders
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter No Of Orders"
                                                        name="noOfOrders"
                                                        className="form-control"
                                                        style={{ 'marginBottom': '20px' }}
                                                        onChange={(e) => searchRecord(e)}
                                                     value={noOfOrders}
                                                    />
                                                </div>
                                                <div className="col-md-2">
                                                    <label style={{ fontWeight: "bold", color: "black" }}>
                                                        TQuantity
                                                    </label>
                                                    <div className="tquantity">
                                                        <select
                                                            className="form-control"
                                                            onChange={(e) => {
                                                                setSelectTQuantity(e.target.value);
                                                            }}
                                                            value={selectTQuantity}
                                                            name="allTQ"
                                                        >
                                                            <option value="">All</option>
                                                            <option value="lessThanTQ">LT</option>
                                                            <option value="greaterThanTQ">GT</option>
                                                            <option value="equalsTQ">Equal</option>
                                                        </select>
                                                        {selectTQuantity !== "" ? (
                                                            <input
                                                                type="text"
                                                                placeholder={selectTQuantity}
                                                                name={selectTQuantity}
                                                                className="form-control"
                                                                style={{ marginTop: "10px" }}
                                                                onChange={(e) => searchRecord(e)}
                                                                value={tQuantityFilter}
                                                            />
                                                        ) : (
                                                            " "
                                                        )}
                                                    </div>
                                                </div>

                                            </div>
                                            <Row className="justify-content-md-center">
                                                <Col xs={12} sm={6} xl={6} className="mb-4">

                                                    <h5 className="summary-quantity-style">Buy</h5>
                                                    <DataTable columns={columns} data={data1} />


                                                </Col>
                                                <Col xs={12} sm={6} xl={6} className="mb-4">

                                                    <h5 className="summary-quantity-style">Sell</h5>
                                                    <DataTable columns={columns} data={data2} />

                                                </Col>

                                            </Row>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}