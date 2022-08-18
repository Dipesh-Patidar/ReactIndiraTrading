import React,{useState,useEffect} from 'react';
import axios from "axios";
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";

const StreamTableData = (props) =>{
    const  {
        streamDataDetails,
        backToForm
    } = props

    const [streamDataD, setStreamDataD] = useState(streamDataDetails.data);
  const [orderIdListMatch ,setOrderIdListmatch]  = useState("")


    const customStyles = {
        headCells: {
          style: {
            width:'30px',
            background:'#000',
            color:'#fff',
            justifyContent: 'center',
            
          },
        },
        cells: {
          style: {
            justifyContent:'center',
            minWidth:'auto !important',
            
            
          },
        },
      };

      const paginationComponentOptions = {
        selectAllRowsItem: true,
        selectAllRowsItemText: 'ALL',
      };


const FilterSearch = (e) =>{
  if(e.target.value === ""){
    setStreamDataD(streamDataDetails.data)
    return
  }
var SearchFilterData =  streamDataD.filter((item)=>{
 
    if(item.orderid == e.target.value)
    return item
  })
  
  setStreamDataD(SearchFilterData)
}

// ************************* OrderId Match ********************************


const conditionalRowStyles = [
  {
   
    when: row => orderIdListMatch  ? row.orderid == orderIdListMatch.filter((item)=>{
   
      if(item.includes(row.orderid.toString())){
        return item
      }
    })[0] : '',
    style: {
      backgroundColor: '#289984',
      color: 'white',
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
];

const getOrderIdList = () =>{
  const header = {
    'Content-Type': 'application/json',
  }

   axios.get(`http://192.168.100.22:9000/orderidlist`, { headers: header, data: {} })
    .then(res => {
    if(res){
      // console.log("OreidList",res.data)
    var OIdList =  Object.values(res.data).map((item)=>{
       return item.toString()
      })
      console.log("Item",OIdList)
      if(OIdList.length > 1)
       setOrderIdListmatch(OIdList)
    }
      })
      .catch(err => {
        console.log('OrderIdList Error', err);
        return err.response;
      });
}



    return (
        <>
              
    <div className="content">
        <div className="row">

          <div className="col-md-12">
       
            <div className="card">
              <div className="card-header order_type">
              <button onClick={() => backToForm()} className="export-btn back"> Back</button>
                <h4 className="card-title">Stream Details</h4>
              </div>
              <div className="card-body">
          
        <div className="row order-type-export"> 
      <div className="export-btn">
      {/* <ExportToExcel apiData={Object.values(dataTrade)} fileName={fileName}/> */}
            <button onClick={() =>getOrderIdList()}>OrderId Match</button>
           
                  </div>
                  </div>

                  <div className="col-md-2">
                    <label style={{ fontWeight: "bold", color: "black" }}>
                      OrderId
                    </label>
                    <input
                        type="text"
                        placeholder="Enter orderid"
                        name="orderid"
                        className="form-control"
                        style={{'marginBottom':'20px'}}
                        onChange={(e) => FilterSearch(e)}
                        //  value={greaterThanTquant}
                      />
                  </div>
        <DataTable
          columns={streamDataDetails.columns}
          data={streamDataD}
          // noHeader
          defaultSortField="id"
          defaultSortAsc={false} 
          pagination
          highlightOnHover 
          fixedHeader ={true}
          fixedHeaderScrollHeight= {'550px'}
          paginationPerPage={10}
          paginationComponentOptions={paginationComponentOptions}
          paginationRowsPerPageOptions={[10,50,100]}
          customStyles={customStyles}
          conditionalRowStyles={conditionalRowStyles}

        />
      
    </div>
    </div>
    </div>
    </div>
    </div>

        </>
    )
}
export default StreamTableData;