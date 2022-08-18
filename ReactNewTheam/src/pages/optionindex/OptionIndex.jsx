import React, { useEffect, useState, useContext } from 'react';
// import Styled from 'styled-componets';
import DataTable from '../../common/DataTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Card, Button, InputGroup, Form, FormControl } from "react-bootstrap";

import { faArrowAltCircleLeft, faMountain } from '@fortawesome/free-solid-svg-icons';
// import { useLocation, useNavigate } from "react-router-dom";

import {getOptionIndexPerCentData } from '../../services';
import { Context } from '../../pages/HomePage';


export default () => {
    const [showSummay, setShowSummary] = useState(false);
    const [summeryData, setSummeryData] = useState([])
    const [date, setDate] = useState();
    const [data, setData] = useState({})
    const { getOptionIndexData} = useContext(Context);

    const SummaryColumn = [
        {
            name: "Date",
            selector: (row) => row.date,
            sortable: true,
            // width: "140px",

        },
        {
            name: "0 to 5",
            selector: (row) => row.zero_five,
            sortable: true,
            // width: "140px",
            style: {
                backgroundColor: 'rgb(65 65 249 / 48%)',
                color: 'white',
                '&:hover': {
                    cursor: 'pointer',
                },
            },

        },
        {
            name: "5 to 10",
            selector: (row) => row.five_ten,
            sortable: true,
            // width: "140px",
            style: {
                backgroundColor: 'rgb(225,225,0,0.9)',
                color: 'black',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
        {
            name: "10 to 20",
            selector: (row) => row.ten_twinty,
            sortable: true,
            // width: "140px",
            style: {
                backgroundColor: 'rgb(242,165,0,0.9)',
                color: 'white',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
        {
            name: "20 to 50",
            selector: (row) => row.above_twinty,
            sortable: true,
            // width: "140px"
            style: {
                backgroundColor: 'rgb(242,0,0,0.9)',
                color: 'white',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
    ]
    // console.log("date",date);

    const filterByDate = (e) => {
        var ArrayM = [];

        const dateF = e.replaceAll("-", "")
        // console.log("dats",dateF,e)

        const filterByDa = data.data && data.data.filter((item) => {
            if (item.Date.includes(dateF.toString())) {
                return item
            }
        });

        ArrayM.push({
            "date": filterByDa[0]["Date"].split(",")[0],
            "zero_five": "",
            "five_ten": "",
            "ten_twinty": "",
            "above_twinty": ""
        })

        // console.log("filterByDa",filterByDa)

        for (var x in filterByDa[0]) {
            if (filterByDa[0][x].split(",")[1] > 0 && filterByDa[0][x].split(",")[1] < 5) {
                // console.log("filterByDa0>5",x,filterByDa[x].split(",")[1])
                ArrayM.push({
                    "date": filterByDa[0]["Date"].split(",")[0],
                    "zero_five": x,
                    "five_ten": "",
                    "ten_twinty": "",
                    "above_twinty": ""
                })
            }
            else if (filterByDa[0][x].split(",")[1] >= 5 && filterByDa[0][x].split(",")[1] < 10) {
                // console.log("filterByDa[0]5>10",x,filterByDa[0][x].split(",")[1])
                ArrayM.push({
                    "date": filterByDa[0]["Date"].split(",")[0],
                    "zero_five": "",
                    "five_ten": x,
                    "ten_twinty": "",
                    "above_twinty": ""
                })
            }
            else if (filterByDa[0][x].split(",")[1] >= 10 && filterByDa[0][x].split(",")[1] < 20) {
                // console.log("filterByDa[0]10>20",x,filterByDa[0][x].split(",")[1])
                ArrayM.push({
                    "date": filterByDa[0]["Date"].split(",")[0],
                    "zero_five": "",
                    "five_ten": "",
                    "ten_twinty": x,
                    "above_twinty": ""
                })
            }
            else if (filterByDa[0][x].split(",")[1] >= 20 && filterByDa[0][x].split(",")[1] < 50) {
                // console.log("filterByDa[0]20", x)
                if (x != "Expiry" && x != "Date") {
                    ArrayM.push({
                        "date": filterByDa[0]["Date"].split(",")[0],
                        "zero_five": "",
                        "five_ten": "",
                        "ten_twinty": "",
                        "above_twinty": x
                    })
                }
            }

        }
        setSummeryData(ArrayM)
        // console.log("ArrayM", ArrayM)

    }

    const getSummeryData = (data) => {
        var ArrayM = [];

        ArrayM.push({
            "date": data[data.length - 1]["Date"].split(",")[0],
            "zero_five": " ",
            "five_ten": " ",
            "ten_twinty": " ",
            "above_twinty": " "
        })

        // console.log("filterByDate",filterByDate);
        if (data && data) {
            const LastData = data[data.length - 1];
            for (var x in LastData) {
                if (LastData[x].split(",")[1] > 0 && LastData[x].split(",")[1] < 5) {
                    // console.log("LastData0>5",x,LastData[x].split(",")[1])
                    ArrayM.push({
                        "date": LastData["Date"].split(",")[0],
                        "zero_five": x,
                        "five_ten": "",
                        "ten_twinty": "",
                        "above_twinty": ""
                    })
                }
                else if (LastData[x].split(",")[1] >= 5 && LastData[x].split(",")[1] < 10) {
                    // console.log("LastData5>10",x,LastData[x].split(",")[1])
                    ArrayM.push({
                        "date": LastData["Date"].split(",")[0],
                        "zero_five": "",
                        "five_ten": x,
                        "ten_twinty": "",
                        "above_twinty": ""
                    })
                }
                else if (LastData[x].split(",")[1] >= 10 && LastData[x].split(",")[1] < 20) {
                    // console.log("LastData10>20",x,LastData[x].split(",")[1])
                    ArrayM.push({
                        "date": LastData["Date"].split(",")[0],
                        "zero_five": "",
                        "five_ten": "",
                        "ten_twinty": x,
                        "above_twinty": ""
                    })
                }
                else if (LastData[x].split(",")[1] >= 20 && LastData[x].split(",")[1] < 50) {
                    // console.log("LastData20", x)
                    if (x != "Expiry" && x != "Date") {
                        ArrayM.push({
                            "date": LastData["Date"].split(",")[0],
                            "zero_five": "",
                            "five_ten": "",
                            "ten_twinty": "",
                            "above_twinty": x
                        })
                    }
                }

            }
            setSummeryData(ArrayM)
            // console.log("ArrayM", ArrayM)
        }
    }

    // if (data.data && data.data) {
    //     console.log("value", data.data[0])
    //     const groupedByColumnKeys = Object.keys(data.data[0]).filter((e) => e !== "Date" && e !== "Expiry" && e !== "index")
    //     var groupedByExpiryDate = {};
    //     for (var key in data.data) {

    //         var date = data.data[key].Expiry;
    //         if (!groupedByExpiryDate[date]) {
    //             groupedByExpiryDate[date] = [];
    //         }
    //         groupedByExpiryDate[date].push(data.data[key]);
    //     }
    //     console.log("groupedByDate", groupedByExpiryDate)
    //     // Object.values(groupedByExpiryDate).map((GroupExpiry) => {
    //     for (var d in groupedByExpiryDate) {
    //         groupedByColumnKeys.map((columnsKey) => {
    //             // console.log("columnsKey", columnsKey)
    //             var preValues = 0;
    //             var length = 0;
    //             groupedByExpiryDate[d].map((item) => {
    //                 length++;
    //                 preValues += item[columnsKey];
    //                 var preSum = preValues - item[columnsKey];
    //                 var preLength = length - 1
    //                 var preAvg = preSum / preLength;
    //                 var finalPercentage = ((item[columnsKey] - preAvg) * 100) / preAvg;
    //                 if (finalPercentage > 0 && !isNaN(finalPercentage)) {
    //                     //    console.log("finalPercentage",finalPercentage)
    //                     if (finalPercentage > 0 && finalPercentage <= 5) {
    //                         cellColorDiv.current = 'blue'
    //                         // console.log("finalPercentage >0 cellColorDiv.current",  cellColorDiv.current);

    //                             //   console.log("finalPercentage >0",  finalPercentage);
    //                         //    v.class("democlass");



    //                         //     v.style.color="red";
    //                         //    var   ele =  document.querySelector('#cellColor1').innerHTML();
    //                         //         ele.classList.add('otherclass');
    //                     // return 'g'
    //                     }

    //                     else if (finalPercentage > 5 && finalPercentage <= 10) {
    //                         cellColorDiv.current = 'yellow'
    //                         // console.log("finalPercentage >5 cellColorDiv.current",  cellColorDiv.current);
    //                         // return finalPercentage
    //                         // console.log("finalPercentage >5", finalPercentage)

    //                     }
    //                     else if (finalPercentage > 10 && finalPercentage <= 20) {
    //                         // return "orange";
    //                         // return finalPercentage
    //                         cellColorDiv.current = 'orange'
    //                         // console.log("finalPercentage >10 cellColorDiv.current",  cellColorDiv.current);

    //                         // console.log("finalPercentage > 10", finalPercentage)
    //                     } else if (finalPercentage > 20) {
    //                         // return  "red";
    //                         // return finalPercentage
    //                         cellColorDiv.current = 'red'
    //                         // console.log("finalPercentage >20 cellColorDiv.current",  cellColorDiv.current);

    //                         // console.log("finalPercentage >20", finalPercentage)
    //                     }


    //                 }
    //                 // console.log("finalPercentage-",finalPercentage ,"(item[columnsKey]-",item[columnsKey], "preAvg-",preAvg)
    //             })
    //         })
    //     }

    // }


    const ShowColor = (row) => {
        // console.log("row",row)
    }

    const getAllOptionData = async () => {
        const respo = await getOptionIndexPerCentData();
        if (respo) {
            getOptionIndexData(respo)
            var columns = [
                {
                    name: "Date",
                    selector: (row) => row.Date.split(",")[0],
                    sortable: true,
                    width: "140px",
                    style: {
                        backgroundColor: 'purple',
                        color: 'white',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    },

                }

            ]

            const RemoveColumns = Object.keys(respo[0]).filter((e) => e !== "Date" && e !== "Expiry" && e !== "index")
            RemoveColumns.map((item, i) => {

                columns.push({
                    name: item,
                    selector: (row) => row[item].split(",")[0],
                    sortable: true,
                    width: "200px",
                    conditionalCellStyles: [
                        {

                            when: (row) => row[item].split(",")[1] > 0 && row[item].split(",")[1] < 5,
                            style: {
                                backgroundColor: 'rgb(65 65 249 / 48%)',
                                color: 'white',
                                '&:hover': {
                                    cursor: 'pointer',
                                },
                            },
                        },
                        {

                            when: row => row[item].split(",")[1] >= 5 && row[item].split(",")[1] < 10,
                            style: {
                                backgroundColor: 'rgb(225,225,0,0.9)',
                                color: 'black',
                                '&:hover': {
                                    cursor: 'pointer',
                                },
                            },
                        },
                        {

                            when: row => row[item].split(",")[1] >= 10 && row[item].split(",")[1] < 20,
                            style: {
                                backgroundColor: 'rgb(242,165,0,0.9)',
                                color: 'white',
                                '&:hover': {
                                    cursor: 'pointer',
                                },
                            },
                        },
                        {

                            when: row => row[item].split(",")[1] >= 20 && row[item].split(",")[1] < 50,
                            style: {
                                backgroundColor: 'rgb(242,0,0,0.9)',
                                color: 'white',
                                '&:hover': {
                                    cursor: 'pointer',
                                },
                            },
                        },
                        {

                            when: row => row[item].split(",")[1] >= 50 && row[item].split(",")[1] < 100,
                            style: {
                                backgroundColor: 'rgb(242,194,0,0.9)',
                                color: 'white',
                                '&:hover': {
                                    cursor: 'pointer',
                                },
                            },
                        }

                    ]


                })
            })
            getSummeryData(respo)
            setData({ data: respo, columns: columns })
        }


    }


    useEffect(async () => {
        getAllOptionData();
    }, [])




    // **************CSV Export **************

    var JsonFields = Object.keys(data).length !== 0 && data.columns.map((item) => item.name);

    function JsonToCSV() {
        var csvStr = JsonFields && JsonFields.join(",") + "\n";

        data.data && data.data.forEach(airport => {
            // console.log("value", airport);
            
            JsonFields && JsonFields.map((item) => {
                csvStr += airport[item] !== undefined && airport[item].split(",")[0] + ',';
            })
            csvStr += "\n"

        })
        return csvStr;
    }

    const csvStr1 = JsonToCSV()
    function downloadCSV(csvStr) {
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvStr);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'OptionIndex.csv';
        hiddenElement.click();
    }


    const conditionalRowStyles = [
        {
            when: row => row.WeekDay == "Thursday",
            style: {
                backgroundColor: 'rgb(200,152,0,0.9)',
                color: 'white',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        }
    ]


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
                                            <div className="card-header order_type">
                                                <button
                                                    // onClick={() => navigate("/multiscript")}
                                                    className="export-btn back back-btn-class">
                                                    <FontAwesomeIcon icon={faArrowAltCircleLeft} className="me-1" />
                                                    Back </button>

                                                <h4 className="card-title">Option Index</h4>
                                            </div>
                                            <div  >

                                                <div className="export-btn multiscript_btn">
                                                    <button className="export-btn back back-btn-class"
                                                    onClick={() => downloadCSV(csvStr1)}
                                                    >ExportToCSV</button>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="card">
                                                            {/* <div className="card-header order_type">
                                                                <div className="col-md-3">
                                                                    <Form.Label>Date</Form.Label>
                                                                    {/* <InputGroup className="mb-3 form-control no-border"> 
                                                                        <FormControl
                                                                            placeholder="Search.."
                                                                            aria-label="search"
                                                                            name="search"
                                                                            type="date"
                                                                            aria-describedby="basic-addon1"
                                                                            // value={tokenValue}
                                                                            onChange={(e) => filterByDate(e.target.value)}

                                                                        />


                                                                    {/* </InputGroup> */}
                                                            {/* {errors.endtime && <span style={{ color: "red" }}>* {Constant.END_TIME}</span>} 

                                                                </div>
                                                                <DataTable columns={SummaryColumn} data={summeryData && summeryData} />
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                        <div className="col-md-12">
                                            {/* <div className="card-header order_type">
                                  <button
                                      // onClick={() => navigate("/multiscript")}
                                      className="export-btn back back-btn-class">
                                      <FontAwesomeIcon icon={faArrowAltCircleLeft} className="me-1" />
                                      Back </button>

                                  <h4 className="card-title">Option Data</h4>
                              </div> */}
                                            {/* <div className="card"> */}
                                            <div className="card-body">
                                                <div className="row">
                                                    {/* <div className="row order-type-export mb-2">
                                          <div className="export-btn multiscript_btn">
                                              <DataTable columns={SummaryColumn} data={ArrayM} />
                                              <button className="export-btn back back-btn-class"
                                              // onClick={() => downloadCSV(csvStr1)}
                                              >ExportToCSV</button>


                                          </div>

                                      </div> */}


                                                </div>

                                                <div className="card">
                                                    <div className="card-header order_type">
                                                        <DataTable columns={data.columns} data={data.data} conditionalRowStyles={conditionalRowStyles} />

                                                    </div>
                                                </div>
                                            </div>
                                            {/* </div> */}
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