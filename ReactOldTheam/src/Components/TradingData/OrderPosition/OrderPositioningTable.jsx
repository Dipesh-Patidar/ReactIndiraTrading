import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap'
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import OrderPositioningSummary from './OrderPositioningSummary';
import AlertToast from '../../../common/AlertToast';
import axios from "axios";



const OrderPositioningTable = (props) => {
  const {
    backToForm,
    orderPositioning
  } = props
  const [orderPositionData, setOrderPositionData] = useState(orderPositioning.data)
  const [lastOrderDetails, setLastOrderDetails] = useState(orderPositioning.data.slice(-1))
  const [pendingSummaryCheck, setPendingSummaryCheck] = useState(true);
  const [showOrderPosSummary, setShowOrderPosSummary] = useState(false);

  const [positionSummaryData, setPositionSummaryData] = useState();
  const [lastPendingOrder,setLastPendingorder] = useState("")
  const [pendingOders,setPendingOrders] = useState(0);
  const [SloOrders, setSloOrders] =useState(0)


  const [showAlert, setShowAlert] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  const [alertColor, setAlertColor] = useState("");

  const [orderIdListMatch ,setOrderIdListmatch]  = useState("")


  const onAlertClose = e => {
    setShowAlert(false);
  }

  const customStyles = {
    headCells: {
      style: {
        width: '30px',
        background: '#000',
        color: '#fff',
        justifyContent: 'center',

      },
    },
    cells: {
      style: {
        justifyContent: 'center',
        minWidth: 'auto !important',


      },
    },
  };

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: 'ALL',
  };

  const columns = [
    {
      name: "SNo.",
      selector: (row) => row.sno,
      sortable: true,
    },
    {
      name: "Time",
      selector: (row) => row.time,
      sortable: true,
    },
    {
      name: "NTStamp",
      selector: (row) => row.timestamp,
      sortable: true,
    },
    {
      name: "Otype",
      selector: (row) => row.otype,
      sortable: true,
    },
    {
      name: "Token",
      selector: (row) => row.token,
      sortable: true,
    },
    {
      name: "Script",
      selector: (row) => row.srcipt,
      sortable: true,
    },
    {
      name: "OrderID",
      selector: (row) => row.orderid,
      cell: row => (pendingSummaryCheck === true ? <a href="#" onClick={(e) => sendToPendingSummary(e, row.orderid, row.token)}>{row.orderid}</a> : row.orderid
      ),

      sortable: true,
    },
    {
      name: "OID_Diff",
      selector: (row) => row.orderidDiff,
      sortable: true,
    },
    {
      name: "TotalNQ",
      selector: (row) => row.totalnq,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
  ];

  const sendToPendingSummary = (e, orderid, token) => {
    setPendingSummaryCheck(false)
    setShowAlert(true);
    setTextAlert("Pending Order Calculating..");
    setAlertColor("success");
    console.log("OrdeId", orderid, token)
    e.preventDefault()
    const header = {
      "Content-Type": "application/json",
    };
    const data1 = {
      "TokenNo": token.toString(),
      "OrderID": orderid.toString()
    }
    axios
      .post(`http://192.168.100.22:9000/pendingorder`, data1, {
        headers: header,
      })
      .then((res) => {
        // console.log("res", res);
        if (res && res.status === 200) {
          //  console.log("Pending",res.data)
          setPendingSummaryCheck(true)
          setPositionSummaryData(Object.values(res.data))
          setShowOrderPosSummary(true)
        } 
      })
      .catch(err => {
        console.log('pending Api', err);
        setPendingSummaryCheck(true)
        setShowAlert(true);
          setTextAlert("Server Side Error");
          setAlertColor("error");
        return err.response;
      });
  }

const getPendingOrders = (positionSummary) =>{
  const RemainingData = positionSummary.slice(0,positionSummary.length-1);
  if(RemainingData && RemainingData !== undefined){
    let penTotalNq =  RemainingData.map((item)=>{
      return item.TotalNQ
     })
     let sumTotalNq = penTotalNq.reduce((a, b) => a + b, 0)
    //  console.log("penTQuantity",penTotalNq)
  
  
     let penTQuantity = RemainingData.map((item)=>{
       return item.TQuantity
      })
      const sumTQuantity = penTQuantity.reduce((a, b) => a + b, 0)
      // console.log("penTQuantity",penTQuantity)
     
      const calcPendingOrder = sumTotalNq-sumTQuantity
      // console.log("calcPendingOrder",calcPendingOrder)
      return calcPendingOrder
}
}


const getSloOrders = (sloOrders) => {
  const RemainingData = sloOrders.slice(0,sloOrders.length-1);

   const sloOrdersvalues = RemainingData.filter((item)=>{
     if(item.ordern === "SLO"){
   return item
     }
   })
return sloOrdersvalues
}

// ************************* OrderId Match ********************************


const conditionalRowStyles = [
  {
   
    when: row =>orderIdListMatch ? row.orderid == orderIdListMatch.filter((item)=>{
      if(item.includes(row.orderid.toString())){
        return item
      }
    })[0] : '',
    style: {
      backgroundColor: '#289984',
      color: 'white',
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
];

const getOrderIdList = () =>{
  const header = {
    'Content-Type': 'application/json',
  }

   axios.get(`http://192.168.100.22:9000/orderidlist`, { headers: header, data: {} })
    .then(res => {
    if(res){
      // console.log("OreidList",res.data)
    var OIdList =  Object.values(res.data).map((item)=>{
       return item.toString()
      })
      console.log("Item",OIdList)
      if(OIdList.length > 1)
       setOrderIdListmatch(OIdList)
    }
      })
      .catch(err => {
        console.log('OrderIdList Error', err);
        return err.response;
      });
}

  return (
    <>
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header order_type">
                {/* <button onClick={() => backToForm()} className="export-btn back"> Back</button> */}
                <h4 className="card-title">OrderPositioning</h4>
              </div>
              <div className="card-body">

                <div className="row order-type-export">
                  <div className="export-btn">
                    {/* <ExportToExcel apiData={Object.values(dataTrade)} fileName={fileName}/> */}
                    <button onClick={() =>getOrderIdList()}>OrderId Match</button>

                  </div>
                </div>

                <DataTable
                  columns={columns}
                  data={orderPositionData}
                  // noHeader
                  defaultSortField="id"
                  defaultSortAsc={false}
                  pagination
                  highlightOnHover
                  fixedHeader={true}
                  fixedHeaderScrollHeight={'550px'}
                  paginationComponentOptions={paginationComponentOptions}
                  paginationRowsPerPageOptions={[10, 50, 100]}
                  customStyles={customStyles}
                  customStyles={customStyles}
          conditionalRowStyles={conditionalRowStyles}

                />

              </div>
            </div>
          </div>
        </div>
      </div>

<div className="row">



      <div className="col-md-6">

<h3>Order Details</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Order details</th>

            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Time</td>
              <td>{lastOrderDetails[0].time} </td>
            </tr>
            <tr>
              <td>Order No.</td>
              <td> {lastOrderDetails[0].orderid} </td>
            </tr>
            <tr>
              <td>TotalNQ</td>
              <td>{lastOrderDetails[0].totalnq}</td>
            </tr>
            <tr>
              <td>Count</td>
              <td>{orderPositionData.length - 1}</td>
            </tr>
            <tr>
              <td>Token No</td>
              <td>{lastOrderDetails[0].token}</td>
            </tr>

          </tbody>
        </Table>
      </div>
      <div className="col-md-6">
      {
        showOrderPosSummary && 
<div>
<h3>Pending Orders</h3>

        <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Pending Orders</th>
        
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Time</td>
    
        <td>{positionSummaryData && positionSummaryData.slice(-1)[0].Time} </td>
      </tr>
      <tr>
        <td>TQuantity</td>
        <td> {positionSummaryData && positionSummaryData.slice(-1)[0].TQuantity} </td>
      </tr>
      <tr>
        <td>TotalNQ</td>
        <td>{positionSummaryData && positionSummaryData.slice(-1)[0].TotalNQ} </td> 
      </tr>
      <tr>
        <td>Count</td>
        <td>{positionSummaryData && positionSummaryData.length}</td>
      </tr>
      <tr>
        <td>Pending Quantity</td>
    <td>{positionSummaryData && getPendingOrders(positionSummaryData)}</td>
      </tr>
      <tr>
        <td>No. of SLO</td>
        <td> {positionSummaryData && getSloOrders(positionSummaryData)} </td>
      </tr>
    </tbody>
  </Table>
  </div>
      }
      </div>

      </div>
      {showAlert &&
        <AlertToast
          hideAlert={onAlertClose}
          showAlert={showAlert}
          message={textAlert}
          alertColor={alertColor}
        />
      }

    </>
  )
}
export default OrderPositioningTable;