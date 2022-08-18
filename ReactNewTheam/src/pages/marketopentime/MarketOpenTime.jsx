import React, { useState, useEffect, useContext } from "react";
import { Card, Button, InputGroup, Form, FormControl } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as Constant from '../../common/ConstantMessage';
import TimePicker from 'react-time-picker';
import { CircularProgress, Box, Backdrop } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { Context } from '../../pages/HomePage';
import AlertToast from '../../common/AlertToast';
import {
    getMarketOpenData
  } from '../../services';

export default () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [nillStart, setNillStart] = useState("0");
  const [nillEnd, setNillEnd] = useState("1500");
  const [midStart, setMidStart] = useState("1500");
  const [midEnd, setMidEnd] = useState("3000");
  const [averageStart, setAverageStart] = useState("3000");
  const [averageEnd, setAverageEnd] = useState("7000");
  const [highStart, setHighStart] = useState("7000");
  const [highEnd, setHighEnd] = useState("10000");
  const [superHighStart, setSuperHighStart] = useState("10000");
  const [superHighEnd, setSuperHighEnd] = useState("above 10000");

const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm();


  const handleMarketOpenTime = async() =>{
    const data= {
        SDate:startDate.replaceAll("-",""),
        EDate:endDate.replaceAll("-","")
      }
//   const response = await getMarketOpenData(data);
// navigate("/marketopentable")
//   console.log("respimsd",response)
  } 


    return (
        <>
            <div className="tab-body">
                {/* <Backdrop className="backdrop-overlay"
          sx={{ color: '#000000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
        // onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop> */}

                <Card >
                    <Card.Body>
                        <Card.Title>MarketOpenTime</Card.Title>

                        <div className="row col-md-12 ">
                            <div className="col-md-6">
                                <Form.Label>StartDate</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="StartDate"
                                        name="startdate"
                                        aria-label="startdate"
                                        aria-describedby="basic-addon1"
                                        type="date"
                                       {...register("startdate", {onChange : (e)=> setStartDate(e.target.value), required: true })}
                                    />
                                </InputGroup>
                                {errors.startdate && <span style={{ color: "red" }}>* {Constant.START_TIME}</span>}

                            </div>
                            <div className="col-md-6">
                                <Form.Label>EndDate</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="EndDate"
                                        name="enddate"
                                        aria-label="enddate"
                                        aria-describedby="basic-addon1"
                                        type="date"
                                       {...register("enddate", {onChange : (e)=> setEndDate(e.target.value), required: true })}
                                    />
                                </InputGroup>
                                {errors.enddate && <span style={{ color: "red" }}>* {Constant.END_TIME}</span>}

                            </div>
                        </div>

                        <div className="row col-md-12 ">
                            <div className="col-md-6">
                                <Form.Label>NillStart</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="NillStart"
                                        name="nillstart"
                                        aria-label="nillstart"
                                        aria-describedby="basic-addon1"
                                        value={nillStart}
                                       {...register("nillstart", {onChange : (e)=> setNillStart(e.target.value), required: true })}
                                    />
                                </InputGroup>
                                {errors.nillstart && <span style={{ color: "red" }}>* {Constant.START_TIME}</span>}

                            </div>
                            <div className="col-md-6">
                                <Form.Label>NillEnd</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="NillEnd"
                                        name="nillend"
                                        aria-label="nillend"
                                        aria-describedby="basic-addon1"
                                        value={nillEnd}
                                       {...register("nillend", {onChange : (e)=> setNillEnd(e.target.value), required: true })}
                                    />
                                </InputGroup>
                                {errors.nillend && <span style={{ color: "red" }}>* {Constant.END_TIME}</span>}

                            </div>
                        </div>

                        <div className="row col-md-12 ">
                            <div className="col-md-6">
                                <Form.Label>MidStart</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="MidStart"
                                        name="midstart"
                                        aria-label="midstart"
                                        aria-describedby="basic-addon1"
                                        value={midStart}
                                       {...register("midstart", {onChange : (e)=> setMidStart(e.target.value), required: true })}
                                    />
                                </InputGroup>
                                {errors.midstart && <span style={{ color: "red" }}>* {Constant.START_TIME}</span>}

                            </div>
                            <div className="col-md-6">
                                <Form.Label>MidEnd</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="MidEnd"
                                        name="midend"
                                        aria-label="midend"
                                        aria-describedby="basic-addon1"
                                        value={midEnd}
                                       {...register("midend", {onChange : (e)=> setMidEnd(e.target.value), required: true })}
                                    />
                                </InputGroup>
                                {errors.midend && <span style={{ color: "red" }}>* {Constant.END_TIME}</span>}

                            </div>
                        </div>

                        <div className="row col-md-12 ">
                            <div className="col-md-6">
                                <Form.Label>AverageStart</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="AverageStart"
                                        name="averagestart"
                                        aria-label="averagestart"
                                        aria-describedby="basic-addon1"
                                        value={averageStart}
                                       {...register("averagestart", {onChange : (e)=> setAverageStart(e.target.value), required: true })}
                                    />
                                </InputGroup>
                                {errors.averagestart && <span style={{ color: "red" }}>* {Constant.START_TIME}</span>}

                            </div>
                            <div className="col-md-6">
                                <Form.Label>AverageEnd</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="AverageEnd"
                                        name="averagestart"
                                        aria-label="averagestart"
                                        aria-describedby="basic-addon1"
                                        value={averageEnd}
                                       {...register("averagestart", {onChange : (e)=> setAverageEnd(e.target.value), required: true })}
                                    />
                                </InputGroup>
                                {errors.averagestart && <span style={{ color: "red" }}>* {Constant.END_TIME}</span>}

                            </div>
                        </div>

                        <div className="row col-md-12 ">
                            <div className="col-md-6">
                                <Form.Label>HighStart</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="HighStart"
                                        name="highstart"
                                        aria-label="highstart"
                                        aria-describedby="basic-addon1"
                                        value={highStart}
                                       {...register("highstart", {onChange : (e)=> setHighStart(e.target.value), required: true })}
                                    />
                                </InputGroup>
                                {errors.highstart && <span style={{ color: "red" }}>* {Constant.START_TIME}</span>}

                            </div>
                            <div className="col-md-6">
                                <Form.Label>HighEnd</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="HighEnd"
                                        name="highend"
                                        aria-label="highend"
                                        aria-describedby="basic-addon1"
                                        value={highEnd}
                                       {...register("highend", {onChange : (e)=> setHighEnd(e.target.value), required: true })}
                                    />
                                </InputGroup>
                                {errors.highend && <span style={{ color: "red" }}>* {Constant.END_TIME}</span>}

                            </div>
                        </div>

                        <div className="row col-md-12 ">
                            <div className="col-md-6">
                                <Form.Label>SuperHighStart</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="SuperHighStart"
                                        name="superhighstart"
                                        aria-label="superhighstart"
                                        aria-describedby="basic-addon1"
                                        value={superHighStart}
                                       {...register("superhighstart", {onChange : (e)=> setSuperHighStart(e.target.value), required: true })}
                                    />
                                </InputGroup>
                                {errors.superhighstart && <span style={{ color: "red" }}>* {Constant.START_TIME}</span>}

                            </div>
                            <div className="col-md-6">
                                <Form.Label>SuperHighEnd</Form.Label>
                                <InputGroup className="mb-3">
                                   {superHighEnd}
                                </InputGroup>
                                {/* {errors.superhighend && <span style={{ color: "red" }}>* {Constant.END_TIME}</span>} */}

                            </div>
                        </div>
                        <Button variant="primary"
                          onClick={handleSubmit(handleMarketOpenTime)}
                        >
                            Send
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}