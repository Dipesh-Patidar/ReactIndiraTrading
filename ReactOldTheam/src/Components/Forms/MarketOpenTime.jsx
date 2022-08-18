import React, { useState } from 'react';
import axios from "axios";
import MarketOpenTimeTable from '../TradingData/MarketOpenTimeTable';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Card, Button, InputGroup, FormControl, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";


const MarketOpenTime = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [marketOpenShow, setMarketOpenShow] = useState(false)
  const [marketOpenData, setMarketOpenData] = useState("");
  const [nillStart, setNillStart] = useState(0);
  const [nillEnd, setNillEnd] = useState(1500);
  const [midStart, SetMidStart] = useState(1500);
  const [midEnd, setMidEnd] = useState(3000);
  const [averageStart, setAverageStart] = useState(3000);
  const [averageEnd, setAverageEnd] = useState(7000);
  const [highStart, setHighStart] = useState(7000);
  const [highEnd, setHighEnd] = useState(10000);
  const [superHighStart, setSuperHighStart] = useState(10000)

  const [startDate,setStartDate] = useState("");
  const [endDate,setEndDate] = useState("");

  const [loader, setLoader] = useState(false);

 
  const getMarketOpenTimeData = () => {


    setLoader(true)
    const header = {
      'Content-Type': 'application/json',
    }
    const data= {
      SDate:startDate.replaceAll("-",""),
      EDate:endDate.replaceAll("-","")
    }

    axios.post(`http://192.168.100.22:9000/premarketorder`,data, { headers: header, data: {} })
      .then(res => {
        if (res) {
          console.log("Market", res)
          var data1 = []
          Object.values(res.data).forEach((airport) => {
            data1.push({
              sno: airport.SN,
              token: airport.Token,
              symbol: airport.Symbol,
              s: airport.S,
              requesttime: airport.RequestTime,
              localtime: airport.LocalTime,
              responsetime: airport.ResponseTime,
              resloc: airport.Res_Loc,
              locreq: airport.Loc_Req,
              reqres: airport.Req_Res,
              exid: airport.ExID,
              price: Math.round(airport.Price * 100) / 100,
              qty: airport.Qty,
              remqty: airport.RemQTY,
              ot: airport.OT,
              m: airport.M,
              errcode: airport.ErrCode,
              ctclid: airport.CtclId,
              refid: airport.RefID,
              series: airport.Series,
              ltq: airport.LTQ,
              ltp: airport.LTP,
              status: airport.Status,
              lastactivityref: airport.LastActivityReference,
              l: airport.L,
              accno: airport.AccNo

            });

          })
          setLoader(false)
          setMarketOpenData(data1)
          setMarketOpenShow(true)
        }
      })
      .catch(err => {
        console.log('MarketOpenTime Api Error', err);
        setLoader(false)
        return err.response;
      });
  }
  const backToForm = () => {

    setMarketOpenShow(false);
  }
  return (
    <>
      {!marketOpenShow &&
        <div>
          <Backdrop className="backdrop-overlay"
            sx={{ color: '#000000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loader}
          // onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>

          <div>
            {/* <button onClick={() => getMarketOpenTimeData()}>Get Market Data</button> */}
          </div>
          <div className="tab-body">

            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>MarketActivity</Card.Title>
                <div className="row tilte-activity">
                  <div className=" col-md-4"> Activity</div>
                  <div className=" col-md-4"> Start</div>
                  <div className=" col-md-4">End</div>
                </div>
                <div className="row pt-4">
                  <div className="form-grp-1 col-md-4">

                    <h5>Nill :</h5>
                  </div>
                  <div className="form-grp-1 col-md-4">

                    <InputGroup className="mb-3">
                      <FormControl
                        placeholder="Start"
                        aria-label="sdata"
                        name="nillStart"
                        aria-describedby="basic-addon1"
                        value={nillStart}
                        {...register("nillStart", { onChange: (e) => setNillStart(e.target.value), required: true })}
                      />
                    </InputGroup>
                    {/* {errors.nillStart && <span style={{color:"red"}}>* {Constant.SDataError}</span>} */}
                  </div>
                  <div className="form-grp-1 col-md-4">

                    <InputGroup className="mb-3">
                      <FormControl
                        placeholder="Last"
                        name="nillEnd"
                        aria-label="ldata"
                        aria-describedby="basic-addon1"
                        value={nillEnd}
                        {...register("nillEnd", { onChange: (e) => setNillEnd(e.target.value), required: true })}
                      />
                    </InputGroup>
                    {/* {errors.nillEnd && <span style={{color:"red"}}>* {Constant.LDataError}</span>} */}
                  </div>
                </div>
                <div className="row">
                  <div className="form-grp-1 col-md-4">

                    <h5>Mid :</h5>
                  </div>
                  <div className="form-grp-1 col-md-4">

                    <InputGroup className="mb-3">
                      <FormControl
                        placeholder="Start"
                        aria-label="sdata"
                        name="midStart"
                        aria-describedby="basic-addon1"
                        value={midStart}
                        {...register("midStart", { onChange: (e) => SetMidStart(e.target.value), required: true })}
                      />
                    </InputGroup>
                    {/* {errors.sdata && <span style={{color:"red"}}>* {Constant.SDataError}</span>} */}
                  </div>
                  <div className="form-grp-1 col-md-4">

                    <InputGroup className="mb-3">
                      <FormControl
                        placeholder="Last"
                        name="midEnd"
                        aria-label="ldata"
                        aria-describedby="basic-addon1"
                        value={midEnd}
                        {...register("midEnd", { onChange: (e) => setMidEnd(e.target.value), required: true })}
                      />
                    </InputGroup>
                    {/* {errors.ldata && <span style={{color:"red"}}>* {Constant.LDataError}</span>} */}
                  </div>
                </div>
                <div className="row">
                  <div className="form-grp-1 col-md-4">

                    <h5>Average :</h5>
                  </div>
                  <div className="form-grp-1 col-md-4">

                    <InputGroup className="mb-3">
                      <FormControl
                        placeholder="Start"
                        aria-label="averageStart"
                        name="averageStart"
                        aria-describedby="basic-addon1"
                        value={averageStart}
                        {...register("averageStart", { onChange: (e) => setAverageStart(e.target.value), required: true })}
                      />
                    </InputGroup>
                    {/* {errors.averageStart && <span style={{color:"red"}}>* {Constant.SDataError}</span>} */}
                  </div>
                  <div className="form-grp-1 col-md-4">

                    <InputGroup className="mb-3">
                      <FormControl
                        placeholder="Last"
                        name="averageEnd"
                        aria-label="ldata"
                        aria-describedby="basic-addon1"
                        value={averageEnd}
                        {...register("averageEnd", { onChange: (e) => setAverageEnd(e.target.value), required: true })}
                      />
                    </InputGroup>
                    {/* {errors.averageEnd && <span style={{color:"red"}}>* {Constant.LDataError}</span>} */}
                  </div>
                </div>
                <div className="row">
                  <div className="form-grp-1 col-md-4">

                    <h5>High :</h5>
                  </div>
                  <div className="form-grp-1 col-md-4">

                    <InputGroup className="mb-3">
                      <FormControl
                        placeholder="Start"
                        aria-label="sdata"
                        name="highStart"
                        aria-describedby="basic-addon1"
                        value={highStart}
                        {...register("highStart", { onChange: (e) => setHighStart(e.target.value), required: true })}
                      />
                    </InputGroup>
                    {/* {errors.sdata && <span style={{color:"red"}}>* {Constant.SDataError}</span>} */}
                  </div>
                  <div className="form-grp-1 col-md-4">

                    <InputGroup className="mb-3">
                      <FormControl
                        placeholder="Last"
                        name="highEnd"
                        aria-label="ldata"
                        aria-describedby="basic-addon1"
                        value={highEnd}
                        {...register("highEnd", { onChange: (e) => setHighEnd(e.target.value), required: true })}
                      />
                    </InputGroup>
                    {/* {errors.highEnd && <span style={{color:"red"}}>* {Constant.LDataError}</span>} */}
                  </div>
                </div>
                <div className="row">
                  <div className="form-grp-1 col-md-4">

                    <h5>SuperHigh :</h5>
                  </div>
                  <div className="form-grp-1 col-md-4">

                    <InputGroup className="mb-3">
                      <FormControl
                        placeholder="Start"
                        aria-label="sdata"
                        name="superHighStart"
                        aria-describedby="basic-addon1"
                        value={superHighStart}
                        {...register("superHighStart", { onChange: (e) => setSuperHighStart(e.target.value), required: true })}
                      />
                    </InputGroup>
                    {/* {errors.superHighStart && <span style={{color:"red"}}>* {Constant.SDataError}</span>} */}
                  </div>
                  <div className="form-grp-1 col-md-4">

                    <h6>above {superHighStart}</h6>
                  </div>
                </div>
                <div className="row col-md-12">
                  <div className="col-md-6">
                    <Form.Label>StartDate</Form.Label>
                    {/* <InputGroup className="mb-3 form-control no-border"> */}

                    <InputGroup className="mb-3">
                      <FormControl
                      type="date"
                        placeholder="Start"
                        
                        aria-label="sdata"
                        name="StartDate"
                        aria-describedby="basic-addon1"
                        value={startDate}
                        {...register("StartDate", { onChange: (e) => setStartDate(e.target.value), required: true })}
                      />
                    </InputGroup>

                    {/* </InputGroup> */}
                    {errors.StartDate && <span style={{ color: "red" }}>* Please Select Start Date</span>}

                  </div>
                  <div className="col-md-6">
                    <Form.Label>EndDate</Form.Label>
                    {/* <InputGroup className="mb-3 form-control no-border"> */}

                    <InputGroup className="mb-3">
                      <FormControl
                      type="date"
                        placeholder="End"
                        aria-label="sdata"
                        name="Enddate"
                        aria-describedby="basic-addon1"
                        value={endDate}
                        {...register("Enddate", { onChange: (e) => setEndDate(e.target.value), required: true })}
                      />
                    </InputGroup>
                    {/* </InputGroup> */}
                    {errors.Enddate && <span style={{ color: "red" }}>* Please Select End Date</span>}

                  </div>
                </div>
                <Button variant="primary"
                  onClick={handleSubmit(getMarketOpenTimeData)}

                >
                  Send
                </Button>
              </Card.Body>
            </Card>
          </div>

        </div>
      }
      {marketOpenShow &&
        <MarketOpenTimeTable
          backToForm={backToForm}
          marketOpenData={marketOpenData}
          nillStart={nillStart}
          nillEnd={nillEnd}
          midStart={midStart}
          midEnd={midEnd}
          averageStart={averageStart}
          averageEnd={averageEnd}
          highStart={highStart}
          highEnd={highEnd}
          superHighStart={superHighStart}
        />
      }

    </>
  )
}
export default MarketOpenTime;