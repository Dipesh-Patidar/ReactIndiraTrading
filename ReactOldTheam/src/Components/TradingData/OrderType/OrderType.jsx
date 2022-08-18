import React,{useState, useEffect} from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import OrderTypeTable from './OrderTypeTable';
import OrderTypeSummary from './OrderTypeSummary';
import {CircularProgress, LinearProgress }from '@mui/material';
import Box from '@mui/material/Box';

const OrderType = (props) => {
    const { 
        tradingData,
        backToForm
    } = props
   
const [orderTableData,setOrderTableData] = useState([]);

useEffect(()=>{
       setOrderTableData(tradingData);
    },[])

    return (
        <>
            <div className="tab-wrapper">
        <Tabs defaultActiveKey="Details" id="uncontrolled-tab-example" className="mb-3">
       
          <Tab eventKey="Summary" title="Summary">
            <OrderTypeSummary tradingData={tradingData} />
          </Tab>
          <Tab eventKey="Details" title="Details">
   
     
     {orderTableData.length === 0 ? 
     <Box sx={{ display: 'flex' }}>
        <LinearProgress />
       <CircularProgress />
      </Box> :
    (<div> 
         <div className="col-md-2">
                  <button onClick={() => backToForm("dd")} className="backButton"> Back</button>
                 
                </div>
        <OrderTypeTable  
       tradingData={orderTableData}   
      
       />

    </div>
          )
}

         
          </Tab>

        </Tabs></div>
        </>
    );
}

export default OrderType;
