import React,{useState, useEffect} from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import OrderPositioningTable from './OrderPositioningTable';
import OrderPositioningSummary from './OrderPositioningSummary';
import {CircularProgress, LinearProgress }from '@mui/material';
import Box from '@mui/material/Box';

const OrderPosition = (props) => {
    const { 
        orderPositioning,
        backToForm
    } = props
   
const [orderPositioningTable,setOrderPositioningTable] = useState([]);

useEffect(()=>{
    setOrderPositioningTable(orderPositioning);
    },[])

    return (
        <>
            <div className="tab-wrapper">
        <Tabs defaultActiveKey="Tables" id="uncontrolled-tab-example" className="mb-3">
       
          <Tab eventKey="Summary" title="Summary">
            <OrderPositioningSummary  />
          </Tab>
          <Tab eventKey="Tables" title="Tables">

     {orderPositioningTable.length === 0 ? 
     <Box sx={{ display: 'flex' }}>
        <LinearProgress />
       <CircularProgress />
      </Box> :
    (<div> 
         <div className="col-md-2">
                  <button onClick={() => backToForm()} className="backButton"> Back</button>
                 
                </div>
       <OrderPositioningTable  
       orderPositioning={orderPositioning}
      
       />

    </div>
          )
}

         
          </Tab>

        </Tabs></div>
        </>
    );
}

export default OrderPosition;
