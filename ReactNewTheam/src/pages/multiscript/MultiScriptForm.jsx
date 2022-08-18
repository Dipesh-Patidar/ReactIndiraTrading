import React, { useEffect, useState, useContext } from 'react';
import { Card, Button, InputGroup, Form, Col, FormControl } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as Constant from '../../common/ConstantMessage';
import { CircularProgress, Box, Backdrop } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { Context } from '../../pages/HomePage';
import {
  getMultiSciptTokenList,
  getMultiScriptData
} from '../../services';
import AlertToast from '../../common/AlertToast';


export default () => {
  const [tokensData, setTokensData] = useState([]);
  const [selectedTokens, setSelectedTokens] = useState([]);
  const [searchText, setSerachText] = useState([]);
  //  const  [isMultiScript, setIsMultiScript] = useState(false);
  //  const [multiScriptData,setMultiScriptData] = useState();
  const [loaded, setLoaded] = useState(false);
  const [loadedOnSend, setLoadedOnSend] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  const [alertColor, setAlertColor] = useState("");

  const { item, getMultiScriptTokens } = useContext(Context)
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  // console.log("Hyd",useContext(Context))

  const onAlertClose = e => {
    setShowAlert(false);
  }

  useEffect(async () => {
    setLoaded(true)
    const response = await getMultiSciptTokenList(setLoaded,setShowAlert,setTextAlert,setAlertColor);
    if (response) {
      setLoaded(false)
      setTokensData(response)
      setSerachText(response.sort((a, b) => a - b))
      getMultiScriptTokens(response.sort((a, b) => a - b))
      // console.log("Response",response)
    }
  }, []);

  //this check token is select or not and arrange in array 

  const getTokenCheck = (e) => {
    const tokenValue = e.target.value;
    if (e.target.checked) {
      setSelectedTokens([...selectedTokens, tokenValue]);
    } else {
      setSelectedTokens(selectedTokens.filter((filter) => filter != '' + tokenValue + ''));
    }
  }

  // This for get Data from MultiScript Api

  const multiScriptCalculation = async () => {
    setLoadedOnSend(true)
    const listArray = {
      "Tlist": selectedTokens
    }
    const res = await getMultiScriptData(listArray,setLoadedOnSend,setShowAlert,setTextAlert,setAlertColor);
    var data = []
    if (res) {
      // console.log("rse", res)
      Object.entries(res).map((item) => {
        data.push({
          Time: item[0].split(",")[0].substr(2, 5),
          Token: parseInt(item[0].split(",")[1]),
          OType: item[0].split(",")[2].substr(2, 2).replace(/'/, ""),
          Price: item[1]['(\'Price\', \'mean\')'],
          Count: item[1]['(\'SNO\', \'count\')'],
          Quantity: item[1]['(\'Qty\', \'sum\')']
        })
      })

      navigate('/multiscript/table', {
        state: { data }
      })
      setLoadedOnSend(false);
    }
  }

  // This function for search filter on tokens

  const getSearchValue = (e) => {
    const filterToken = searchText && searchText.filter((item) => {
      if (item.includes(e)) {
        return item
      }
    });
    getMultiScriptTokens(filterToken)
  }


  // const backToForm = () => {
  //   // navigate('/order-type')
  //   // console.log("back")
  //   setIsMultiScript(false);
  // }

  return (
    <>
      {/* <div className="tab-body"> */}
      <Backdrop className="backdrop-overlay"
        sx={{ color: '#000000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadedOnSend}
      // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* {!isMultiScript && */}
      <div className='col-5 justify-content-center mx-auto mt-5'>

        <Card >
          <Card.Body>
            <Card.Title>MultiScript</Card.Title>
            <div className="form-grp-1 col-md-4">
              <Form.Label>Search</Form.Label>
              <InputGroup className="mb-3 ">
                <FormControl
                  placeholder="Search.."
                  aria-label="search"
                  name="search"
                  aria-describedby="basic-addon1"
                  // value={tokenValue}
                  onChange={(e) => getSearchValue(e.target.value)}

                />
              </InputGroup>

            </div>
            <div className="col-md-12" >
              <div className="row " style={{ height: '50vh', overflowY: 'scroll', overflowX: 'hidden' }}>
                {

                  loaded &&
                  <Box sx={{ display: 'flex', }}>
                    <CircularProgress sx={{ color: '#000000', margin: "auto" }} disableShrink />
                  </Box>

                }
                {item && item.map((token, i) =>
                (
                  <div className="col-md-4" >
                    <div class="form-check" >
                      <input class="form-check-input"
                        //   onChange={(e) => {getTokenCheck(e)}} 
                        key={token + i}
                        type="checkbox"
                        value={token}
                        name="tokenlist"
                        {...register("tokenlist", { onChange: (e) => { getTokenCheck(e) }, required: true })}

                      />
                      <label class="form-check-label">
                        {token}
                      </label>

                    </div>

                  </div>
                ))}

              </div>
              {errors.tokenlist && <span style={{ color: "red" }}>* {Constant.VALIDATION_TOKENCHECKED}</span>}
            </div>

            <Button variant="primary mt-2"
              onClick={handleSubmit(multiScriptCalculation)}
            >
              Send
            </Button>
          </Card.Body>
        </Card>
        {/* </div> */}
      </div>
      {/* }  */}
      {/* 
                  {isMultiScript  &&
 <MultiScriptContext.Provider value={multiScriptData}
 >
  <MultiScriptTable />
</MultiScriptContext.Provider>
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
  )
}