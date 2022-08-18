import React,{useState} from 'react';
import axios from "axios";
import { Card, Button, InputGroup, FormControl ,Form} from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as Constant from '../../common/ConstantMessage';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import StreamTableData from '../TradingData/StreamTableData'

const StreamDataForm = () => {
    var data =[]
    const [tradingShow, setTradingShow] = useState(false);
    const [streamValue, setStreamValue] = useState("1");
    const [sDataValue, setSDataValue] = useState("0");
    const [lDataValue, setLDataValue] = useState("100");
    const [loader, setLoader] = useState(false);
    const { register,handleSubmit,formState: { errors }  } = useForm();
 

    const backToForm = () => {
        setTradingShow(false);
      }

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

      const [streamDataDetails, setStreamDataDetails] = useState({
        columns,
        data,
      });

    const StreamDataApiCalling = async() =>{
        setLoader(true)
      
        const header = {
          "Content-Type": "application/json",
        };
        const data1 ={
            "Stream":streamValue,
            "SData":sDataValue,
            "LData":lDataValue
        }
       await axios
          .post(`http://192.168.100.22:9000/streamdetails`,data1, {
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
              setStreamDataDetails({
                columns,
                data,
              });
        setTradingShow(true)
        setLoader(false)
      
            }
          })
          .catch(err => {
            console.log('Stream Calculator', err);
            setLoader(false);
            return err.response;
          });
        // setTradingShow(true)
      
      }

    return (
        <>
            {!tradingShow &&  <div className="tab-body">
 <Backdrop  className="backdrop-overlay"
        sx={{ color: '#000000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
          
          <h2>StreamData</h2>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>StreamData</Card.Title>
              <div className="form-grp-1">
              <Form.Label>Stream</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Stream"
                  name="stream"
                  aria-label="stream"
                  aria-describedby="basic-addon1"
                  value={streamValue}
                   {...register("stream", {onChange : (e)=> setStreamValue(e.target.value), required: true })}
                />
              </InputGroup>
              {errors.stream && <span style={{color:"red"}}>* {Constant.StreamValueError}</span>}
              </div>
              <div className="form-grp-1">
              <Form.Label>Start Data</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Enter Start Data"
                  aria-label="sdata"
                  name="sdata"
                  aria-describedby="basic-addon1"
                //   onChange={(e) => setSDataValue(e.target.value)}
                value={sDataValue}
                  {...register("sdata", {onChange : (e) => setSDataValue(e.target.value), required: true })}
                />
              </InputGroup>
              {errors.sdata && <span style={{color:"red"}}>* {Constant.SDataError}</span>}
              </div>
              <div className="form-grp-1">
              <Form.Label>Last Data</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Enter Last Data"
                  name="ldata"
                  aria-label="ldata"
                  aria-describedby="basic-addon1"
                  value={lDataValue}
                   {...register("ldata", {onChange : (e)=> setLDataValue(e.target.value), required: true })}
                />
              </InputGroup>
              {errors.ldata && <span style={{color:"red"}}>* {Constant.LDataError}</span>}
              </div>
              <Button variant="primary" 
              onClick={handleSubmit(StreamDataApiCalling)}
              >
                Send
              </Button>
            </Card.Body>
          </Card>
        </div>
        }
        {
          tradingShow && <StreamTableData backToForm={backToForm} streamDataDetails={streamDataDetails}/>
        }
        </>
    )}
    export default  StreamDataForm;