import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";


const OrderTypeSummary = (props) => {
  const { tradingData } = props;

  const [oderDetailCount, setOrderDetailCount] = useState("");
  const [nSLO, setNSLO] = useState("");
  const [pendOrders, setPendOrders] = useState("");
  const [OrderIdTime, setOrderIdTime] = useState("");
  const [OrderIdTQuantity, setOrderIdTQuantity] = useState("");
  const [OrderIdTotalNQ, setOrderIdTotalNQ] = useState("");
  const [orderCount, setOrderCount] = useState(tradingData.data);
  const [noOfOrders, setNoOfOrders] = useState("");

  const [QuantityFilter, setQuantityFilter] = useState("");
  const [lessThanQ, setLessThanQ] = useState("");
  const [greaterThanQ, setGreaterThanQ] = useState("");
  const [equalThanQ, setEqualThanQ] = useState("");

  var data1 = []
  var data2 = []

  const FilterBuySell = (sb, order) => {
    // console.log("t",quantityCount)
    const sellBuy = tradingData.data.filter((item) => {
      if (item.otype.toString().toLowerCase().includes(sb)) {
        return item;
      }
    });
    var dSellBuy = sellBuy.filter((item) => {
      if (item.ordern.toString().toLowerCase().includes(order)) {
        return item;
      }
    });
    return dSellBuy;
  };

  const TotalQuantity = (sb, order, tq) => {
    const Value = FilterBuySell(sb, order);
    if (tq == "tq") {
      var Tq = Value.map((item) => {
        return item.tquantity;
      });
    }
    if (tq == "nq") {
      var Tq = Value.map((item) => {
        return item.totalnq;
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
    var Orders = tradingData.data.filter((item) => {
      if (item.orderid == e.target.value) {
        return item;
      }
    })
    // console.log("Oders",Orders)
    setOrderIdTime(Orders[0].time)
    setOrderIdTQuantity(Orders[0].tquantity)
    setOrderIdTotalNQ(Orders[0].totalnq)
    const orderId = Orders[0].orderid;
    const Price = Orders[0].price;
    const OType = Orders[0].otype;
    const OrderCount = tradingData.data.filter((item) => {
      if (item.orderid < orderId && item.otype === OType && item.price === Price && item.totalnq > item.tquantity) {
        return item;
      }
    })
    setOrderDetailCount(OrderCount.length)
    // console.log("oCount",OrderCount);
    const NoSLO = OrderCount.filter((item) => {
      if (item.ordern === 'SLO') {
        return item;
      }
    })
    var OrderSlo = 0
    if (Orders[0].ordern === 'SLO') {
      var OrderSlo = 1
    }
    setNSLO(NoSLO.length + OrderSlo)

    const PendTotalNq = OrderCount.map((item) => {
      return item.totalnq
    })
    const SumTotalNq = PendTotalNq.reduce((a, b) => a + b, 0) + Orders[0].totalnq
    // console.log("pendNQ",SumTotalNq);

    const PendTQuantity = OrderCount.map((item) => {
      return item.tquantity
    })
    const SumTQuantity = PendTQuantity.reduce((a, b) => a + b, 0) + Orders[0].tquantity
    //  console.log("pendTQ",SumTQuantity);
    setPendOrders(SumTotalNq - SumTQuantity)
  }

  // *******************************************End *********************************************

  //***************************** */ Quantity and Count Buy/Sell Calclulation ***************************


  const getNoOfOrders = (e) => {
    // console.log("Enter",e.target.value)
    if (e.target.name === "nooforders") {
      console.log("event", e.target.value)
      setNoOfOrders(e.target.value)
      if (e.target.value === "") {
        console.log("ff")
        setLessThanQ("");
        setGreaterThanQ("");
        setEqualThanQ("");
        setQuantityFilter("")
        setOrderCount(tradingData.data);
        return
      }

      var filterData = tradingData.data.slice(0, e.target.value);
      // console.log("filter",filterData)
      if (lessThanQ !== "") {
        // console.log("filless")
        filterData = filterData.filter((item) => {
          if (item.totalnq < lessThanQ) {
            return item;
          }
        });
      }

      if (greaterThanQ !== "") {
        filterData = filterData.filter((item) => {
          if (item.totalnq > greaterThanQ) {
            return item;
          }
        });
      }

      if (equalThanQ !== "") {
        filterData = filterData.filter((item) => {
          if (item.totalnq == equalThanQ) {
            return item;
          }
        });
      }

    }

    // ***************TotalNQ*************

    if (e.target.name === "lessThanQ") {
      console.log("less", e.target.value)

      if (e.target.value === "") {
        console.log("nless")
        setNoOfOrders("gg")
        setOrderCount(tradingData.data);
        return
      }
      setLessThanQ(e.target.value);
      var filterData = tradingData.data.filter((item) => {
        // console.log("nless")
        if (item.totalnq < e.target.value) {
          return item;
        }
      });

      if (noOfOrders !== "") {
        filterData = filterData.data.slice(0, noOfOrders);
        console.log("no")

      }
    }


    if (e.target.name === "greaterThanQ") {
      setGreaterThanQ(e.target.value);
      if (e.target.value === "") {
        setOrderCount(tradingData.data);
        setNoOfOrders("")
        return
      }
      var filterData = tradingData.data.filter((item) => {
        if (item.totalnq > e.target.value) {
          return item;
        }
      });

      if (noOfOrders !== "") {
        filterData = filterData.slice(0, noOfOrders);
      }

    }

    if (e.target.name === "equalsThanQ") {


      setEqualThanQ(e.target.value);
      if (e.target.value === "") {
        setNoOfOrders("")
        setOrderCount(tradingData.data);
        return
      }
      var filterData = tradingData.data.filter((item) => {
        if (item.totalnq == e.target.value) {
          return item;
        }
      });

      if (noOfOrders !== "") {
        filterData = filterData.slice(0, noOfOrders);
      }

    }

    // console.log("OrderNo",OrderNo)
    setOrderCount(filterData)

  }

  // var OrderCountData = orderCount === "" || orderCount.length === 0 ? tradingData.data : orderCount 
  // console.log("OrderCountData",OrderCountData)

  var Buy = orderCount.filter((item) => {
    if (item.otype.toString().toLowerCase().includes('b')) {
      return item;
    }
  });

  var sell = orderCount.filter((item) => {
    if (item.otype.toString().toLowerCase().includes('s')) {
      return item;
    }
  });

  function uniqueByKey(array, key) {
    return [...new Map(array.map((x) => [x[key], x])).values()];
  }


  const uniqueValBuy = uniqueByKey(Buy, "totalnq")
  uniqueValBuy.map((item, index) => {
    data1.push({
      sno: index,
      nquantity: item.totalnq,
      scount: item.sqcount,

    })
  })


  const uniqueValSell = uniqueByKey(sell, "totalnq")

  uniqueValSell.map((item, index) => {
    data2.push({
      sno: index,
      nquantity: item.totalnq,
      scount: item.sqcount,
    })

  })
  // console.log("Data2",data2)



  const columns = [
    {
      name: "SNo.",
      selector: (row) => row.sno,
      sortable: true,

    },
    {
      name: "Quantity",
      selector: (row) => row.nquantity,
      sortable: true,

    },
    {
      name: "Count",
      selector: (row) => row.scount,
      sortable: true,
    },


  ];

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: 'ALL',
  };

  const customStyles = {
    rows: {
      style: {},
    },
    headCells: {
      style: {
        width: "30px",
        background: "#000",
        color: "#fff",
      },
    },
    cells: {
      style: {
        justifyContent: "center",
        minWidth: "auto !important",
      },
    },
  };

  // *******************************End********************************* 

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <h4>Disclose Order</h4>
          <Table striped bordered hover>
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
        <div className="col-md-4">
          <h4>Normal Order</h4>
          <Table striped bordered hover>
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
        <div className="col-md-4">
          <h4>Stop Loss Order</h4>
          <Table striped bordered hover>
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
        <div className="col-md-4">
          <div className="order-detials-heading">
            <h4>Order Details</h4>
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
      </div>

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
              name="nooforders"
              className="form-control"
              style={{ 'marginBottom': '20px' }}
              onChange={(e) => getNoOfOrders(e)}
            //  value={noOfOrders}
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
                  setQuantityFilter(e.target.value);
                }}
                value={QuantityFilter}
              // name="allTQuant"
              >
                <option value="">All</option>
                <option value="lessThanQ">LT</option>
                <option value="greaterThanQ">GT</option>
                <option value="equalsThanQ">Equal</option>
              </select>
              {QuantityFilter !== "" ? (
                <input
                  type="text"
                  placeholder={QuantityFilter}
                  name={QuantityFilter}
                  className="form-control"
                  style={{ marginTop: "10px" }}
                  onChange={(e) => getNoOfOrders(e)}
                //  value={greaterThanTquant}
                />
              ) : (
                " "
              )}
            </div>
          </div>

        </div>



        <div className="col-md-6">
          <h3 className="summary-quantity-style">Buy</h3>

          <DataTable
            columns={columns}
            data={data1}
            defaultSortField="id"
            defaultSortAsc={false}
            pagination
            highlightOnHover
            fixedHeader={true}
            fixedHeaderScrollHeight={'550px'}
            customStyles={customStyles}
            paginationComponentOptions={paginationComponentOptions}
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 50, 100]}
          />
        </div>
        <div className="col-md-6">
          <h3 className="summary-quantity-style">Sell</h3>
          <DataTable
            columns={columns}
            data={data2}
            defaultSortField="id"
            defaultSortAsc={false}
            pagination
            highlightOnHover
            fixedHeader={true}
            fixedHeaderScrollHeight={'550px'}
            customStyles={customStyles}
            paginationComponentOptions={paginationComponentOptions}
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 50, 100]}
          />
        </div>
      </div>
    </>
  );
};

export default OrderTypeSummary;
