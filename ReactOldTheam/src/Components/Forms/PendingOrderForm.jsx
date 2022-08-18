import React,{useState} from 'react';
import axios from "axios";
import { Card, Button, InputGroup, FormControl ,Form} from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as Constant from '../../common/ConstantMessage';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import PendingOrdersTable from '../TradingData/PendingOrdersTable'

const PendingOrderForm = () => {

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
      name: "Script",
      selector: (row) => row.srcipt,
      sortable: true,
    },
    {
      name: "TStamp",
      selector: (row) => row.timestamp,
      sortable: true,
    },
    {
      name: "Otype",
      selector: (row) => row.otype,
      sortable: true,
    },
    {
      name: "OrderN",
      selector: (row) => row.ordern,
      sortable: true,
    },
    {
      name: "OrderID",
      selector: (row) => row.orderid,
      sortable: true,
    },
    {
      name: "TotalNQ",
      selector: (row) => row.totalnq,
      sortable: true,
    },
    {
      name: "TQuantity",
      selector: (row) => row.tquantity,
      sortable: true,
    },
    {
      name: "OCount",
      selector: (row) => row.ocount,
      sortable: true,
    },
    {
        name: "Price",
        selector: (row) => row.price,
        sortable: true,
      },
  ];

  var data = [];
  const [tradingShow, setTradingShow] = useState(false);
  const [tokenValue, setTokenValue] = useState("");
  const [oderId, getOrderId] = useState("");
  const [loader, setLoader] = useState(false);
  const { register,handleSubmit,formState: { errors }  } = useForm();
  const [orderDetails, setOrderDetails] = useState({
    columns,
    data,
  });

const OrderDetailsApiCalling = async() =>{
  setLoader(true)

  const header = {
    "Content-Type": "application/json",
  };
  const data1 ={
      "TokenNo":tokenValue,
      "OrderID":oderId
  }
 await axios
    .post(`http://192.168.100.22:9000/pendingorder`,data1, {
      headers: header,
    })
    .then((res) => {
      console.log("res", res);
      if (res) {
       
        Object.values(res.data).forEach((airport) => {
          data.push({
              sno: airport.SNO,
              time: airport.Time,
              srcipt:airport.Script,
              otype: airport.OType,
              timestamp:airport.TStamp,
              ordern: airport.OrderN,
              orderid: airport.OrderID,
              totalnq: airport.TotalNQ,
              tquantity: airport.TQuantity,
              ocount: airport.OCount,
              price: Math.round(airport.Price * 100) / 100,
              
          });
        });
        setOrderDetails({
          columns,
          data,
        });
  setTradingShow(true)
  setLoader(false)

      }
    })
    .catch(err => {
      console.log('Order Details Calculator', err);
      setLoader(false);
      return err.response;
    });
  // setTradingShow(true)

}

const backToForm = () => {
  setTradingShow(false);
}

    return(
        <>
           {!tradingShow &&  <div className="tab-body">
 <Backdrop   className="backdrop-overlay"
        sx={{ color: '#000000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
          
          <h2>Pending Order</h2>
          <Card style={{ width: "18rem" }}>
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
              onClick={handleSubmit(OrderDetailsApiCalling)}
              >
                Send
              </Button>
            </Card.Body>
          </Card>
        </div>
        }
        {
          tradingShow && <PendingOrdersTable backToForm={backToForm} orderDetails={orderDetails}/>
        }
        </>
    )
}

export default PendingOrderForm;