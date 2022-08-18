import React, { useState, useEffect, useContext } from "react";
// import DataTable from "react-data-table-component";
import DataTable  from '../../common/DataTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faMountain } from '@fortawesome/free-solid-svg-icons';
import {
  useLocation,
  useNavigate
} from "react-router-dom";
import { styled } from '@mui/material/styles';
import { Chip, Paper } from '@mui/material';
import OrderTypeGraph from './OrderTypeGraph';
import OrderTypeSummary from './OrderTypeSummary';
import { Context } from '../../pages/HomePage';
// import orderData from '../../data/orderTypeData.json'





const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));


const OrderTypeTable = () => {
  // console.log("orderData",Object.values(orderData));
  const location = useLocation();
  const navigate = useNavigate();
  const [showSelectedFilter, setShowSelectedFilter] = useState("");
  const [showSummay, setShowSummary] = useState(false);

  const [activeFilters, setActiveFilters] = useState([]);
  const [filteredValues, setFilteredValues] = useState([]);

  // filters Value States

  const [orderNFilter, setOrderNFilter] = useState("");
  const [algoFilter, setAlgoFilter] = useState("");
  const [sqFilter, setSqFilter] = useState("");
  const [sqCountFilter, setSqCountFilter] = useState("");
  const [oTypeFilter, setOTypeFilter] = useState("");
  const [oIdDiffFilter, setOIdDiffFilter] = useState("");
  const [totalNFilter, setTotalNFilter] = useState("");
  const [tQuantityFilter, setTQuantityFilter] = useState("");


  // for TotalN & TQuantity Filter 

  const [selectTotalN, setSelectTotalN] = useState("");
  const [selectTQuantity, setSelectTQuantity] = useState("");






  const { response } = location.state
  const { OrderTypeData, getOrderTypeData } = useContext(Context);

  const handleDelete = (chipToDelete) => () => {
    setActiveFilters((chips) => chips.filter((chip) => {
      if (chipToDelete.name === 'ordern') {
        setOrderNFilter("")
      }
      if (chipToDelete.name === 'algo') {
        setAlgoFilter("")
      }
      if (chipToDelete.name === 'sq') {
        setSqFilter("")
      }
      if (chipToDelete.name === 'sqcount') {
        setSqCountFilter("")
      }
      if (chipToDelete.name === 'otype') {
        setOTypeFilter("")
      }
      if (chipToDelete.name === 'oidDiff') {
        setOIdDiffFilter("")
      }
      if (chipToDelete.name === 'lessThanTN') {
        setTotalNFilter("")
      }
      if (chipToDelete.name === 'greaterThanTN') {
        setTotalNFilter("")
      }
      if (chipToDelete.name === 'equalsTN') {
        setTotalNFilter("")
      }
      if (chipToDelete.name === 'lessThanTQ') {
        setTQuantityFilter("")
      }
      if (chipToDelete.name === 'greaterThanTQ') {
        setTQuantityFilter("")
      }
      if (chipToDelete.name === 'equalsTQ') {
        setTQuantityFilter("")
      }
      return chip.name !== chipToDelete.name
    }));
  };


  const columns = [
    {
      name: "SNo.",
      selector: (row) => row.SNO,
      sortable: true,
    },
    {
      name: "Script",
      selector: (row) => row.Script,
      sortable: true,
    },
    {
      name: "TStamp",
      selector: (row) => row.NTStamp,
      sortable: true,
    },
    {
      name: "OrderN",
      selector: (row) => row.OrderN,
      sortable: true,
    },
    {
      name: "Algo",
      selector: (row) => row.Algo,
      sortable: true,
    },
    {
      name: "MCount",
      selector: (row) => row.MCount,
      sortable: true,
    },

    {
      name: "SQ",
      selector: (row) => row.SQ,
      sortable: true,
    },

    {
      name: "SQCount",
      selector: (row) => row.SQCount,
      sortable: true,
    },
    {
      name: "OrderID",
      selector: (row) => row.OrderID,
      sortable: true,
    },
    {
      name: "OId Diff",
      selector: (row) => row.OID,
      sortable: true,
    },
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
      name: "TotalNQ",
      selector: (row) => row.TotalNQ,
      sortable: true,
    },
    {
      name: "TQuantity",
      selector: (row) => row.TQuantity,
      sortable: true,
    },
    {
      name: "OCount",
      selector: (row) => row.OCount,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => Math.round(row.Price * 100) / 100,
      sortable: true,
    },
  ];

 

  // useEffect(() => {
  //   getOrderTypeData(Object.values(orderData))
  // }, [orderData]);

  // ************* Get Selet Option list for Filters ***********


  const getOptionsList = (Values) => {
    // console.log("Value",typeof Values)
    var Otype = OrderTypeData && OrderTypeData.map((t) => {
      // console.log("Type",typeof symbol)

      if (Values === "OrderN")
        return t.OrderN
      else if (Values === "Algo")
        return t.Algo
      else if (Values === "SQ")
        return t.SQ
      else if (Values === "OType")
        return t.OType

    });

    var newArrOtype = [];
    Otype.forEach((item) => {
      newArrOtype[item] = Otype.filter((el) => {
        return el === item;
      }).length;
    });

    return newArrOtype
  }


  // **************CSV Export **************

  // var JsonFields = ["SNo","Script", "TStamp", "OrderN", "Algo", "MCount", "SQ", "SQCount", "OrderID", "TIME" , "Otype", "OId Diff", "TotalNQ", "TQuantity", "OCount", "Price",]

  var JsonFields = columns.map((item) => item.name);

  function JsonToCSV() {
    var csvStr = JsonFields.join(",") + "\n";
    OrderTypeData && OrderTypeData.forEach(airport => {

      csvStr += airport.SNO + ',' + airport.Script + ',' + airport.NTStamp + ',' + airport.OrderN + ',' + airport.Algo + ',' + airport.MCount + ',' + airport.SQ + ',' + airport.SQCount + ',' + airport.OrderID + ',' + airport.OID + ',' + airport.Time + ',' + airport.OType + ',' + airport.TotalNQ + ',' + airport.TQuantity + ',' + airport.OCount + ',' + Math.round(airport.Price * 100) / 100 + "\n";

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
  
  const backToForm = () => {

    setShowSummary(false);
  }

  const showSummaryDetails = () => {
    setShowSummary(true)
  }

  //*****Filter For Order type */

  var FilterList = ["OrderN", "Algo", "SQ", "SQCount", "Otype", "OIdDiff", "TotalNQ", "TQuantity"]

  const searchRecord = (event) => {
    const { target } = event;

    const isInFilter = activeFilters.some((element) => element.name === target.name);
    if (!isInFilter) {
      setActiveFilters((currentState) => {
        return [...currentState, { name: target.name, value: target.value }];
      });
    } else {
      setActiveFilters((currentState) => {
        return [...currentState.filter((x) => x.name !== target.name), { name: target.name, value: target.value }];
      });
    }
  }

  useEffect(() => {
    // Just set full data as filtered values if no filter is active
    getOrderTypeData(response)

    // console.log("activeFilters",activeFilters)


    if (activeFilters.length === 0) {
      // console.log("OrderTypeData",OrderTypeData)
      setShowSelectedFilter("")
      setFilteredValues(OrderTypeData && OrderTypeData);
      return;
    };

    let finalData = [...OrderTypeData];


    // OrderN Filter Calculations


    // Returns undefined if it cannot find the element with .name === 'list' in array, otherwise it will return that element
    const orderNData = activeFilters.find((element) => (element.name == 'ordern'));
    if (orderNData) {
      // Do some filtering for first select/dropdown
      const { value, name } = orderNData;
      setOrderNFilter(value);
      // value is the value of your select dropdown that was selected
      finalData = finalData.filter((item) => item.OrderN.toLowerCase().toString().includes(value.toLowerCase().toString()));

      if (value === "") {
        setActiveFilters((chips) => chips.filter((chip) => {
          return chip.name !== name
        }));
      }
    }

    // Algo Filter Calculations


    // Returns undefined if it cannot find the element with .name === 'list' in array, otherwise it will return that element
    const algoData = activeFilters.find((element) => (element.name == 'algo'));
    if (algoData) {
      // Do some filtering for second select/dropdown
      const { value ,name} = algoData;
      setAlgoFilter(value);
      // value is the value of your select dropdown that was selected
      finalData = finalData.filter((item) => item.Algo.toLowerCase().toString().includes(value.toLowerCase().toString()));
      if (value === "") {
        setActiveFilters((chips) => chips.filter((chip) => {
          return chip.name !== name
        }));
      }
    }

    // SQ Filter Calculations


    // Returns undefined if it cannot find the element with .name === 'list' in array, otherwise it will return that element
    const sQData = activeFilters.find((element) => (element.name == 'sq'));
    if (sQData) {
      // Do some filtering for third select/dropdown
      const { value ,name} = sQData;
      setSqFilter(value);
      // value is the value of your select dropdown that was selected
      finalData = finalData.filter((item) => item.SQ.toLowerCase().toString().startsWith(value.toLowerCase().toString()) );
      if (value === "") {
        setActiveFilters((chips) => chips.filter((chip) => {
          return chip.name !== name
        }));
      }
    }

    // SQCount Filter Calculations


    // Returns undefined if it cannot find the element with .name === 'list' in array, otherwise it will return that element
    const sQCountData = activeFilters.find((element) => (element.name == 'sqcount'));
    if (sQCountData) {
      // Do some filtering for third select/dropdown
      const { value ,name} = sQCountData;
      setSqCountFilter(value);
      // value is the value of your select dropdown that was selected
      finalData = finalData.filter((item) => item.SQCount.toString().includes(value.toString()));
      if (value === "") {
        setActiveFilters((chips) => chips.filter((chip) => {
          return chip.name !== name
        }));
      }
    }

    // Order Type Filter Calculations


    // Returns undefined if it cannot find the element with .name === 'list' in array, otherwise it will return that element
    const oTypeData = activeFilters.find((element) => (element.name == 'otype'));
    if (oTypeData) {
      // Do some filtering for third select/dropdown
      const { value ,name} = oTypeData;
      setOTypeFilter(value);
      // value is the value of your select dropdown that was selected
      finalData = finalData.filter((item) => item.OType.toLowerCase().toString().includes(value.toLowerCase().toString()));
      if (value === "") {
        setActiveFilters((chips) => chips.filter((chip) => {
          return chip.name !== name
        }));
      }
    }

    // OrderID Diff Filter Calculations

    // Returns undefined if it cannot find the element with .name === 'list' in array, otherwise it will return that element
    const oIdDiffData = activeFilters.find((element) => (element.name == 'oidDiff'));
    if (oIdDiffData) {
      // Do some filtering for third select/dropdown
      const { value ,name} = oIdDiffData;
      setOIdDiffFilter(value);
      // value is the value of your select dropdown that was selected
      finalData = finalData.filter((item) => item.OID.toString().includes(value.toString()));
      if (value === "") {
        setActiveFilters((chips) => chips.filter((chip) => {
          return chip.name !== name
        }));
      }
    }

    // TotalN Filter Calculations

    // Returns undefined if it cannot find the element with .name === 'list' in array, otherwise it will return that element
    const lessThanTNData = activeFilters.find((element) => (element.name == 'lessThanTN'));
    if (lessThanTNData) {
      // Do some filtering for third select/dropdown
      const { value ,name} = lessThanTNData;
      setTotalNFilter(value);
      // value is the value of your select dropdown that was selected
      finalData = finalData.filter((item) => (value === "" ? item.TotalNQ.toString().includes('') : item.TotalNQ <= value));
      if (value === "") {
        setActiveFilters((chips) => chips.filter((chip) => {
          return chip.name !== name
        }));
      }
    }

    // Returns undefined if it cannot find the element with .name === 'list' in array, otherwise it will return that element
    const greaterThanTNData = activeFilters.find((element) => (element.name == 'greaterThanTN'));
    if (greaterThanTNData) {
      // Do some filtering for third select/dropdown
      const { value ,name} = greaterThanTNData;
      setTotalNFilter(value);
      // value is the value of your select dropdown that was selected
      finalData = finalData.filter((item) => (value === "" ? item.TotalNQ.toString().includes('') : item.TotalNQ >= value));
      if (value === "") {
        setActiveFilters((chips) => chips.filter((chip) => {
          return chip.name !== name
        }));
      }
    }

    // Returns undefined if it cannot find the element with .name === 'list' in array, otherwise it will return that element
    const equalsTNData = activeFilters.find((element) => (element.name == 'equalsTN'));
    if (equalsTNData) {
      // Do some filtering for third select/dropdown
      const { value ,name} = equalsTNData;
      setTotalNFilter(value);
      // value is the value of your select dropdown that was selected
      finalData = finalData.filter((item) => (value === "" ? item.TotalNQ.toString().includes('') : item.TotalNQ == value));
      if (value === "") {
        setActiveFilters((chips) => chips.filter((chip) => {
          return chip.name !== name
        }));
      }
    }

    // TQuantity Filter Calculations


    // Returns undefined if it cannot find the element with .name === 'list' in array, otherwise it will return that element
    const lessThanTQData = activeFilters.find((element) => (element.name == 'lessThanTQ'));
    if (lessThanTQData) {
      // Do some filtering for third select/dropdown
      const { value ,name} = lessThanTQData;
      setTQuantityFilter(value);
      // value is the value of your select dropdown that was selected
      finalData = finalData.filter((item) => (value === "" ? item.TQuantity.toString().includes('') : item.TQuantity <= value));
      if (value === "") {
        setActiveFilters((chips) => chips.filter((chip) => {
          return chip.name !== name
        }));
      }
    }

    // Returns undefined if it cannot find the element with .name === 'list' in array, otherwise it will return that element
    const greaterThanTQData = activeFilters.find((element) => (element.name == 'greaterThanTQ'));
    if (greaterThanTQData) {
      // Do some filtering for third select/dropdown
      const { value ,name} = greaterThanTQData;
      setTQuantityFilter(value);
      // value is the value of your select dropdown that was selected
      finalData = finalData.filter((item) => (value === "" ? item.TQuantity.toString().includes('') : item.TQuantity >= value));
      if (value === "") {
        setActiveFilters((chips) => chips.filter((chip) => {
          return chip.name !== name
        }));
      }
    }

    // Returns undefined if it cannot find the element with .name === 'list' in array, otherwise it will return that element
    const equalsTQData = activeFilters.find((element) => (element.name == 'equalsTQ'));
    if (equalsTQData) {
      // Do some filtering for third select/dropdown
      const { value,name } = equalsTQData;
      setTQuantityFilter(value);
      // value is the value of your select dropdown that was selected
      finalData = finalData.filter((item) => (value === "" ? item.TQuantity.toString().includes('') : item.TQuantity == value));
      if (value === "") {
        setActiveFilters((chips) => chips.filter((chip) => {
          return chip.name !== name
        }));
      }
    }




    setFilteredValues(finalData);
    // You can go with multiple if statements to filter everything step by step
  }, [activeFilters, OrderTypeData]);

  // *********** Switch for Filters ********** 
   

  const getSelectedFilter = () => {
    // console.log("Empty", selectedValue)
    switch (showSelectedFilter) {
      case 'OrderN':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              OrderN
            </label>
            <select
              className="form-control"
              onChange={(e) => {
                searchRecord(e);
              }}
              value={orderNFilter}
              name="ordern"
            >
              <option value="">All</option>
              {Object.keys(getOptionsList("OrderN")).map((sm, i) => (
                <option value={sm}>{sm}</option>
              ))}
            </select>
          </div>

        </>)
      case 'Algo':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              Algo
            </label>
            <select
              className="form-control"
              onChange={(e) => {
                searchRecord(e);
              }}
              value={algoFilter}
              name="algo"
            >
              <option value="">All</option>
              {Object.keys(getOptionsList("Algo")).map((sm, i) => (
                <option value={sm}>{sm}</option>
              ))}
            </select>
          </div>
        </>)
      case 'SQ':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              SQ
            </label>
            <select
              className="form-control"
              onChange={(e) => {
                searchRecord(e);
              }}
              value={sqFilter}
              name="sq"
            >
              <option value="">All</option>
              {Object.keys(getOptionsList("SQ")).map((sm, i) => (
                <option value={sm}>{sm}</option>
              ))}
            </select>
          </div>
        </>)
      case 'SQCount':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              SQCount
            </label>
            <input
              type="text"
              placeholder="equalSQ"
              name="sqcount"
              className="form-control"

              onChange={(e) => searchRecord(e)}
              value={sqCountFilter}
            />
          </div>
        </>)
      case 'Otype':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              OType
            </label>
            <select
              className="form-control"
              onChange={(e) => {
                searchRecord(e);
              }}
              value={oTypeFilter}
              name="otype"
            >
              <option value="">All</option>
              {Object.keys(getOptionsList("OType")).map((sm, i) => (
                <option value={sm}>{sm}</option>
              ))}
            </select>
          </div>
        </>)
      case 'OIdDiff':
        return (<>

          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              Order Diff
            </label>
            <input
              type="text"
              placeholder="Enter Order Diff"
              name="oidDiff"
              className="form-control"

              onChange={(e) => searchRecord(e)}
              value={oIdDiffFilter}
            />
          </div>
        </>)
      case 'TotalNQ':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              TotalNQ
            </label>
            <div className="tquantity">
              <select
                className="form-control"
                onChange={(e) => {
                  setSelectTotalN(e.target.value);
                }}
                value={selectTotalN}

                name="allTotalN"
              >
                <option value="">All</option>
                <option value="lessThanTN">LT</option>
                <option value="greaterThanTN">GT</option>
                <option value="equalsTN">Equal</option>
              </select>
              {selectTotalN !== "" ? (
                <input
                  type="text"
                  placeholder={selectTotalN}
                  name={selectTotalN}
                  className="form-control"
                  style={{ marginTop: "10px" }}
                  onChange={(e) => searchRecord(e)}
                  value={totalNFilter}
                />
              ) : (
                " "
              )}
            </div>
          </div>
        </>)
      case 'TQuantity':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              TQuantity
            </label>
            <div className="tquantity">
              <select
                className="form-control"
                onChange={(e) => {
                  setSelectTQuantity(e.target.value);
                }}
                value={selectTQuantity}
                name="allTQ"
              >
                <option value="">All</option>
                <option value="lessThanTQ">LT</option>
                <option value="greaterThanTQ">GT</option>
                <option value="equalsTQ">Equal</option>
              </select>
              {selectTQuantity !== "" ? (
                <input
                  type="text"
                  placeholder={selectTQuantity}
                  name={selectTQuantity}
                  className="form-control"
                  style={{ marginTop: "10px" }}
                  onChange={(e) => searchRecord(e)}
                  value={tQuantityFilter}
                />
              ) : (
                " "
              )}
            </div>
          </div>
        </>)
      default:
        return null


    }
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
                            {
                              <>
                                <button
                                  onClick={() => {
                                    navigate('/order-type')
                                    setFilteredValues([])
                                    getOrderTypeData([])
                                  }}
                                  className="export-btn back back-btn-class">
                                  <FontAwesomeIcon icon={faArrowAltCircleLeft} className="me-1" />
                                  Back </button>
                              </>}
                            <h4 className="card-title">Order Type</h4>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="paper_class">
                                <Paper
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap',
                                    listStyle: 'none',
                                    p: 0.5,
                                    m: 0,
                                  }}
                                  component="ul"
                                >
                                  {activeFilters.map((data, i) => {
                                    return (
                                      <ListItem key={i}>
                                        <Chip
                                          // color="default"
                                          label={data.name.toUpperCase() + "-" + data.value}
                                          onDelete={handleDelete(data)}
                                        />
                                      </ListItem>
                                    );
                                  })}
                                </Paper>

                              </div>
                            </div>
                            <div className="row order-type-export">

                              <div className="export-btn">
                                <button className="export-btn back back-btn-class "
                                  onClick={() => downloadCSV(csvStr1)}
                                >ExportToCSV</button>
                                <button className="export-btn back back-btn-class csv_class"
                                  onClick={() => showSummaryDetails()}
                                >
                                  <FontAwesomeIcon icon={faMountain} className="me-1" />
                                  Summary </button>
                              </div>
                            </div>

                            <div className="row">

                              <div className="col-md-2 mb-3">
                                <label style={{ fontWeight: "bold", color: "black" }}>
                                  Filter
                                </label>
                                <select
                                  className="form-control"
                                  onChange={(e) => {
                                    setShowSelectedFilter(e.target.value);
                                  }}
                                  value={showSelectedFilter}
                                  name="filter"
                                >
                                  <option value="All">All</option>
                                  {FilterList.map((sm, i) => (
                                    <option value={sm}>{sm}</option>
                                  ))}
                                </select>
                              </div>
                              {showSelectedFilter && getSelectedFilter()}

                            </div>
                            <DataTable columns={columns} data={filteredValues && filteredValues}/>

                          </div>
                        </div>
                      </div>
                      <OrderTypeGraph />
                    </div>
                  </div>


                </div>
              </div>
            </div>

            {/*  <OrderTypeLinegraph orderTypeData={orderTypeData} orderTypeGraph={tradingData.data}/> */}
          </div>
        </div>}
      {
        showSummay && <OrderTypeSummary backToForm={backToForm} />
      }
    </>
  )
}
export default OrderTypeTable;