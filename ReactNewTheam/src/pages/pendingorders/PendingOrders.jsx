import React,{useState} from 'react';
import { Card, Button, InputGroup, FormControl ,Form} from "react-bootstrap";
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom';
import {CircularProgress,Backdrop} from '@mui/material';

//
import * as Constant from '../../common/ConstantMessage';
import {
  getPendingOrderData,
  getPendingOrderSummary
} from '../../services';
import PendingOrderTable from './PendingOrderTable'
import AlertToast from '../../common/AlertToast';




export default () => {
  const [tokenValue, setTokenValue] = useState("");
  const [oderId, getOrderId] = useState("");
  const [tablesShow, setTablesShow] = useState(false);
  const [pendingOrdersData,setPendingOrdersData] = useState({})
  const [pendingOrderSummarry,setPendingOrderSummary] = useState()
  const { register,handleSubmit,formState: { errors }  } = useForm();
  const [loader, setLoader] = useState(false);

 
  const [showAlert, setShowAlert] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  const [alertColor, setAlertColor] = useState("");


const navigate = useNavigate()

const columns = [
  {
    name: "SNo." ,
    selector: (row) => row.sno,
    sortable: true,
  },
  {
    name: "Time",
    selector: (row) => row.time,
    sortable: true,
  },
  {
    name: "OrderId",
    selector: (row) => row.orderid,
    sortable: true,
  },
  {
    name: "NQuantity",
    selector: (row) => row.nquantity,
    sortable: true,
  },
  {
    name: "TQuantity",
    selector: (row) => row.tquantity,
    sortable: true,
  },
  {
    name: "RQuantity",
    selector: (row) => row.rquantity,
    sortable: true,
  },
];

const onAlertClose = e => {
  setShowAlert(false);
}

const backToForm = () =>{
  setTablesShow(false)
}

const pendingOrderCalculation = async() =>{
  setLoader(true)
  const userdata ={
    "TokenNo":tokenValue,
    "OrderID":oderId
}
const response =  getPendingOrderData(userdata);
// console.log("response",response)

const resSummary = await getPendingOrderSummary(setLoader,setShowAlert,setTextAlert,setAlertColor)

if(resSummary){
  setTablesShow(true)
  // console.log("ressummary",resSummary)
  setPendingOrderSummary(resSummary)
  setLoader(false)
}
const response1 = await getPendingOrderData(userdata,setLoader,setShowAlert,setTextAlert,setAlertColor);
var data = []
if(response1){
  // console.log("res",response)
  // console.log("response1",response1)
  response1.sort((a,b)=> (a.Time - b.Time)).map((item)=>{
    data.push({
      sno: item.SNO,
      time: item.Time,
      orderid:item.OrderID,
      nquantity: item.NQuantity,
      tquantity:item.TQuantity,
      rquantity: item.RQuantity,
   
    })
  })
  setPendingOrdersData({columns,data})
 
  // navigate("/pending-orders/table")
}
}

  return (
    <>
     <Backdrop className="backdrop-overlay"
        sx={{ color: '#000000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
{!tablesShow && 
<div className="tab-body">

     <Card >
            <Card.Body>
              <Card.Title>Pending Order</Card.Title>
              <div className="form-grp-1">
              <Form.Label>Token</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Token"
                  name="token"
                  aria-label="Token"
                  aria-describedby="basic-addon1"
                   {...register("token", {onChange : (e)=> setTokenValue(e.target.value), required: true })}
                />
              </InputGroup>
              {errors.token && <span style={{color:"red"}}>* {Constant.TOKEN}</span>}
              </div>
              <div className="form-grp-1">
              <Form.Label>OrderId</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Enter OrderId"
                  aria-label="orderid"
                  name="orderid"
                  aria-describedby="basic-addon1"
                  onChange={(e) => getOrderId(e.target.value)}
                  {...register("orderid", {onChange : (e) => getOrderId(e.target.value), required: true })}
                />
              </InputGroup>
              {errors.orderid && <span style={{color:"red"}}>* {Constant.OrderId}</span>}
              </div>
              <Button variant="primary" 
              onClick={handleSubmit(pendingOrderCalculation)}
              >
                Send
              </Button>
            </Card.Body>
          </Card>
          </div>
          }
         {
          tablesShow && 
          <PendingOrderTable 
          backToForm={backToForm} 
          pendingOrdersData={pendingOrdersData}
          pendingOrderSummarry={pendingOrderSummarry}
          />
         } 

{showAlert &&
    <AlertToast
      hideAlert={onAlertClose}
      showAlert={showAlert}
      message={textAlert}
      alertColor={alertColor}
    />
  }
    </>
  );
};
