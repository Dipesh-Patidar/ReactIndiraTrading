import React, { useEffect, useContext } from "react";
// import DataTable from "react-data-table-component";
import DataTable  from '../../common/DataTable';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from "react-router-dom";
import AtpCalculatorGraph from './AtpCalculatorGraph';
import { Context } from '../../pages/HomePage';



export default (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { response } = location.state;

  const { AtpCalculatorData, getAtpCalculatorData } = useContext(Context);



  const columns = [
    {
      name: "SNo.",
      selector: (row) => row.SNO,
      sortable: true,

    },
    {
      name: "Time",
      selector: (row) => row.Time,
      sortable: true,

    },
    {
      name: "Script",
      selector: (row) => row.Script,
      sortable: true,
    },
    {
      name: "BATP",
      selector: (row) => row.BATP,
      sortable: true,
    },
    {
      name: "SATP",
      selector: (row) => row.SATP,
      sortable: true,
    },
    {
      name: "ATP",
      selector: (row) => row.ATP,
      sortable: true,
    },
    {
      name: "NBQ",
      selector: (row) => row.NBQ,
      sortable: true,
    },
    {
      name: "CNBQ",
      selector: (row) => row.CNBQ,
      sortable: true,
    },

    {
      name: "NSQ",
      selector: (row) => row.NSQ,
      sortable: true,
    },
    {
      name: "CNSQ",
      selector: (row) => row.CNSQ,
      sortable: true,
    },

    {
      name: "ANP",
      selector: (row) => row.ANP,
      sortable: true,
    },
    {
      name: "BANP",
      selector: (row) => row.BANP,
      sortable: true,
    },
    {
      name: "SANP",
      selector: (row) => row.SANP,
      sortable: true,
    },
    {
      name: "TQ",
      selector: (row) => row.TQ,
      sortable: true,
    },

  ];




  // **************CSV Export **************

  // var JsonFields = ["SNo","Script", "TStamp", "OrderN", "Algo", "MCount", "SQ", "SQCount", "OrderID", "TIME" , "Otype", "OId Diff", "TotalNQ", "TQuantity", "OCount", "Price",]

  var JsonFields = columns.map((item) => item.name);

  function JsonToCSV() {
    var csvStr = JsonFields.join(",") + "\n";
    response.forEach(airport => {

      csvStr += airport.SNO + ',' + airport.Time + ',' + airport.Script + ',' + airport.BATP + ',' + airport.SATP + ',' + airport.ATP + ',' + airport.NBQ + ',' + airport.CNBQ + ',' + airport.NSQ + ',' + airport.CNSQ + ',' + airport.ANP + ',' + airport.BANP +  ',' + airport.SANP +',' + airport.TQ + "\n";

    })
    return csvStr;
  }


  const csvStr1 = JsonToCSV()
  function downloadCSV(csvStr) {
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvStr);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'AtpCalculatorData.csv';
    hiddenElement.click();
  }



  useEffect(() => {
    getAtpCalculatorData(response)
  }, [])

  return (
    <>

      <div>
        <div className="content tablesize">
          <div className="row">
            <div className="col-md-12">
              <div className="card">

                <div className="content tablesize" >
                  <div className="row justify-contant-start">
                    <div className="col-md-12">
                      <div className="card">
                        <div className="card-header order_type">
                          {
                            <>
                              <button
                                onClick={() => navigate('/')}
                                className="export-btn back back-btn-class">
                                <FontAwesomeIcon icon={faArrowAltCircleLeft} className="me-1" />
                                Back </button>
                              {/* <button className="export-btn back back-btn-class" onClick={() => downloadCSV(csvStr1)}>ExportToCSV</button> */}

                            </>}
                          <h4 className="card-title">Atp Calculation</h4>
                        </div>
                        <div className="card-body">

                          <div className="row order-type-export mb-2">
                            <div className="export-btn">
                              <button className="export-btn back back-btn-class"
                                onClick={() => downloadCSV(csvStr1)}
                              >ExportToCSV</button>
                            </div>
                          </div>
                          <DataTable columns={columns} data={AtpCalculatorData && AtpCalculatorData}/>

                        </div>
                      </div>
                    </div>
                    <AtpCalculatorGraph />
                  </div>
                </div>


              </div>
            </div>
          </div>

          {/*  <OrderTypeLinegraph orderTypeData={orderTypeData} orderTypeGraph={tradingData.data}/> */}
        </div>
      </div>
    </>
  )
}