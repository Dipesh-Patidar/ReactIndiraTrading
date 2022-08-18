import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, InputGroup, FormControl } from '@themesberg/react-bootstrap';
import { Context } from '../../pages/HomePage';
import DataTable from '../../common/DataTable';

export default (props) => {
    const { backToForm } = props
    const { optionData } = useContext(Context);
    const [filtervalue, setFilterValue] = useState([]);
    const [defaultValue, setDefaultValue] = useState(5);


    // const [data,setData] = useState();
    // console.log("optionDat" , optionData);
    if (optionData) {
        // optionData.map((item)=>{
        // const groupedByColumnKeys = Object.keys(data.data[0]).filter((e) => e !== "Date" && e !== "Expiry" && e !== "index")
        var groupedByExpiryDate = {};
        for (var key in optionData) {

            var date = optionData[key].Expiry;
            if (!groupedByExpiryDate[date]) {
                groupedByExpiryDate[date] = [];
            }
            groupedByExpiryDate[date].push(optionData[key]);
        }



        var groupedByData = Object.values(groupedByExpiryDate)[0][Object.values(groupedByExpiryDate)[0].length - 1]

        var lowBidHighBid = []

        // for (var d in groupedByData) {
        //     if (d !== "Date" && d !== "Expiry" && d !== "index") {
        //         var data = groupedByData[d].split(",")[0]
        //         lowBidHighBid.push({
        //             highbid: data > filtervalue ? d : "",
        //             lowbid: data <= filtervalue ? d : ""

        //         })
        //     }
        // }

    }



    const filterOptionData = () => {


        for (var d in groupedByData) {
            console.log("defaultValue", typeof defaultValue);
            if (d !== "Date" && d !== "Expiry" && d !== "index") {
                var item = groupedByData[d].split(",")[0]


                lowBidHighBid.push({
                    lowbid: item <= Number(defaultValue) ? d : "",
                    highbid: item > Number(defaultValue) ? d : ""

                })
            }
        }

        console.log("lowBidHighBid", lowBidHighBid);
        setFilterValue(lowBidHighBid)

    }

    useEffect(() => {
        filterOptionData()
    }, [defaultValue])


    const OptionSummaryColumn = [
        {
            name: "Low Bid",
            selector: (row) => row.lowbid,
            sortable: true,
        },
        {
            name: "High Bid",
            selector: (row) => row.highbid,
            sortable: true,
        },
    ]


    return (
        <>
            <div>
                <div className="content tablesize">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">


                                <div className="card-header order_type">
                                    <button
                                        onClick={() => backToForm()}
                                        className="export-btn back back-btn-class">
                                        <FontAwesomeIcon icon={faArrowAltCircleLeft} className="me-1" />
                                        Back </button>

                                    <h4 className="card-title">Option Data Summary</h4>
                                </div>



                                <div className="card-body">
                                    <div className="row">
                                        <div className="card">
                                            <InputGroup className="m-3 w-25">
                                                <FormControl
                                                    placeholder="Token"
                                                    className="col-3"
                                                    name="token"
                                                    aria-label="Token"

                                                    aria-describedby="basic-addon1"
                                                    onChange={(e) => setDefaultValue(e.target.value)}
                                                />
                                            </InputGroup>
                                            <div className="card-header order_type">
                                                <DataTable columns={OptionSummaryColumn} data={filtervalue} />
                                            </div>
                                        </div>
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