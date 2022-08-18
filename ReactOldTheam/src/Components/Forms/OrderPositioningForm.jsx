import React,{useState} from 'react';
import axios from "axios";
import { Card, Button, InputGroup, FormControl ,Form} from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as Constant from '../../common/ConstantMessage';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import OrderPosition from '../TradingData/OrderPosition/OrderPosition'
import OrderPositioningSummary from '../TradingData/OrderPosition/OrderPositioningSummary';
import AlertToast from '../../common/AlertToast';

const OrderPositioningForm = () =>{
 
  // const columns = [
  //   {
  //     name: "SNo." ,
  //     selector: (row) => row.sno,
  //     sortable: true,
  //   },
  //   {
  //     name: "Time",
  //     selector: (row) => row.time,
  //     sortable: true,
  //   },
  //   {
  //     name: "NTStamp",
  //     selector: (row) => row.timestamp,
  //     sortable: true,
  //   },
  //   {
  //     name: "Otype",
  //     selector: (row) => row.otype,
  //     sortable: true,
  //   },
  //   {
  //       name: "Token",
  //       selector: (row) => row.token,
  //       sortable: true,
  //     },
  //   {
  //     name: "OrderID",
  //     selector: (row) => row.orderid,
  //     cell: row => (pendingSummaryCheck === true ? <a href="#" onClick={(e) =>sendToPendingSummary(e,row.orderid,row.token)}>{row.orderid}</a> : row.orderid
  //     ), 
  //     sortable: true,
  //   },
  //   {
  //       name: "OID_Diff",
  //       selector: (row) => row.orderidDiff,
  //       sortable: true,
  //     },
  //   {
  //     name: "TotalNQ",
  //     selector: (row) => row.totalnq,
  //     sortable: true,
  //   },
  //   {
  //       name: "Price",
  //       selector: (row) => row.price,
  //       sortable: true,
  //     },
  // ];
    
      var data = [];
      const [tradingShow, setTradingShow] = useState(false);
      const [streamValue, setStreamValue] = useState("");
      const [oderId, getOrderId] = useState("");
      const [loader, setLoader] = useState(false);
      const { register,handleSubmit,formState: { errors }  } = useForm();
      const [orderPositioning, setOrderPostioning] = useState({
        data,
      });
const [showOrderPosSummary,setShowOrderPosSummary] = useState(false);
const [positionSummaryData,setPositionSummaryData] = useState()
const [showAlert, setShowAlert] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  const [alertColor, setAlertColor] = useState("");

const onAlertClose = e => {
  setShowAlert(false);
}

// const sendToPendingSummary = (e,orderid,token) =>{
//   e.preventDefault()
//   setPendingSummaryCheck(false)
//   setShowAlert(true);
//   setTextAlert("Pending Order Calculating..");
//   setAlertColor("success");
// console.log("GFjhygi",e)
// console.log("OrdeId",orderid,token)
// const header = {
//   "Content-Type": "application/json",
// };
// const data1 ={
//     "TokenNo":token.toString(),
//     "OrderID":orderid.toString()
// }
//  axios
//   .post(`http://192.168.100.22:9000/pendingorder`,data1, {
//     headers: header,
//   })
//   .then((res) => {
//     // console.log("res", res);
//     if (res && res.status === 200) {
//     //  console.log("Pending",res.data)
//     setPendingSummaryCheck(true)
//     setPositionSummaryData(res.data)
//      setShowOrderPosSummary(true)
//     }else if(res.status === 500){
//       setShowAlert(true);
//   setTextAlert("Pending Api error");
//   setAlertColor("error");
//     }
//   })
//   .catch(err => {
//     console.log('pending Api', err);
//     return err.response;
//   });
// }


// console.log("PendingAPiData",positionSummaryData)

      const OrderPostioningApiCalling = async() =>{
        setLoader(true)
      
        const header = {
          "Content-Type": "application/json",
        };
        const data1 ={
            "Stream":streamValue,
            "OrderNo":oderId
        }
       await axios
          .post(`http://192.168.100.22:9000/orderposition`,data1, {
            headers: header,
          })
          .then((res) => {
            console.log("res", res);
            if (res) {
             
              Object.values(res.data).forEach((airport) => {
                data.push({
                  sno: airport.SNO,
                  time: airport.Time,
                  otype: airport.OType,
                  timestamp:airport.NTStamp,
                  token:airport.Token,
                  srcipt:airport.Script,
                  orderid: airport.OrderID,
                  orderidDiff: airport.OID,
                  totalnq: airport.TotalNQ,
                  price: Math.round(airport.Price * 100) / 100,
                    
                });
              });
              setOrderPostioning({
                data,
              });
        setTradingShow(true)
        setLoader(false)
      
            }
          })
          .catch(err => {
            console.log('Order Positioning Calculator', err);
            setLoader(false);
            return err.response;
          });
        // setTradingShow(true) 
      
      }

      const backToForm = () => {
        setTradingShow(false);
        setShowOrderPosSummary(false)
      }

    return(
        <>
       {showOrderPosSummary || !tradingShow &&  <div className="tab-body">
 <Backdrop  className="backdrop-overlay"
        sx={{ color: '#000000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
          
          <h2>OrderPositioning</h2>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>OrderPositioning</Card.Title>
              <div className="form-grp-1">
              <Form.Label>Stream</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Enter Stream"
                  name="stream"
                  aria-label="stream"
                  aria-describedby="basic-addon1"
                   {...register("stream", {onChange : (e)=> setStreamValue(e.target.value), required: true })}
                />
              </InputGroup>
              {errors.stream && <span style={{color:"red"}}>* {Constant.StreamValueError}</span>}
              </div>
              <div className="form-grp-1">
              <Form.Label>OrderId</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Enter OrderId"
                  aria-label="orderid"
                  name="orderid"
                  aria-describedby="basic-addon1"
                //   onChange={(e) => getOrderId(e.target.value)}
                  {...register("orderid", {onChange : (e) => getOrderId(e.target.value), required: true })}
                />
              </InputGroup>
              {errors.orderid && <span style={{color:"red"}}>* {Constant.OrderId}</span>}
              </div>
              <Button variant="primary" 
              onClick={handleSubmit(OrderPostioningApiCalling)}
              >
                Send
              </Button>
            </Card.Body>
          </Card>
        </div>
        }
        {
          tradingShow && <OrderPosition backToForm={backToForm} orderPositioning={orderPositioning}/>
        }
        {/* {
          showOrderPosSummary && <OrderPositioningSummary positionSummaryData={positionSummaryData}/>
        } */}
         {/* { showAlert && 
<AlertToast
 hideAlert={onAlertClose}
 showAlert={showAlert}
 message={textAlert}
 alertColor={alertColor}
/>
} */}
        </>
    )
}
export default OrderPositioningForm;