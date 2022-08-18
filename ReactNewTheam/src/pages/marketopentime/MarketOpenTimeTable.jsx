import React, { useContext, useEffect, useState } from 'react';
import DataTable from '../../common/DataTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faMountain } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from '../../pages/HomePage';

export default () =>{
    const navigate = useNavigate();
    return(
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
                                                        <button
                                                            onClick={() => navigate("/marketopentime")}
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
                                                                    // onClick={() => downloadCSV(csvStr1)}
                                                                    >ExportToCSV</button>
                                                                    <button className="export-btn back back-btn-class"
                                                                        // onClick={() => showSummaryDetails()}
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
                                                        {/* <DataTable columns={columns} data={multiScriptData && multiScriptData} /> */}

                                                    </div>
                                                </div>
                                            </div>
                                            {/* <MultiScriptGraph /> */}

                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>

                    </div>
                </div>
        </>
    )
}