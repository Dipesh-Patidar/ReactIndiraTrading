import React, {useState } from "react";
import axios from "axios";
import { Card, Button, InputGroup, FormControl ,Form} from "react-bootstrap";
import TradingData from "../TradingData/TradingData";
import LineGrapgh from '../Charts/LineGrapgh';
import { useForm } from "react-hook-form";
import * as Constant from '../../common/ConstantMessage';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// import XLSX_File from '../../../src/16012022_RESPONES.xlsx';
// var XLSX = require('xlsx')

const AtpCalculator = () => {
    const [tradingShow, setTradingShow] = useState(false);
    const [tokenValue, setTokenValue] = useState("");
    const [minuteValue, getMinuteValue] = useState("");
    const [loader, setLoader] = useState(false);
    const { register,handleSubmit,formState: { errors }  } = useForm();
  
 
  

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
          name: "Script",
          selector: (row) => row.srcipt,
          sortable: true,
        },
        {
          name: "BATP",
          selector: (row) => row.batp,
          sortable: true,
        },
        {
          name: "SATP",
          selector: (row) => row.satp,
          sortable: true,
        },
        {
          name: "ATP",
          selector: (row) => row.atp,
          sortable: true,
        },
        {
          name: "NBQ",
          selector: (row) => row.nbq,
          sortable: true,
        },
        {
          name: "CNBQ",
          selector: (row) => row.cnbq,
          sortable: true,
        },
        
        {
          name: "NSQ",
          selector: (row) => row.nsq,
          sortable: true,
        },
        {
          name: "CNSQ",
          selector: (row) => row.cnsq,
          sortable: true,
        },
        
        {
          name: "ANP",
          selector: (row) => row.anp,
          sortable: true,
        },
        {
          name: "TQ",
          selector: (row) => row.tq,
          sortable: true,
        },
        
      ];
      var data = [];
      const [tradingData, setTradingData] = useState({
        columns,
        data,
      });
      const [dataTrade, setDataTrade] = useState("");
    
    
      const TradeApiCalling = async() => {
        setLoader(true);
        
        const header = {
          "Content-Type": "application/json",
        };
        const data1 ={
            "TokenNo":tokenValue,
            "Min":minuteValue
        }
       await axios
          .post(`http://192.168.100.22:9000/atpcalculator`,data1, {
            headers: header,
          })
          .then((res) => {
            console.log("res", res);
            if (res) {
           
              Object.values(res.data).forEach((airport) => {
                data.push({
                  sno: airport.SNO,
                  anp: airport.ANP,
                  batp: airport.BATP,
                  satp: airport.SATP,
                  atp: airport.ATP,
                  cnbq: airport.CNBQ,
                  cnsq: airport.CNSQ,
                  nbq: airport.NBQ,
                  nsq: airport.NSQ,
                  tq: airport.TQ,
                  time: airport.Time,
                  srcipt:airport.Script,
                });
              });
              setTradingData({ 
                columns,
                data,
              });
              setDataTrade(res.data);

              setTradingShow(true);
              setLoader(false);
              
            }
          })
          .catch(err => {
            console.log('ATP Calculator', err);
            setLoader(false);
            return err.response;
          });
      };

      const backToForm = () => {
        setTradingShow(false);
      }


    return (
        <>
                     {!tradingShow && (
        <div className="tab-body">
 <Backdrop className="backdrop-overlay"
        sx={{ color: '#000000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop> 
      
          
          <h2>ATP Calculator</h2>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>ATP Calculator</Card.Title>
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
              <Form.Label>Time</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Time in minutes"
                  aria-label="minute"
                  name="minute"
                  aria-describedby="basic-addon1"
                  // onChange={(e) => getMinuteValue(e.target.value)}
                  {...register("minute", {onChange : (e) => getMinuteValue(e.target.value), required: true })}
                />
              </InputGroup>
              {errors.minute && <span style={{color:"red"}}>* {Constant.MINUTES}</span>}
              </div>
              <Button variant="primary" onClick={handleSubmit(TradeApiCalling)}>
                Send
              </Button>
            </Card.Body>
          </Card>
        </div>
      )}
       {tradingShow && 
      <div>
                
               
      <TradingData tradingData={tradingData} dataTrade={dataTrade} columns={columns} backToForm={backToForm}/>
      <LineGrapgh dataTrade={dataTrade} tradingData={tradingData}/>
      </div>
      }
        </>
    );
}

export default AtpCalculator;
