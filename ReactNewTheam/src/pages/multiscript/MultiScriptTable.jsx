import React, { useContext, useEffect, useState } from 'react';
import DataTable from '../../common/DataTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faMountain } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from "react-router-dom";
import MultiScriptGraph from './MultiScriptGraph';
import MultiScriptSummary from './MultiScriptSummary';
import { Context } from '../../pages/HomePage';




export default () => {
    const { multiScriptData, getMultiScriptTokensData } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const { data } = location.state

    const [showSummay, setShowSummary] = useState(false);

    // console.log("location",location.state, " ddd",data)

    const columns = [
        // {
        //   name: "SNo.",
        //   selector: (row) => row.SNO,
        //   sortable: true,
        // },
        {
            name: "Time",
            selector: (row) => row.Time,
            sortable: true,
        },
        {
            name: "Otype",
            selector: (row) => row.OType,
            sortable: true,
        },
        {
            name: "Token",
            selector: (row) => row.Token,
            sortable: true,
        },
        {
            name: "Quantity",
            selector: (row) => row.Quantity,
            sortable: true,
        },
        {
            name: "Count",
            selector: (row) => row.Count,
            sortable: true,
        },
        {
            name: "Price",
            selector: (row) => Math.round(row.Price * 100) / 10000,
            sortable: true,
        },
    ];



    const backToForm = () => {

        setShowSummary(false);
    }

    const showSummaryDetails = () => {
        setShowSummary(true)
    }

    useEffect(() => {
        getMultiScriptTokensData(data)
    }, [])


      // **************CSV Export **************

  var JsonFields = columns.map((item) => item.name);

  function JsonToCSV() {
    var csvStr = JsonFields.join(",") + "\n";
    multiScriptData && multiScriptData.forEach(airport => {

      csvStr += airport.Time + ',' + airport.OType + ',' + airport.Token + ',' + airport.Quantity + ',' + airport.Count + ',' + Math.round(airport.Price * 100) / 10000 + "\n";

    })
    return csvStr;
  }


  const csvStr1 = JsonToCSV()
  function downloadCSV(csvStr) {
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvStr);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'OrderTypeData.csv';
    hiddenElement.click();
  }

    return (
        <>
            {!showSummay &&
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
                                                        <button
                                                            onClick={() => navigate("/multiscript")}
                                                            className="export-btn back back-btn-class">
                                                            <FontAwesomeIcon icon={faArrowAltCircleLeft} className="me-1" />
                                                            Back </button>

                                                        <h4 className="card-title">MultiScript</h4>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="row order-type-export mb-2">
                                                                <div className="export-btn multiscript_btn">
                                                                    <button className="export-btn back back-btn-class"
                                                                    onClick={() => downloadCSV(csvStr1)}
                                                                    >ExportToCSV</button>
                                                                    <button className="export-btn back back-btn-class"
                                                                        onClick={() => showSummaryDetails()}
                                                                        className="export-btn back back-btn-class">
                                                                        <FontAwesomeIcon icon={faMountain} className="me-1" />
                                                                        Summary </button>

                                                                </div>

                                                            </div>

                                                            {/* <div className="row order-type-export mb-2">
                                                                <div className="export-btn">
                                                                    <button className="export-btn back back-btn-class"
                                                                    // onClick={() => downloadCSV(csvStr1)}
                                                                    >ExportToCSV</button>
                                                                </div>
                                                            </div> */}
                                                        </div>
                                                        <DataTable columns={columns} data={multiScriptData && multiScriptData} />

                                                    </div>
                                                </div>
                                            </div>
                                            <MultiScriptGraph />

                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            }
            {
                showSummay && <MultiScriptSummary backToForm={backToForm} />
            }
        </>
    )
}