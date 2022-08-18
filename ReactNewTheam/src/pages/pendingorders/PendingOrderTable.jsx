import React,{useEffect,useState} from 'react';
import { Col, Row } from '@themesberg/react-bootstrap';
import {  CircleChartWidget } from "../../components/Widgets";
import DataTable  from '../../common/DataTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

export default (props) =>{
 
  const {
    pendingOrdersData,
    pendingOrderSummarry, backToForm
  } = props
  const [loader, setLoader] = useState(true);
  const [pendingData,setPendingData] = useState([]);


useEffect(()=>{
   setPendingData(pendingOrdersData && pendingOrdersData.data)
  setLoader(false)
},[pendingOrdersData])


return(
    <>
    <Row className="justify-content-md-center">
    <Col xs={12} sm={6} xl={8} className="mb-4 p-0"> 
          <CircleChartWidget
            title="Traffic Share"
            data={pendingOrderSummarry}
             />
        </Col>
      </Row>
      <div className="content tablesize" >
        <div className="row justify-contant-start">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header order_type">
              { <button onClick={() => backToForm()} className="export-btn back back-btn-class"><FontAwesomeIcon icon={faArrowAltCircleLeft} className="me-1" /> Back </button> }
                <h4 className="card-title">Pending Orders</h4>
              </div>
              <div className="card-body">

        <div className="row order-type-export"> 
      <div className="export-btn">
      {/* <ExportToExcel apiData={Object.values(dataTrade)} fileName={fileName}/> */}
{/* <button onClick={() =>getOrderIdList()}>OrderId Match</button> */}
               
                  </div>
                  </div>
                  <DataTable columns={pendingOrdersData.columns} data={pendingData} progressPending={loader}/>
      
    </div>
    </div>
    </div>
    </div>
    </div>

    </>
)
};