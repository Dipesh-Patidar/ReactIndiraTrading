import React, { useState, useEffect, useContext, useMemo } from "react";
import { Card, Button, InputGroup, Form, FormControl } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as Constant from '../../common/ConstantMessage';
import TimePicker from 'react-time-picker';
import { CircularProgress, Box, Backdrop } from '@mui/material';
import { Context } from '../../pages/HomePage';
import AlertToast from '../../common/AlertToast';
import { useNavigate } from "react-router-dom";
// var fs =  require ('fs');
import {
  getOrderTypeData,
  getSymbolList
} from '../../services';


const containsText = (text, searchText) => text.Script.toLowerCase().startsWith(searchText.toLowerCase());

// const allOptions = ["Option One", "Option Two", "Option Three", "Option Four"];


export default () => {
  const { symbolList } = useContext(Context)

  // console.log("symbolList",symbolList)
  // const [orderTypeTableShow, setOrderTypeTableShow] = useState(true);
  const [tokenValueData, setTokenValueData] = useState(symbolList && symbolList);
  const [startTime, setStartTime] = useState("09:15:00");
  const [endTime, setEndTime] = useState("15:30:00");
  // const [orderTypeData, setOrderTypeData] = useState({});
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate()


  const [showAlert, setShowAlert] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  const [alertColor, setAlertColor] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedOption, setSelectedOption] = useState("");

  // const displayedOptions = useMemo(
  //   () => symbolList && symbolList.filter((option) => containsText(option, searchText)),
  //   [searchText]
  // );

  // fs.writeFile("tokenData.json",JSON.stringify(symbolList))
  // console.log("tokenValueData",tokenValueData)

  const searchFilter = (e) => {

    const TokenFilter = symbolList && symbolList.filter((option) => {
      if (option.Script.toLowerCase().startsWith(e.toLowerCase())) {
        return option
      }
    })
    setTokenValueData(TokenFilter)

  }



  const onAlertClose = e => {
    setShowAlert(false);
  }


  const TimeConvertor = (time) => {
    if (time) {
      const time1 = time.split(":")
      if (time1.length == 2) {
        var startTimeSet = time + ":00"
        return startTimeSet
      } else {
        var startTimeSet = time
        return startTimeSet
      }
    }
  }


  const OrderTypeApiCalling = async () => {
    setLoader(true)
    // setOrderTypeTableShow(true)
    var data = [];
    const userData = {
      "TokenNo": selectedOption.toString(),
      "StartTime": TimeConvertor(startTime),
      "EndTime": TimeConvertor(endTime),
    }
    const response = await getOrderTypeData(userData, setLoader, setShowAlert, setTextAlert, setAlertColor);
    if (response) {
      // setOrderTypeData({
      //   columns,
      //   response
      // })

      navigate('/order-type/table', {
        state: { response }
      })
      setLoader(false)
      // console.log("Order Type", response)
    }
  }

  // const getTokenSymbol = (e) => {

  // }






  return (
    <>
      {/* {!orderTypeTableShow && */}

      <div className="tab-body">
        <Backdrop className="backdrop-overlay"
          sx={{ color: '#000000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
        // onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Card >
          <Card.Body>
            <Card.Title>Order Type</Card.Title>
            <div className="form-grp-1 col-md-4">
              <Form.Label>Search</Form.Label>
              <InputGroup className="mb-3 ">
                <FormControl
                  placeholder="Search.."
                  aria-label="search"
                  name="search"
                  aria-describedby="basic-addon1"
                  // value={tokenValue}
                  onChange={(e) => searchFilter(e.target.value)}

                />
              </InputGroup>

            </div>
            <div className="col-md-12" >
              <div className="row " style={{ height: '50vh', overflowY: 'scroll', overflowX: 'hidden' }}>
                {/* {

                  loaded &&
                  <Box sx={{ display: 'flex', }}>
                    <CircularProgress sx={{ color: '#000000', margin: "auto" }} disableShrink />
                  </Box>

                } */}
                {tokenValueData && tokenValueData.map((token, i) =>
                (
                  <div className="col-md-6" >
                    <div class="form-check" >
                      <Form.Check
                        type="radio"
                        label={token.Script}
                        name="token"
                        id={token.Token}
                        value={token.Token}
                        {...register("token", { onChange: (e) => setSelectedOption(e.target.value), required: true })}
                      >

                      </Form.Check>

                    </div>

                  </div>
                ))}

              </div>
              {errors.token && <span style={{ color: "red" }}>* {Constant.TOKEN}</span>}
            </div>


            <div className="row col-md-12 paid-top">
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
                {errors.starttime && <span style={{ color: "red" }}>* {Constant.START_TIME}</span>}

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
                {errors.endtime && <span style={{ color: "red" }}>* {Constant.END_TIME}</span>}

              </div>
            </div>

            <Button variant="primary"
              onClick={handleSubmit(OrderTypeApiCalling)}
            >
              Send
            </Button>
          </Card.Body>
        </Card>
      </div>
      {/* }
      {
        orderTypeTableShow &&


        <OrderTypeTable orderTypeData={orderTypeData}
          backToForm={backToForm}
        />

      } */}
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
