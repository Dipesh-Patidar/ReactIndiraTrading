
import React,{useState} from "react";
import { Card, Button, InputGroup, FormControl ,Form} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {CircularProgress,Backdrop} from '@mui/material';



//
import {getAtpCalculatorData} from '../../services';
import * as Constant from '../../common/ConstantMessage';
import AtpCalculatorTable from './AtpCalculatorTable'
import AlertToast from '../../common/AlertToast';


export default () => {
  // const [showAtpCalculator,setAtpCalculator] = useState(false)
  const [tokenValue, setTokenValue] = useState("");
  const [minuteValue, getMinuteValue] = useState("");
  // const [atpCaluclateData,setAtpCalculateData] = useState({});
  const { register,handleSubmit,formState: { errors }  } = useForm();
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate()


  const [showAlert, setShowAlert] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  const [alertColor, setAlertColor] = useState("");
 

  // const backToForm = () => {
  //   setAtpCalculator(false);
  // }

  const onAlertClose = e => {
    setShowAlert(false);
  }


const getAtpCaluclation = async() =>{
  setLoader(true)

   const userdata = {
    "TokenNo":tokenValue,
    "Min":minuteValue
   }
const response = await getAtpCalculatorData(userdata,setLoader,setShowAlert,setTextAlert,setAlertColor);
// var data = [];
if(response){
  
  console.log("ress",response)
  // response.forEach((airport) => {
  //   data.push({
  //     sno: airport.SNO,
  //     anp: airport.ANP,
  //     batp: airport.BATP,
  //     satp: airport.SATP,
  //     atp: airport.ATP,
  //     cnbq: airport.CNBQ,
  //     cnsq: airport.CNSQ,
  //     nbq: airport.NBQ,
  //     nsq: airport.NSQ,
  //     tq: airport.TQ,
  //     time: airport.Time,
  //     srcipt:airport.Script,
  //   });
  // });

  navigate('/atpcalculator/table',{
    state:{response}
  })
  setLoader(false)

  // setAtpCalculateData({
  //   columns,
  //   data
  // });
  // setAtpCalculator(true);
}

}


  return (
    <>
{/* { !showAtpCalculator && */}
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
                  {...register("minute", {onChange : (e) => getMinuteValue(e.target.value), required: true })}
                />
              </InputGroup>
              {errors.minute && <span style={{color:"red"}}>* {Constant.MINUTES}</span>}
              </div>
              <Button variant="primary" 
              onClick={handleSubmit(getAtpCaluclation)}
              >
                Send
              </Button>
            </Card.Body>
          </Card>
        </div>
        {/* } */}
{/* {showAtpCalculator &&
  <AtpCalculatorTable atpCaluclateData={atpCaluclateData} backToForm={backToForm}/>
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
