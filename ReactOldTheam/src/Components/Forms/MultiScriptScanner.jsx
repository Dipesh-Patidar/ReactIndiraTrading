import React,{useState} from 'react';
import axios from "axios";
import { Card, Button, InputGroup, FormControl ,Form} from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as Constant from '../../common/ConstantMessage';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function MultiScriptScanner (){
    const [loader, setLoader] = useState(false);

   return(
    <>
    {
    // !tradingShow &&  
    <div className="tab-body">
<Backdrop  className="backdrop-overlay"
sx={{ color: '#000000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
open={loader}
// onClick={handleClose}
>
<CircularProgress color="inherit" />
</Backdrop>
  
  <h2>MultiScriptScanner</h2>
  <Card style={{ width: "18rem" }}>
    <Card.Body>
      <Card.Title>MultiScriptScanner</Card.Title>
      <div className="row">
          <div className="col-md-3">
      <div className="form-grp-1">
      <Form.Label>Token 1</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Token 1"
          name="token1"
          aria-label="stream"
          aria-describedby="basic-addon1"
        //   value={streamValue}
        //    {...register("token1", {onChange : (e)=> setStreamValue(e.target.value), required: true })}
        />
      </InputGroup>
      {/* {errors.token1 && <span style={{color:"red"}}>* {Constant.StreamValueError}</span>} */}
      </div>
      </div>
      <div className="col-md-3">
      <div className="form-grp-1">
      <Form.Label>Token 2</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Token 2"
          name="token2"
          aria-label="stream"
          aria-describedby="basic-addon1"
        //   value={streamValue}
        //    {...register("token2", {onChange : (e)=> setStreamValue(e.target.value), required: true })}
        />
      </InputGroup>
      {/* {errors.token2 && <span style={{color:"red"}}>* {Constant.StreamValueError}</span>} */}
      </div>
      </div>
      <div className="col-md-3">
      <div className="form-grp-1">
      <Form.Label>Token 3</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Token 3"
          name="token3"
          aria-label="stream"
          aria-describedby="basic-addon1"
        //   value={streamValue}
        //    {...register("token3", {onChange : (e)=> setStreamValue(e.target.value), required: true })}
        />
      </InputGroup>
      {/* {errors.token3 && <span style={{color:"red"}}>* {Constant.StreamValueError}</span>} */}
      </div>
      </div>
      <div className="col-md-3">
      <div className="form-grp-1">
      <Form.Label>Token 4</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Token 4"
          name="token4"
          aria-label="stream"
          aria-describedby="basic-addon1"
        //   value={streamValue}
        //    {...register("token4", {onChange : (e)=> setStreamValue(e.target.value), required: true })}
        />
      </InputGroup>
      {/* {errors.token4 && <span style={{color:"red"}}>* {Constant.StreamValueError}</span>} */}
      </div>
      </div>
      <div className="col-md-3">
      <div className="form-grp-1">
      <Form.Label>Token 5</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Token 5"
          name="token5"
          aria-label="stream"
          aria-describedby="basic-addon1"
        //   value={streamValue}
        //    {...register("token5", {onChange : (e)=> setStreamValue(e.target.value), required: true })}
        />
      </InputGroup>
      {/* {errors.token5 && <span style={{color:"red"}}>* {Constant.StreamValueError}</span>} */}
      </div>
      </div>
      <div className="col-md-3">
      <div className="form-grp-1">
      <Form.Label>Token 6</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Token 6"
          name="token6"
          aria-label="stream"
          aria-describedby="basic-addon1"
        //   value={streamValue}
        //    {...register("token6", {onChange : (e)=> setStreamValue(e.target.value), required: true })}
        />
      </InputGroup>
      {/* {errors.token6 && <span style={{color:"red"}}>* {Constant.StreamValueError}</span>} */}
      </div>
      </div>
      <div className="col-md-3">
      <div className="form-grp-1">
      <Form.Label>Token 7</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Token 7"
          name="token7"
          aria-label="stream"
          aria-describedby="basic-addon1"
        //   value={streamValue}
        //    {...register("token7", {onChange : (e)=> setStreamValue(e.target.value), required: true })}
        />
      </InputGroup>
      {/* {errors.token7 && <span style={{color:"red"}}>* {Constant.StreamValueError}</span>} */}
      </div>
      </div>
      <div className="col-md-3">
      <div className="form-grp-1">
      <Form.Label>Token 8</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Token 8"
          name="token8"
          aria-label="stream"
          aria-describedby="basic-addon1"
        //   value={streamValue}
        //    {...register("token8", {onChange : (e)=> setStreamValue(e.target.value), required: true })}
        />
      </InputGroup>
      {/* {errors.token8 && <span style={{color:"red"}}>* {Constant.StreamValueError}</span>} */}
      </div>
      </div>
      <div className="col-md-3">
      <div className="form-grp-1">
      <Form.Label>Token 9</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Token 9"
          name="token9"
          aria-label="stream"
          aria-describedby="basic-addon1"
        //   value={streamValue}
        //    {...register("token9", {onChange : (e)=> setStreamValue(e.target.value), required: true })}
        />
      </InputGroup>
      {/* {errors.token9 && <span style={{color:"red"}}>* {Constant.StreamValueError}</span>} */}
      </div>
      </div>
      <div className="col-md-3">
      <div className="form-grp-1">
      <Form.Label>Token 10</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Token 10"
          name="token10"
          aria-label="stream"
          aria-describedby="basic-addon1"
        //   value={streamValue}
        //    {...register("token10", {onChange : (e)=> setStreamValue(e.target.value), required: true })}
        />
      </InputGroup>
      {/* {errors.token10 && <span style={{color:"red"}}>* {Constant.StreamValueError}</span>} */}
      </div>
      </div>
      <div className="col-md-3">
      <div className="form-grp-1">
      <Form.Label>Token 11</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Token 11"
          name="token11"
          aria-label="stream"
          aria-describedby="basic-addon1"
        //   value={streamValue}
        //    {...register("token11", {onChange : (e)=> setStreamValue(e.target.value), required: true })}
        />
      </InputGroup>
      {/* {errors.token11 && <span style={{color:"red"}}>* {Constant.StreamValueError}</span>} */}
      </div>
      </div>
      <div className="col-md-3">
      <div className="form-grp-1">
      <Form.Label>Token 12</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Token 12"
          name="token12"
          aria-label="stream"
          aria-describedby="basic-addon1"
        //   value={streamValue}
        //    {...register("token12", {onChange : (e)=> setStreamValue(e.target.value), required: true })}
        />
      </InputGroup>
      {/* {errors.token12 && <span style={{color:"red"}}>* {Constant.StreamValueError}</span>} */}
      </div>
      </div>
      <div className="col-md-3">
      <div className="form-grp-1">
      <Form.Label>Token 13</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Token 13"
          name="token13"
          aria-label="stream"
          aria-describedby="basic-addon1"
        //   value={streamValue}
        //    {...register("token13", {onChange : (e)=> setStreamValue(e.target.value), required: true })}
        />
      </InputGroup>
      {/* {errors.token13 && <span style={{color:"red"}}>* {Constant.StreamValueError}</span>} */}
      </div>
      </div>
      <div className="col-md-3">
      <div className="form-grp-1">
      <Form.Label>Token 14</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Token 14"
          name="token14"
          aria-label="stream"
          aria-describedby="basic-addon1"
        //   value={streamValue}
        //    {...register("token14", {onChange : (e)=> setStreamValue(e.target.value), required: true })}
        />
      </InputGroup>
      {/* {errors.token1 && <span style={{color:"red"}}>* {Constant.StreamValueError}</span>} */}
      </div>
      </div>
      <div className="col-md-3">
      <div className="form-grp-1">
      <Form.Label>Token 15</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Token 15"
          name="token15"
          aria-label="stream"
          aria-describedby="basic-addon1"
        //   value={streamValue}
        //    {...register("token15", {onChange : (e)=> setStreamValue(e.target.value), required: true })}
        />
      </InputGroup>
      {/* {errors.token15 && <span style={{color:"red"}}>* {Constant.StreamValueError}</span>} */}
      </div>
      </div>
      <div className="col-md-3">
      <div className="form-grp-1">
      <Form.Label>Token 16</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Token 16"
          name="token16"
          aria-label="stream"
          aria-describedby="basic-addon1"
        //   value={streamValue}
        //    {...register("token16", {onChange : (e)=> setStreamValue(e.target.value), required: true })}
        />
      </InputGroup>
      {/* {errors.token16 && <span style={{color:"red"}}>* {Constant.StreamValueError}</span>} */}
      </div>
      </div>
      <div className="col-md-3">
      <div className="form-grp-1">
      <Form.Label>Token 17</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Token 17 "
          name="token17"
          aria-label="stream"
          aria-describedby="basic-addon1"
        //   value={streamValue}
        //    {...register("token17", {onChange : (e)=> setStreamValue(e.target.value), required: true })}
        />
      </InputGroup>
      {/* {errors.token17 && <span style={{color:"red"}}>* {Constant.StreamValueError}</span>} */}
      </div>
      </div>
      <div className="col-md-3">
      <div className="form-grp-1">
      <Form.Label>Token 18</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Token 18"
          name="token18"
          aria-label="stream"
          aria-describedby="basic-addon1"
        //   value={streamValue}
        //    {...register("token18", {onChange : (e)=> setStreamValue(e.target.value), required: true })}
        />
      </InputGroup>
      {/* {errors.token18 && <span style={{color:"red"}}>* {Constant.StreamValueError}</span>} */}
      </div>
      </div>
      <div className="col-md-3">
      <div className="form-grp-1">
      <Form.Label>Token 19</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Token 19"
          name="token19"
          aria-label="stream"
          aria-describedby="basic-addon1"
        //   value={streamValue}
        //    {...register("token19", {onChange : (e)=> setStreamValue(e.target.value), required: true })}
        />
      </InputGroup>
      {/* {errors.token19 && <span style={{color:"red"}}>* {Constant.StreamValueError}</span>} */}
      </div>
      </div>
      <div className="col-md-3">
      <div className="form-grp-1">
      <Form.Label>Token 20</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Token 20"
          name="token20"
          aria-label="stream"
          aria-describedby="basic-addon1"
        //   value={streamValue}
        //    {...register("token20", {onChange : (e)=> setStreamValue(e.target.value), required: true })}
        />
      </InputGroup>
      {/* {errors.token20 && <span style={{color:"red"}}>* {Constant.StreamValueError}</span>} */}
      </div>
      </div>
      <div className="col-md-3">
      <div className="form-grp-1">
      <Form.Label>Token 21</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Token 21"
          name="token21"
          aria-label="stream"
          aria-describedby="basic-addon1"
        //   value={streamValue}
        //    {...register("token21", {onChange : (e)=> setStreamValue(e.target.value), required: true })}
        />
      </InputGroup>
      {/* {errors.token21 && <span style={{color:"red"}}>* {Constant.StreamValueError}</span>} */}
      </div>
      </div>
      <div className="col-md-3">
      <div className="form-grp-1">
      <Form.Label>Token 22</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Token 22"
          name="token22"
          aria-label="stream"
          aria-describedby="basic-addon1"
        //   value={streamValue}
        //    {...register("token22", {onChange : (e)=> setStreamValue(e.target.value), required: true })}
        />
      </InputGroup>
      {/* {errors.token22 && <span style={{color:"red"}}>* {Constant.StreamValueError}</span>} */}
      </div>
      </div>
      <div className="col-md-3">
      <div className="form-grp-1">
      <Form.Label>Token 23</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Token 23"
          name="token23"
          aria-label="stream"
          aria-describedby="basic-addon1"
        //   value={streamValue}
        //    {...register("token23", {onChange : (e)=> setStreamValue(e.target.value), required: true })}
        />
      </InputGroup>
      {/* {errors.token23 && <span style={{color:"red"}}>* {Constant.StreamValueError}</span>} */}
      </div>
      </div>
      <div className="col-md-3">
      <div className="form-grp-1">
      <Form.Label>Token 24</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Token 24"
          name="token24"
          aria-label="stream"
          aria-describedby="basic-addon1"
        //   value={streamValue}
        //    {...register("token24", {onChange : (e)=> setStreamValue(e.target.value), required: true })}
        />
      </InputGroup>
      {/* {errors.token24 && <span style={{color:"red"}}>* {Constant.StreamValueError}</span>} */}
      </div>
      </div>
      <div className="col-md-3">
      <div className="form-grp-1">
      <Form.Label>Token 25</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Token 25"
          name="token25"
          aria-label="stream"
          aria-describedby="basic-addon1"
        //   value={streamValue}
        //    {...register("token25", {onChange : (e)=> setStreamValue(e.target.value), required: true })}
        />
      </InputGroup>
      {/* {errors.token25 && <span style={{color:"red"}}>* {Constant.StreamValueError}</span>} */}
      </div>
      </div>
      </div>
      <Button variant="primary" 
    //   onClick={handleSubmit(StreamDataApiCalling)}
      >
        Send
      </Button>
    </Card.Body>
  </Card>
</div>
}
{/* {
  tradingShow && <StreamTableData backToForm={backToForm} streamDataDetails={streamDataDetails}/>
} */}
</>
   )
}