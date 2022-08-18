import React, {useState ,useEffect} from "react";
import axios from "axios";
import { Card, Button, InputGroup, FormControl ,Form} from "react-bootstrap";
import OrderType from '../TradingData/OrderType/OrderType'
import { useForm } from "react-hook-form";
import * as Constant from '../../common/ConstantMessage';
import TimePicker from 'react-time-picker';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';




const OrderTypeForm = () => {

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
          name: "Algo",
          selector: (row) => row.algo,
          sortable: true,
        },
        {
          name: "MCount",
          selector: (row) => row.mcount,
          sortable: true,
        },
    
        {
          name: "SQ",
          selector: (row) => row.sq,
          sortable: true,
        },
    
        {
          name: "SQCount",
          selector: (row) => row.sqcount,
          sortable: true,
        },
        {
          name: "OrderID",
          selector: (row) => row.orderid,
          sortable: true,
        },
        {
          name: "OId Diff",
          selector: (row) => row.orderidDiff,
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
      const [orderTypeTableShow, setOrderTypeTableShow] = useState(false);
    const [startTime, setStartTime] = useState("09:15:00");
    const [endTime, setEndTime] = useState("15:30:00");
    const [lpBand, setLPBand] = useState("0");
    const [upBand, setUPBand] = useState("200000");
    const [value, setValue] = useState("0");
    const [tokenValue, setTokenValue] = useState("");
    const [quantityValue, setQuantityValue] = useState("0");
    const [loader, setLoader] = useState(false);

  
    const { register,handleSubmit,formState: { errors }  } = useForm();

    const [tradingData, setTradingData] = useState({
        columns,
        data,
      });
          
      var data = [];
    
const TimeConvertor = (time) =>{
  if(time){
    const time1 = time.split(":")
    if(time1.length == 2){
      var startTimeSet = time+":00"
      return startTimeSet
    }else{
      var startTimeSet = time
      return startTimeSet
  }
}
}

const backToForm = () => {

  setOrderTypeTableShow(false);
}

const getOrderIdList = () =>{
  const header = {
    'Content-Type': 'application/json',
  }

   axios.get(`http://192.168.100.22:9000/orderidlist`, { headers: header, data: {} })
    .then(res => {
    if(res){
      // console.log("OreidList",res.data)
      Object.values(res.data).map((item)=>{
        data.push({
          ...data,
          orderidlist:item
        })
      })
      console.log("Item",data)
    }
      })
      .catch(err => {
        console.log('OrderIdList Error', err);
        return err.response;
      });
}

// useEffect(()=>{

// },[])

    const OrderTypeApiCalling = () => {
      setLoader(true)

        const header = {
          "Content-Type": "application/json",
        };
        const data1 ={
             "TokenNo":tokenValue,
             "StartTime":TimeConvertor(startTime),
             "EndTime":TimeConvertor(endTime),
             "LPBand":lpBand,
             "UPBand":upBand,
             "Value":value,
             "Quantity":quantityValue
        }
       axios
          .post(`http://192.168.100.22:9000/ordertype`,data1, {
            headers: header,
          })
          .then((res) => {
            console.log("res", res);
            if(res){

              
             Object.values(res.data).forEach((airport) => {
                 data.push({
                     sno: airport.SNO,
                     time: airport.Time,
                  srcipt:airport.Script,
                     timestamp:airport.NTStamp,
                     otype: airport.OType,
                     ordern: airport.OrderN,
                     algo: airport.Algo,
                     mcount: airport.MCount,
                     sq: airport.SQ, 
                     sqcount: airport.SQCount,
                     orderid: airport.OrderID,
                     orderidDiff:airport.OID,
                     totalnq: airport.TotalNQ,
                     tquantity: airport.TQuantity,
                     ocount: airport.OCount,
                     price: Math.round(airport.Price * 100) / 100,
                     
                 });
               });
              //  console.log("OrderData",data)
              //  getOrderIdList()
               setTradingData({
                 columns,
                 data,
               });
                            
               setOrderTypeTableShow(true);
               setLoader(false)
            }
          })
          .catch(err => {
            console.log('Order Type', err);
            setLoader(false);
            return err.response;
          });
      }

    return (
        <>
            {!orderTypeTableShow &&
            
            ( <div className="tab-body">
               <Backdrop  className="backdrop-overlay"
        sx={{ color: '#000000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
        // onClick={handleClose}
      >
        <CircularProgress  color="inherit" />
      </Backdrop>
          <h2>Order Type</h2>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Order Type</Card.Title>
              <div className="form-grp-1">
              <Form.Label>Token</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Token"
                  aria-label="Token"
                  name="token"
                  aria-describedby="basic-addon1"
                  // value={tokenValue}
                  // onChange={(e) => setTokenValue(e.target.value)}
                  {...register("token", {onChange :(e) => setTokenValue(e.target.value), required: true })}
                />
              </InputGroup>
              {errors.token && <span style={{color:"red"}}>* {Constant.TOKEN}</span>}
              </div>
           
              
              <div className="row col-md-12">
                <div className="col-md-6">
              <Form.Label>StartTime</Form.Label>
              <InputGroup className="mb-3 form-control no-border">


<TimePicker
className=""
       onChange={(e) => setStartTime(e)}
       value={startTime}
        format="HH:mm:ss"
        disableClock={true}
        clearIcon={false}
        hourPlaceholder="hh"
        minutePlaceholder="mm"
        secondPlaceholder="ss"
      />
                        
              </InputGroup>
              {errors.starttime && <span style={{color:"red"}}>* {Constant.START_TIME}</span>}
             
              </div>
              <div className="col-md-6">
              <Form.Label>EndTime</Form.Label>
              <InputGroup className="mb-3 form-control no-border">


<TimePicker
className=""
       onChange={(e) => setEndTime(e)}
       value={endTime}
        format="HH:mm:ss"
        disableClock={true}
        clearIcon={false}
        hourPlaceholder="hh"
        minutePlaceholder="mm"
        secondPlaceholder="ss"
      />                               
              </InputGroup>
              {errors.endtime && <span style={{color:"red"}}>* {Constant.END_TIME}</span>}
              
              </div>
              </div>
              <div className="form-grp-1">
              <Form.Label>Lower Price Band</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Lower Price Band"
                  aria-label="Lower Price Band"
                  aria-describedby="basic-addon1"
                  name="lpband"
                  value={lpBand}
                  // onChange={(e) => setLPBand(e.target.value)}
                  {...register("lpband", {onChange :(e) => setLPBand(e.target.value), required: true })}
                />
              </InputGroup>
              {errors.lpband && <span style={{color:"red"}}>* {Constant.LOWER_PRICE_BAND}</span>}
              </div>
              <div className="form-grp-1">
              <Form.Label>Upper Price Band</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Upper Price Band"
                  aria-label="Upper Price Band"
                  aria-describedby="basic-addon1"
                  name="upband"
                  value={upBand}
                  // onChange={(e) => setUPBand(e.target.value)}
                  {...register("upband", {onChange :(e) => setUPBand(e.target.value), required: true })}
                />
              </InputGroup>
              {errors.upband && <span style={{color:"red"}}>* {Constant.UPPER_PRICE_BAND}</span>}
            </div>
            <div className="form-grp-1">
              <Form.Label>Volume</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Value"
                  aria-label="value"
                  aria-describedby="basic-addon1"
                  name="volume"
                  value={value}
                  // onChange={(e) => setValue(e.target.value)}
                  {...register("volume", {onChange :(e) => setValue(e.target.value), required: true })}
                />
              </InputGroup>
              {errors.volume && <span style={{color:"red"}}>* {Constant.VOLUMES}</span>}
            </div>
            <div className="form-grp-1">
              <Form.Label>Quantity</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Quantity"
                  aria-label="Quantity"
                  name="quantity"
                  value={quantityValue}
                  aria-describedby="basic-addon1"
                  // onChange={(e) => setTokenValue(e.target.value)}
                  {...register("quantity", {onChange :(e) => setQuantityValue(e.target.value), required: true })}
                />
              </InputGroup>
              {errors.quantity && <span style={{color:"red"}}>* {Constant.QUANTITY}</span>}
              </div>
              <Button variant="primary" onClick={handleSubmit(OrderTypeApiCalling)}>
                Send
              </Button>
            </Card.Body>
          </Card>
        </div>)}
        {
        orderTypeTableShow && 
      <div>
      
 <OrderType tradingData={tradingData} backToForm={backToForm}/>
      </div>
      }
        </>
    );
}

export default OrderTypeForm;
