import React,{useState,useEffect} from 'react';
import {Table} from 'react-bootstrap'
import axios from "axios";
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";

const PendingOrdersTable = (props) =>{
    const {
        backToForm,
        orderDetails
    } = props

const [orderDetailsProp, setOrderDetailsProp] = useState(orderDetails.data.slice(0,orderDetails.data.length-1));
const [lastOrderDetails,setLastOrderDetails] = useState(orderDetails.data.slice(-1))
const [pendingOders,setPendingOrders] = useState("");
const [SloOrders, setSloOrders] =useState(0)
const [orderIdListMatch ,setOrderIdListmatch]  = useState("")

    const customStyles = {
      headCells: {
        style: {
          width:'30px',
          background:'#000',
          color:'#fff',
          justifyContent: 'center',
          
        },
      },
      cells: {
        style: {
          justifyContent:'center',
          minWidth:'auto !important',
          
          
        },
      },
    };

    const paginationComponentOptions = {
      selectAllRowsItem: true,
      selectAllRowsItemText: 'ALL',
    };

    const orderDetailsCal = () =>{
const penTotalNq = orderDetailsProp.map((item)=>{
 return item.totalnq
})
const sumTotalNq = penTotalNq.reduce((a, b) => a + b, 0)
const penTQuantity = orderDetailsProp.map((item)=>{
  return item.tquantity
 })
 const sumTQuantity = penTQuantity.reduce((a, b) => a + b, 0)

setPendingOrders(sumTotalNq-sumTQuantity)

const sloOrdersvalues = orderDetailsProp.filter((item)=>{
  if(item.ordern === "SLO"){
return item
  }
})
setSloOrders(sloOrdersvalues.length)
// console.log("sloOrdersvalues",sloOrdersvalues)
    }

   


useEffect(()=>{
orderDetailsCal()
},[])

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
       return item
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


     return(
         <>
         

         
    <div className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header order_type">
              <button onClick={() => backToForm()} className="export-btn back"> Back</button>
                <h4 className="card-title">Pending Orders</h4>
              </div>
              <div className="card-body">
          
        <div className="row order-type-export"> 
      <div className="export-btn">
      {/* <ExportToExcel apiData={Object.values(dataTrade)} fileName={fileName}/> */}
<button onClick={() =>getOrderIdList()}>OrderId Match</button>
               
                  </div>
                  </div>
        <DataTable
          columns={orderDetails.columns}
          data={orderDetails.data}
          // noHeader
          defaultSortField="id"
          defaultSortAsc={false} 
          pagination
          highlightOnHover 
          fixedHeader ={true}
          fixedHeaderScrollHeight= {'550px'}
          paginationComponentOptions={paginationComponentOptions}
          paginationRowsPerPageOptions={[10,50,100]}
          customStyles={customStyles}
          // customStyles={customStyles}
        />
      
    </div>
    </div>
    </div>
    </div>
    </div>


 <div className="col-md-6">

 
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
            <td>{lastOrderDetails[0].time} </td>
          </tr>
          <tr>
            <td>TQuantity</td>
            <td> {lastOrderDetails[0].tquantity} </td>
          </tr>
          <tr>
            <td>TotalNQ</td>
            <td>{lastOrderDetails[0].totalnq} </td>
          </tr>
          <tr>
            <td>Count</td>
            <td>{orderDetailsProp.length}</td>
          </tr>
          <tr>
            <td>Pending Quantity</td>
        <td>{pendingOders}</td>
          </tr>
          <tr>
            <td>No. of SLO</td>
            <td> {SloOrders} </td>
          </tr>
        </tbody>
      </Table>
      </div>
         </>
     )
}

export default PendingOrdersTable;