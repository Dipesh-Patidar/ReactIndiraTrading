import React, { useState, useEffect } from 'react';
import DataTable from "react-data-table-component";
import { Table, Button } from 'react-bootstrap'
import axios from "axios";


const MarketOpenTimeTable = (props) => {
  const { backToForm,
    marketOpenData,
    nillStart,
    nillEnd,
    midStart,
    midEnd,
    averageStart,
    averageEnd,
    highStart,
    highEnd,
    superHighStart
  } = props
  const [MarketOpenDataValue, setMarketOpenDataValue] = useState(marketOpenData)
  const [marketOpenFilter, setMarketOpenFilter] = useState(marketOpenData);
  const [result, setResult] = useState("")
  const [selectedValue, setSelectedValue] = useState("");
  const [tokenFilter, setTokenFilter] = useState("");
  const [symbolFilter, setSymbolFilter] = useState("");
  const [sFilter, setSFilter] = useState("");
  const [requestTimeFilter, setRequestTimeFilter] = useState("");
  const [localTimeFilter, setLocalTimeFilter] = useState("");
  const [responseTimeFilter, setResponseTimeFilter] = useState("");
  const [resLocFilter, setResLocFilter] = useState("");
  const [locReqFilter, setLocReqFilter] = useState("");
  const [reqResFilter, setReqResFilter] = useState("");
  const [exIdFilter, setExIdFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [qtyFilter, setQtyFilter] = useState("");
  const [remQtyFilter, setRemQTYFilter] = useState("");
  const [otFilter, setOTFilter] = useState("");
  const [mFilter, setMFilter] = useState("");
  const [errCodeFilter, setErrCodeFilter] = useState("");
  const [ctcIdFilter, setCtclIdFilter] = useState("");
  const [refIdFilter, setRefIdFilter] = useState("");
  const [seriesFilter, setSeriesFilter] = useState("");
  const [ltqFilter, setLTQFilter] = useState("");
  const [ltpFilter, setLTPFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [lastActivityReferenceFilter, setLastActivityReferenceFilter] = useState("")
  const [lFilter, setLFilter] = useState("");
  const [accNoFilter, setAccNoFilter] = useState("");

  const [marketDetailsTable, setMarketDetailsTable] = useState([]);
  const [marketDetailArray, setMarketDetailArray] = useState([])
  const [marketDataArrayValues, setMarketDataArrayValues] = useState("")
  const [marketMetaArray, setMarketMetaArray] = useState("");
  const [fromStreamValue, setFromStreamValue] = useState("");
  const [toStreamValue, setToStreamValue] = useState("");
  const [marketDateFilter, setMarketDateFilter] = useState("");
  const [marketStreamFilter, setMarketStreamFilter] = useState("");
  const [marketSymbolFilter, setMarketSymbolFilter] = useState("");
  const [marketSAFilter, setMarketSAFilter] = useState("");


  const columns = [
    {
      name: "SNo.",
      selector: (row) => row.sno,
      sortable: true,
    },
    {
      name: "Token",
      selector: (row) => row.token,
      sortable: true,
    },
    {
      name: "Symbol",
      selector: (row) => row.symbol,
      sortable: true,
    },
    {
      name: "S",
      selector: (row) => row.s,
      sortable: true,
    },
    {
      name: "RequestTime",
      selector: (row) => row.requesttime,
      sortable: true,
      width: "200px",
    },
    {
      name: "LocalTime",
      selector: (row) => row.localtime,
      sortable: true,
      width: "200px",
    },
    {
      name: "ResponseTime",
      selector: (row) => row.responsetime,
      sortable: true,
      width: "200px",
    },
    {
      name: "ResLoc",
      selector: (row) => row.resloc,
      sortable: true,
      width: "150px"
    },
    {
      name: "LocReq",
      selector: (row) => row.locreq,
      sortable: true,
      width: "150px"
    },
    {
      name: "ReqRes",
      selector: (row) => row.reqres,
      sortable: true,
      width: "150px"
    },
    {
      name: "ExID",
      selector: (row) => row.exid,
      sortable: true,
      width: "150px"
    },

    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,

    },
    {
      name: "Qty",
      selector: (row) => row.qty,
      sortable: true,
    },
    {
      name: "RemQTY",
      selector: (row) => row.remqty,
      sortable: true,
    },
    {
      name: "OT",
      selector: (row) => row.ot,
      sortable: true,
    },
    {
      name: "M",
      selector: (row) => row.m,
      sortable: true,
    },
    {
      name: "ErrCode",
      selector: (row) => row.errcode,
      sortable: true,
    },
    {
      name: "CtclId",
      selector: (row) => row.ctclid,
      sortable: true,
    },
    {
      name: "RefId",
      selector: (row) => row.refid,
      sortable: true,
    },
    {
      name: "Series",
      selector: (row) => row.series,
      sortable: true,
    },
    {
      name: "LTQ",
      selector: (row) => row.ltq,
      sortable: true,
    },
    {
      name: "LTP",
      selector: (row) => row.ltp,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "LastActivityReference",
      selector: (row) => row.lastactivityref,
      sortable: true,
    },
    {
      name: "L",
      selector: (row) => row.l,
      sortable: true,
    },
    {
      name: "AccNo",
      selector: (row) => row.accno,
      sortable: true,
    },
  ];

  const columns1 = [
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Stream",
      selector: (row) => row.stream,
      sortable: true,
    },
    {
      name: "Symbol",
      selector: (row) => row.symbol,
      sortable: true,
    },
    {
      name: "LastRejectTime",
      selector: (row) => row.lastRejectTime,
      sortable: true,
      width: "150px !important"
    },
    {
      name: "LastRejectExid",
      selector: (row) => row.lastRejectExid,
      sortable: true,
      width: "150px !important"
    },
    {
      name: "FirsrConfirmTime",
      selector: (row) => row.firsrConfirmTime,
      sortable: true,
      width: "150px !important"
    },
    {
      name: "FirsrConfirmExid",
      selector: (row) => row.firsrConfirmExid,
      sortable: true,
      width: "150px !important"
    },
    {
      name: "Symbol Activity",
      selector: (row) => row.symbolactivity,
      sortable: true,
      width: "150px !important"
    },
    {
      name: "Stream Activity",
      selector: (row) => row.streamactivity,
      sortable: true,
      width: "150px !important"
    },

  ]

  const FilterArrayList = ["Token", "Symbol", "S", "RequestTime", "LocalTime", "ResponseTime", "ResLoc", "LocReq", "ReqRes", "ExID", "Price", "Qty", "RemQTY", "OT", "M", "ErrCode", "CtclId", "RefId", "Series", "LTQ", "LTP", "Status", "LastActivityReference", "L", "AccNo"]

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: 'ALL',
  };

  const customStyles = {
    headCells: {
      style: {
        width: '50px',
        background: '#000',
        color: '#fff',
        justifyContent: 'center',
      },
    },
    cells: {
      style: {
        justifyContent: 'center',
      },
    },
  };

  const getSymboles = (Values) => {
    // console.log("Value",typeof Values)
    var Otype = marketOpenData.map((t) => {
      // console.log("Type",typeof symbol)

      if (Values === "Symbol")
        return t.symbol
      else if (Values === "S")
        return t.s
      else if (Values === "OT")
        return t.ot
      else if (Values === "M")
        return t.m
      else if (Values === "Series")
        return t.series
      else if (Values === "AccNo")
        return t.accno
    });

    var newArrOtype = [];
    Otype.forEach((item) => {
      newArrOtype[item] = Otype.filter((el) => {
        return el === item;
      }).length;
    });

    return newArrOtype
  }

  // const otherFilterComp = (searchData) => {
  //   // console.log("gh",searchData)
  //   if (tokenFilter !== "") {
  //     var searchData1 = searchData.filter((item) => {
  //       if (
  //         item.token.includes(tokenFilter.toString())

  //       ) {
  //         return item;
  //       }
  //     });
  //   }
  //   if (symbolFilter !== "") {
  //     var searchData1 = searchData.filter((item) => {
  //       if (
  //         item.symbol.toLowerCase().includes(symbolFilter.toLowerCase())
  //       ) {
  //         return item;
  //       }
  //     });
  //   }
  //   if (sFilter !== "") {
  //     // console.log("S")
  //     var searchData1 = searchData.filter((item) => {
  //       if (
  //         item.s.toLowerCase().includes(sFilter.toLowerCase())
  //       ) {
  //         return item;
  //       }
  //     });
  //   }
  //   return searchData1
  // }




  const FilterRecords = (e) => {
    // ********* Token Filter ***********

    if (e.target.name === "token") {
      setTokenFilter(e.target.value)


      searchData = marketOpenFilter.filter((item) => {
        if (
          item.token.includes(e.target.value.toString())
        ) {
          return item;
        }
      });

      if (symbolFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.symbol.toLowerCase().includes(symbolFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (sFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.s.toLowerCase().includes(sFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (localTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.localtime.includes(localTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (requestTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.requesttime.includes(requestTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (responseTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.responsetime.includes(responseTimeFilter.toString())

          ) {
            return item;
          }
        });
      }

      if (resLocFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.ertd.toString().includes(resLocFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (locReqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.locreq.toString().includes(locReqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (reqResFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.reqres.toString().includes(reqResFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (exIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.exid.toString().includes(exIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (priceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.price.toString().includes(priceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (qtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.qty.toString().includes(qtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (remQtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.remqty.toString().includes(remQtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (otFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ot.toLowerCase().includes(otFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (mFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.m.toLowerCase().includes(mFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (errCodeFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.errcode.toString().includes(errCodeFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ctcIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ctclid.toString().includes(ctcIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (refIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.refid.toString().includes(refIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (seriesFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.series.toLowerCase().includes(seriesFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (ltqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltq.toString().includes(ltqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ltpFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltp.toString().includes(ltpFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (statusFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.status.toString().includes(statusFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lastActivityReferenceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.lastactivityref.toString().includes(lastActivityReferenceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.l.toString().includes(lFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (accNoFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.accno.toLowerCase().includes(accNoFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }


    }
    // ********* Symbol Filter ***********

    if (e.target.name === "symbol") {
      setSymbolFilter(e.target.value)

      var searchData = marketOpenData.filter((item) => {
        if (
          item.symbol.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          return item;
        }
      });



      if (tokenFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.token.includes(tokenFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (sFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.s.toLowerCase().includes(sFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (requestTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.requesttime.includes(requestTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (localTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.localtime.includes(localTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (responseTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.responsetime.includes(responseTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (resLocFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.ertd.toString().includes(resLocFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (locReqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.locreq.toString().includes(locReqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (reqResFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.reqres.toString().includes(reqResFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (exIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.exid.toString().includes(exIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (priceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.price.toString().includes(priceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (qtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.qty.toString().includes(qtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (remQtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.remqty.toString().includes(remQtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (otFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ot.toLowerCase().includes(otFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (mFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.m.toLowerCase().includes(mFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (errCodeFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.errcode.toString().includes(errCodeFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ctcIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ctclid.toString().includes(ctcIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (refIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.refid.toString().includes(refIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (seriesFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.series.toLowerCase().includes(seriesFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (ltqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltq.toString().includes(ltqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ltpFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltp.toString().includes(ltpFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (statusFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.status.toString().includes(statusFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lastActivityReferenceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.lastactivityref.toString().includes(lastActivityReferenceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.l.toString().includes(lFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (accNoFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.accno.toLowerCase().includes(accNoFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }

    }
    // ********* S Filter ***********

    if (e.target.name === "s") {
      setSFilter(e.target.value)


      var searchData = marketOpenData.filter((item) => {
        if (
          item.s.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          return item;
        }
      });



      if (tokenFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.token.includes(tokenFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (symbolFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.symbol.toLowerCase().includes(symbolFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (requestTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.requesttime.includes(requestTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (localTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.localtime.includes(localTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (responseTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.responsetime.includes(responseTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (resLocFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.ertd.toString().includes(resLocFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (locReqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.locreq.toString().includes(locReqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (reqResFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.reqres.toString().includes(reqResFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (exIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.exid.toString().includes(exIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (priceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.price.toString().includes(priceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (qtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.qty.toString().includes(qtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (remQtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.remqty.toString().includes(remQtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (otFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ot.toLowerCase().includes(otFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (mFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.m.toLowerCase().includes(mFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (errCodeFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.errcode.toString().includes(errCodeFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ctcIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ctclid.toString().includes(ctcIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (refIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.refid.toString().includes(refIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (seriesFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.series.toLowerCase().includes(seriesFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (ltqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltq.toString().includes(ltqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ltpFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltp.toString().includes(ltpFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (statusFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.status.toString().includes(statusFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lastActivityReferenceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.lastactivityref.toString().includes(lastActivityReferenceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.l.toString().includes(lFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (accNoFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.accno.toLowerCase().includes(accNoFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }

    }
    // ********* Requestedtime Filter ***********
    if (e.target.name === "requesttime") {
      setRequestTimeFilter(e.target.value)
      var searchData = marketOpenData.filter((item) => {
        if (
          item.requesttime.includes(e.target.value.toString())
        ) {
          return item;
        }
      });

      if (tokenFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.token.includes(tokenFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (symbolFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.symbol.toLowerCase().includes(symbolFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (sFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.s.toLowerCase().includes(sFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }

      if (localTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.localtime.includes(localTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (responseTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.responsetime.includes(responseTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (resLocFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.ertd.toString().includes(resLocFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (locReqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.locreq.toString().includes(locReqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (reqResFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.reqres.toString().includes(reqResFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (exIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.exid.toString().includes(exIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (priceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.price.toString().includes(priceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (qtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.qty.toString().includes(qtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (remQtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.remqty.toString().includes(remQtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (otFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ot.toLowerCase().includes(otFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (mFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.m.toLowerCase().includes(mFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (errCodeFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.errcode.toString().includes(errCodeFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ctcIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ctclid.toString().includes(ctcIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (refIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.refid.toString().includes(refIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (seriesFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.series.toLowerCase().includes(seriesFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (ltqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltq.toString().includes(ltqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ltpFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltp.toString().includes(ltpFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (statusFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.status.toString().includes(statusFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lastActivityReferenceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.lastactivityref.toString().includes(lastActivityReferenceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.l.toString().includes(lFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (accNoFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.accno.toLowerCase().includes(accNoFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }


    }
    // ********* LocalTime Filter ***********
    if (e.target.name === "localtime") {
      setLocalTimeFilter(e.target.value)
      var searchData = marketOpenData.filter((item) => {
        if (
          item.localtime.includes(e.target.value.toString())
        ) {
          return item;
        }
      });

      if (tokenFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.token.includes(tokenFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (symbolFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.symbol.toLowerCase().includes(symbolFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (sFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.s.toLowerCase().includes(sFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (requestTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.requesttime.includes(requestTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (responseTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.responsetime.includes(responseTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (resLocFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.ertd.toString().includes(resLocFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (locReqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.locreq.toString().includes(locReqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (reqResFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.reqres.toString().includes(reqResFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (exIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.exid.toString().includes(exIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (priceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.price.toString().includes(priceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (qtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.qty.toString().includes(qtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (remQtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.remqty.toString().includes(remQtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (otFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ot.toLowerCase().includes(otFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (mFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.m.toLowerCase().includes(mFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (errCodeFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.errcode.toString().includes(errCodeFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ctcIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ctclid.toString().includes(ctcIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (refIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.refid.toString().includes(refIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (seriesFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.series.toLowerCase().includes(seriesFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (ltqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltq.toString().includes(ltqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ltpFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltp.toString().includes(ltpFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (statusFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.status.toString().includes(statusFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lastActivityReferenceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.lastactivityref.toString().includes(lastActivityReferenceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.l.toString().includes(lFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (accNoFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.accno.toLowerCase().includes(accNoFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }


    }
    // ********* Responsetime Filter ***********

    if (e.target.name === "responsetime") {
      setResponseTimeFilter(e.target.value)
      var searchData = marketOpenData.filter((item) => {
        if (
          item.responsetime.includes(e.target.value.toString())
        ) {
          return item;
        }
      });
      if (tokenFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.token.includes(tokenFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (symbolFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.symbol.toLowerCase().includes(symbolFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (sFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.s.toLowerCase().includes(sFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (requestTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.requesttime.includes(requestTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (localTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.localtime.includes(localTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (resLocFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.ertd.toString().includes(resLocFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (locReqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.locreq.toString().includes(locReqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (reqResFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.reqres.toString().includes(reqResFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (exIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.exid.toString().includes(exIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (priceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.price.toString().includes(priceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (qtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.qty.toString().includes(qtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (remQtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.remqty.toString().includes(remQtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (otFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ot.toLowerCase().includes(otFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (mFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.m.toLowerCase().includes(mFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (errCodeFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.errcode.toString().includes(errCodeFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ctcIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ctclid.toString().includes(ctcIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (refIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.refid.toString().includes(refIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (seriesFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.series.toLowerCase().includes(seriesFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (ltqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltq.toString().includes(ltqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ltpFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltp.toString().includes(ltpFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (statusFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.status.toString().includes(statusFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lastActivityReferenceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.lastactivityref.toString().includes(lastActivityReferenceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.l.toString().includes(lFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (accNoFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.accno.toLowerCase().includes(accNoFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }

    }
    // ********* ResLoc Filter ***********

    if (e.target.name === "resloc") {
      setResLocFilter(e.target.value)
      var searchData = marketOpenData.filter((item) => {
        if (
          // console.log("ertd",item)
          item.resloc.toString().includes(e.target.value.toString())
        ) {
          return item;
        }
      });


      if (tokenFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.token.includes(tokenFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (symbolFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.symbol.toLowerCase().includes(symbolFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (sFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.s.toLowerCase().includes(sFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (requestTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.requesttime.includes(requestTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (localTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.localtime.includes(localTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (responseTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.responsetime.includes(responseTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (locReqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.locreq.toString().includes(locReqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (reqResFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.reqres.toString().includes(reqResFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (exIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.exid.toString().includes(exIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (priceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.price.toString().includes(priceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (qtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.qty.toString().includes(qtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (remQtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.remqty.toString().includes(remQtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (otFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ot.toLowerCase().includes(otFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (mFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.m.toLowerCase().includes(mFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (errCodeFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.errcode.toString().includes(errCodeFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ctcIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ctclid.toString().includes(ctcIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (refIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.refid.toString().includes(refIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (seriesFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.series.toLowerCase().includes(seriesFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (ltqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltq.toString().includes(ltqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ltpFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltp.toString().includes(ltpFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (statusFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.status.toString().includes(statusFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lastActivityReferenceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.lastactivityref.toString().includes(lastActivityReferenceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.l.toString().includes(lFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (accNoFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.accno.toLowerCase().includes(accNoFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }

    }
    // ********* LocReq Filter ***********

    if (e.target.name === "locreq") {
      setLocReqFilter(e.target.value)
      var searchData = marketOpenData.filter((item) => {
        if (
          // console.log("ertd",item)
          item.locreq.toString().includes(e.target.value.toString())
        ) {
          return item;
        }
      });


      if (tokenFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.token.includes(tokenFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (symbolFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.symbol.toLowerCase().includes(symbolFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (sFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.s.toLowerCase().includes(sFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (requestTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.requesttime.includes(requestTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (localTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.localtime.includes(localTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (responseTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.responsetime.includes(responseTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (resLocFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.resloc.toString().includes(resLocFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (reqResFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.reqres.toString().includes(reqResFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (exIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.exid.toString().includes(exIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (priceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.price.toString().includes(priceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (qtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.qty.toString().includes(qtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (remQtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.remqty.toString().includes(remQtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (otFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ot.toLowerCase().includes(otFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (mFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.m.toLowerCase().includes(mFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (errCodeFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.errcode.toString().includes(errCodeFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ctcIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ctclid.toString().includes(ctcIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (refIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.refid.toString().includes(refIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (seriesFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.series.toLowerCase().includes(seriesFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (ltqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltq.toString().includes(ltqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ltpFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltp.toString().includes(ltpFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (statusFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.status.toString().includes(statusFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lastActivityReferenceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.lastactivityref.toString().includes(lastActivityReferenceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.l.toString().includes(lFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (accNoFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.accno.toLowerCase().includes(accNoFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }

    }
    // ********* ReqRes Filter ***********

    if (e.target.name === "reqres") {
      setReqResFilter(e.target.value)
      var searchData = marketOpenData.filter((item) => {
        if (
          // console.log("ertd",item)
          item.reqres.toString().includes(e.target.value.toString())
        ) {
          return item;
        }
      });


      if (tokenFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.token.includes(tokenFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (symbolFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.symbol.toLowerCase().includes(symbolFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (sFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.s.toLowerCase().includes(sFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (requestTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.requesttime.includes(requestTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (localTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.localtime.includes(localTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (responseTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.responsetime.includes(responseTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (resLocFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.resloc.toString().includes(resLocFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (locReqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.locreq.toString().includes(locReqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (exIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.exid.toString().includes(exIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (priceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.price.toString().includes(priceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (qtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.qty.toString().includes(qtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (remQtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.remqty.toString().includes(remQtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (otFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ot.toLowerCase().includes(otFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (mFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.m.toLowerCase().includes(mFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (errCodeFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.errcode.toString().includes(errCodeFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ctcIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ctclid.toString().includes(ctcIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (refIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.refid.toString().includes(refIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (seriesFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.series.toLowerCase().includes(seriesFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (ltqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltq.toString().includes(ltqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ltpFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltp.toString().includes(ltpFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (statusFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.status.toString().includes(statusFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lastActivityReferenceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.lastactivityref.toString().includes(lastActivityReferenceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.l.toString().includes(lFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (accNoFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.accno.toLowerCase().includes(accNoFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }

    }
    // ********* ExID Filter ***********

    if (e.target.name === "exid") {
      setExIdFilter(e.target.value)
      var searchData = marketOpenData.filter((item) => {
        if (
          item.exid.toString().includes(e.target.value.toString())
        ) {
          return item;
        }
      });

      if (tokenFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.token.includes(tokenFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (symbolFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.symbol.toLowerCase().includes(symbolFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (sFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.s.toLowerCase().includes(sFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (requestTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.requesttime.includes(requestTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (localTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.localtime.includes(localTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (responseTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.responsetime.includes(responseTimeFilter.toString())

          ) {
            return item;
          }
        });
      }

      if (resLocFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.ertd.toString().includes(resLocFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (locReqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.locreq.toString().includes(locReqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (reqResFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.reqres.toString().includes(reqResFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (priceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.price.toString().includes(priceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (qtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.qty.toString().includes(qtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (remQtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.remqty.toString().includes(remQtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (otFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ot.toLowerCase().includes(otFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (mFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.m.toLowerCase().includes(mFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (errCodeFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.errcode.toString().includes(errCodeFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ctcIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ctclid.toString().includes(ctcIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (refIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.refid.toString().includes(refIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (seriesFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.series.toLowerCase().includes(seriesFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (ltqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltq.toString().includes(ltqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ltpFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltp.toString().includes(ltpFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (statusFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.status.toString().includes(statusFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lastActivityReferenceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.lastactivityref.toString().includes(lastActivityReferenceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.l.toString().includes(lFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (accNoFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.accno.toLowerCase().includes(accNoFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
    }
    // ********* Price Filter ***********

    if (e.target.name === "price") {
      setPriceFilter(e.target.value)
      var searchData = marketOpenData.filter((item) => {
        if (
          item.price.toString().includes(e.target.value.toString())
        ) {
          return item;
        }
      });

      if (tokenFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.token.includes(tokenFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (symbolFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.symbol.toLowerCase().includes(symbolFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (sFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.s.toLowerCase().includes(sFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (requestTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.requesttime.includes(requestTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (localTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.localtime.includes(localTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (responseTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.responsetime.includes(responseTimeFilter.toString())

          ) {
            return item;
          }
        });
      }

      if (resLocFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.ertd.toString().includes(resLocFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (locReqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.locreq.toString().includes(locReqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (reqResFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.reqres.toString().includes(reqResFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (exIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.exid.toString().includes(exIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (qtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.qty.toString().includes(qtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (remQtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.remqty.toString().includes(remQtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (otFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ot.toLowerCase().includes(otFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (mFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.m.toLowerCase().includes(mFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (errCodeFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.errcode.toString().includes(errCodeFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ctcIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ctclid.toString().includes(ctcIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (refIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.refid.toString().includes(refIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (seriesFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.series.toLowerCase().includes(seriesFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (ltqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltq.toString().includes(ltqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ltpFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltp.toString().includes(ltpFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (statusFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.status.toString().includes(statusFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lastActivityReferenceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.lastactivityref.toString().includes(lastActivityReferenceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.l.toString().includes(lFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (accNoFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.accno.toLowerCase().includes(accNoFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
    }
    // ********* Qty Filter ***********

    if (e.target.name === "qty") {
      setQtyFilter(e.target.value)
      var searchData = marketOpenData.filter((item) => {
        if (
          item.qty.toString().includes(e.target.value.toString())
        ) {
          return item;
        }
      });

      if (tokenFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.token.includes(tokenFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (symbolFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.symbol.toLowerCase().includes(symbolFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (sFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.s.toLowerCase().includes(sFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (requestTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.requesttime.includes(requestTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (localTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.localtime.includes(localTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (responseTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.responsetime.includes(responseTimeFilter.toString())

          ) {
            return item;
          }
        });
      }

      if (resLocFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.ertd.toString().includes(resLocFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (locReqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.locreq.toString().includes(locReqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (reqResFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.reqres.toString().includes(reqResFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (exIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.exid.toString().includes(exIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (priceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.price.toString().includes(priceFilter.toString())
          ) {
            return item;
          }
        });
      }

      if (remQtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.remqty.toString().includes(remQtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (otFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ot.toLowerCase().includes(otFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (mFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.m.toLowerCase().includes(mFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (errCodeFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.errcode.toString().includes(errCodeFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ctcIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ctclid.toString().includes(ctcIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (refIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.refid.toString().includes(refIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (seriesFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.series.toLowerCase().includes(seriesFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (ltqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltq.toString().includes(ltqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ltpFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltp.toString().includes(ltpFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (statusFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.status.toString().includes(statusFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lastActivityReferenceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.lastactivityref.toString().includes(lastActivityReferenceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.l.toString().includes(lFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (accNoFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.accno.toLowerCase().includes(accNoFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }

    }
    // ********* RemQTY Filter ***********

    if (e.target.name === "remqty") {
      setRemQTYFilter(e.target.value)
      var searchData = marketOpenData.filter((item) => {
        if (
          item.remqty.toString().includes(e.target.value.toString())
        ) {
          return item;
        }
      });

      if (tokenFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.token.includes(tokenFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (symbolFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.symbol.toLowerCase().includes(symbolFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (sFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.s.toLowerCase().includes(sFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (requestTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.requesttime.includes(requestTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (localTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.localtime.includes(localTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (responseTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.responsetime.includes(responseTimeFilter.toString())

          ) {
            return item;
          }
        });
      }

      if (resLocFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.ertd.toString().includes(resLocFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (locReqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.locreq.toString().includes(locReqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (reqResFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.reqres.toString().includes(reqResFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (exIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.exid.toString().includes(exIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (priceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.price.toString().includes(priceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (qtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.qty.toString().includes(qtyFilter.toString())
          ) {
            return item;
          }
        });
      }

      if (otFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ot.toLowerCase().includes(otFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (mFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.m.toLowerCase().includes(mFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (errCodeFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.errcode.toString().includes(errCodeFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ctcIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ctclid.toString().includes(ctcIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (refIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.refid.toString().includes(refIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (seriesFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.series.toLowerCase().includes(seriesFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (ltqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltq.toString().includes(ltqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ltpFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltp.toString().includes(ltpFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (statusFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.status.toString().includes(statusFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lastActivityReferenceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.lastactivityref.toString().includes(lastActivityReferenceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.l.toString().includes(lFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (accNoFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.accno.toLowerCase().includes(accNoFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }

    }
    // ********* OT Filter ***********

    if (e.target.name === "ot") {
      setOTFilter(e.target.value)
      var searchData = marketOpenData.filter((item) => {
        if (
          item.ot.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          return item;
        }
      });

      if (tokenFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.token.includes(tokenFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (symbolFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.symbol.toLowerCase().includes(symbolFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (sFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.s.toLowerCase().includes(sFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (requestTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.requesttime.includes(requestTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (localTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.localtime.includes(localTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (responseTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.responsetime.includes(responseTimeFilter.toString())

          ) {
            return item;
          }
        });
      }

      if (resLocFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.ertd.toString().includes(resLocFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (locReqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.locreq.toString().includes(locReqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (reqResFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.reqres.toString().includes(reqResFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (exIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.exid.toString().includes(exIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (priceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.price.toString().includes(priceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (qtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.qty.toString().includes(qtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (remQtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.remqty.toString().includes(remQtyFilter.toString())
          ) {
            return item;
          }
        });
      }

      if (mFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.m.toLowerCase().includes(mFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (errCodeFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.errcode.toString().includes(errCodeFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ctcIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ctclid.toString().includes(ctcIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (refIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.refid.toString().includes(refIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (seriesFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.series.toLowerCase().includes(seriesFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (ltqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltq.toString().includes(ltqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ltpFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltp.toString().includes(ltpFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (statusFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.status.toString().includes(statusFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lastActivityReferenceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.lastactivityref.toString().includes(lastActivityReferenceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.l.toString().includes(lFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (accNoFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.accno.toLowerCase().includes(accNoFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }

    }
    // ********* M Filter ***********

    if (e.target.name === "m") {
      setMFilter(e.target.value)
      var searchData = marketOpenData.filter((item) => {
        if (
          item.m.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          return item;
        }
      });

      if (tokenFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.token.includes(tokenFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (symbolFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.symbol.toLowerCase().includes(symbolFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (sFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.s.toLowerCase().includes(sFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (requestTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.requesttime.includes(requestTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (localTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.localtime.includes(localTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (responseTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.responsetime.includes(responseTimeFilter.toString())

          ) {
            return item;
          }
        });
      }

      if (resLocFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.ertd.toString().includes(resLocFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (locReqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.locreq.toString().includes(locReqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (reqResFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.reqres.toString().includes(reqResFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (exIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.exid.toString().includes(exIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (priceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.price.toString().includes(priceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (qtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.qty.toString().includes(qtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (remQtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.remqty.toString().includes(remQtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (otFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ot.toLowerCase().includes(otFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }

      if (errCodeFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.errcode.toString().includes(errCodeFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ctcIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ctclid.toString().includes(ctcIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (refIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.refid.toString().includes(refIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (seriesFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.series.toLowerCase().includes(seriesFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (ltqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltq.toString().includes(ltqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ltpFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltp.toString().includes(ltpFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (statusFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.status.toString().includes(statusFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lastActivityReferenceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.lastactivityref.toString().includes(lastActivityReferenceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.l.toString().includes(lFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (accNoFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.accno.toLowerCase().includes(accNoFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }

    }
    // ********* ErrCode Filter ***********

    if (e.target.name === "errcode") {
      setErrCodeFilter(e.target.value)
      var searchData = marketOpenData.filter((item) => {
        if (
          item.errcode.toString().includes(e.target.value.toString())
        ) {
          return item;
        }
      });

      if (tokenFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.token.includes(tokenFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (symbolFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.symbol.toLowerCase().includes(symbolFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (sFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.s.toLowerCase().includes(sFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (requestTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.requesttime.includes(requestTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (localTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.localtime.includes(localTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (responseTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.responsetime.includes(responseTimeFilter.toString())

          ) {
            return item;
          }
        });
      }

      if (resLocFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.ertd.toString().includes(resLocFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (locReqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.locreq.toString().includes(locReqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (reqResFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.reqres.toString().includes(reqResFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (exIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.exid.toString().includes(exIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (priceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.price.toString().includes(priceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (qtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.qty.toString().includes(qtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (remQtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.remqty.toString().includes(remQtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (otFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ot.toLowerCase().includes(otFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (mFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.m.toLowerCase().includes(mFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }

      if (ctcIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ctclid.toString().includes(ctcIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (refIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.refid.toString().includes(refIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (seriesFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.series.toLowerCase().includes(seriesFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (ltqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltq.toString().includes(ltqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ltpFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltp.toString().includes(ltpFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (statusFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.status.toString().includes(statusFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lastActivityReferenceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.lastactivityref.toString().includes(lastActivityReferenceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.l.toString().includes(lFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (accNoFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.accno.toLowerCase().includes(accNoFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }

    }
    // ********* CtclId Filter ***********

    if (e.target.name === "ctclid") {
      setCtclIdFilter(e.target.value)
      var searchData = marketOpenData.filter((item) => {
        if (
          item.ctclid.toString().includes(e.target.value.toString())
        ) {
          return item;
        }
      });

      if (tokenFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.token.includes(tokenFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (symbolFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.symbol.toLowerCase().includes(symbolFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (sFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.s.toLowerCase().includes(sFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (requestTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.requesttime.includes(requestTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (localTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.localtime.includes(localTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (responseTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.responsetime.includes(responseTimeFilter.toString())

          ) {
            return item;
          }
        });
      }

      if (resLocFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.ertd.toString().includes(resLocFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (locReqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.locreq.toString().includes(locReqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (reqResFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.reqres.toString().includes(reqResFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (exIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.exid.toString().includes(exIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (priceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.price.toString().includes(priceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (qtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.qty.toString().includes(qtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (remQtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.remqty.toString().includes(remQtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (otFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ot.toLowerCase().includes(otFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (mFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.m.toLowerCase().includes(mFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (errCodeFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.errcode.toString().includes(errCodeFilter.toString())
          ) {
            return item;
          }
        });
      }

      if (refIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.refid.toString().includes(refIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (seriesFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.series.toLowerCase().includes(seriesFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (ltqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltq.toString().includes(ltqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ltpFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltp.toString().includes(ltpFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (statusFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.status.toString().includes(statusFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lastActivityReferenceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.lastactivityref.toString().includes(lastActivityReferenceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.l.toString().includes(lFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (accNoFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.accno.toLowerCase().includes(accNoFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }

    }
    // ********* RefId Filter ***********

    if (e.target.name === "refid") {
      setRefIdFilter(e.target.value)
      var searchData = marketOpenData.filter((item) => {
        if (
          item.refid.toString().includes(e.target.value.toString())
        ) {
          return item;
        }
      });

      if (tokenFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.token.includes(tokenFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (symbolFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.symbol.toLowerCase().includes(symbolFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (sFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.s.toLowerCase().includes(sFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (requestTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.requesttime.includes(requestTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (localTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.localtime.includes(localTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (responseTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.responsetime.includes(responseTimeFilter.toString())

          ) {
            return item;
          }
        });
      }

      if (resLocFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.ertd.toString().includes(resLocFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (locReqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.locreq.toString().includes(locReqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (reqResFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.reqres.toString().includes(reqResFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (exIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.exid.toString().includes(exIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (priceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.price.toString().includes(priceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (qtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.qty.toString().includes(qtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (remQtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.remqty.toString().includes(remQtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (otFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ot.toLowerCase().includes(otFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (mFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.m.toLowerCase().includes(mFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (errCodeFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.errcode.toString().includes(errCodeFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ctcIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ctclid.toString().includes(ctcIdFilter.toString())
          ) {
            return item;
          }
        });
      }

      if (seriesFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.series.toLowerCase().includes(seriesFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (ltqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltq.toString().includes(ltqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ltpFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltp.toString().includes(ltpFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (statusFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.status.toString().includes(statusFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lastActivityReferenceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.lastactivityref.toString().includes(lastActivityReferenceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.l.toString().includes(lFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (accNoFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.accno.toLowerCase().includes(accNoFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }

    }
    // ********* Series Filter ***********

    if (e.target.name === "series") {
      setSeriesFilter(e.target.value)
      var searchData = marketOpenData.filter((item) => {
        if (
          item.series.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          return item;
        }
      });

      if (tokenFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.token.includes(tokenFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (symbolFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.symbol.toLowerCase().includes(symbolFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (sFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.s.toLowerCase().includes(sFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (requestTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.requesttime.includes(requestTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (localTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.localtime.includes(localTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (responseTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.responsetime.includes(responseTimeFilter.toString())

          ) {
            return item;
          }
        });
      }

      if (resLocFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.ertd.toString().includes(resLocFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (locReqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.locreq.toString().includes(locReqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (reqResFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.reqres.toString().includes(reqResFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (exIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.exid.toString().includes(exIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (priceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.price.toString().includes(priceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (qtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.qty.toString().includes(qtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (remQtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.remqty.toString().includes(remQtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (otFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ot.toLowerCase().includes(otFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (mFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.m.toLowerCase().includes(mFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (errCodeFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.errcode.toString().includes(errCodeFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ctcIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ctclid.toString().includes(ctcIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (refIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.refid.toString().includes(refIdFilter.toString())
          ) {
            return item;
          }
        });
      }

      if (ltqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltq.toString().includes(ltqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ltpFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltp.toString().includes(ltpFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (statusFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.status.toString().includes(statusFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lastActivityReferenceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.lastactivityref.toString().includes(lastActivityReferenceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.l.toString().includes(lFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (accNoFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.accno.toLowerCase().includes(accNoFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }

    }
    // ********* LTQ Filter ***********

    if (e.target.name === "ltq") {
      setLTQFilter(e.target.value)
      var searchData = marketOpenData.filter((item) => {
        if (
          item.ltq.toString().includes(e.target.value.toString())
        ) {
          return item;
        }
      });

      if (tokenFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.token.includes(tokenFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (symbolFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.symbol.toLowerCase().includes(symbolFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (sFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.s.toLowerCase().includes(sFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (requestTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.requesttime.includes(requestTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (localTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.localtime.includes(localTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (responseTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.responsetime.includes(responseTimeFilter.toString())

          ) {
            return item;
          }
        });
      }

      if (resLocFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.ertd.toString().includes(resLocFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (locReqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.locreq.toString().includes(locReqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (reqResFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.reqres.toString().includes(reqResFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (exIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.exid.toString().includes(exIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (priceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.price.toString().includes(priceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (qtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.qty.toString().includes(qtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (remQtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.remqty.toString().includes(remQtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (otFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ot.toLowerCase().includes(otFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (mFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.m.toLowerCase().includes(mFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (errCodeFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.errcode.toString().includes(errCodeFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ctcIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ctclid.toString().includes(ctcIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (refIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.refid.toString().includes(refIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (seriesFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.series.toLowerCase().includes(seriesFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }

      if (ltpFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltp.toString().includes(ltpFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (statusFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.status.toString().includes(statusFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lastActivityReferenceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.lastactivityref.toString().includes(lastActivityReferenceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.l.toString().includes(lFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (accNoFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.accno.toLowerCase().includes(accNoFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }

    }
    // ********* LTP Filter ***********

    if (e.target.name === "ltp") {
      setLTPFilter(e.target.value)
      var searchData = marketOpenData.filter((item) => {
        if (
          item.ltp.toString().includes(e.target.value.toString())
        ) {
          return item;
        }
      });

      if (tokenFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.token.includes(tokenFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (symbolFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.symbol.toLowerCase().includes(symbolFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (sFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.s.toLowerCase().includes(sFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (requestTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.requesttime.includes(requestTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (localTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.localtime.includes(localTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (responseTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.responsetime.includes(responseTimeFilter.toString())

          ) {
            return item;
          }
        });
      }

      if (resLocFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.ertd.toString().includes(resLocFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (locReqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.locreq.toString().includes(locReqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (reqResFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.reqres.toString().includes(reqResFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (exIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.exid.toString().includes(exIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (priceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.price.toString().includes(priceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (qtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.qty.toString().includes(qtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (remQtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.remqty.toString().includes(remQtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (otFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ot.toLowerCase().includes(otFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (mFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.m.toLowerCase().includes(mFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (errCodeFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.errcode.toString().includes(errCodeFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ctcIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ctclid.toString().includes(ctcIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (refIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.refid.toString().includes(refIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (seriesFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.series.toLowerCase().includes(seriesFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (ltqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltq.toString().includes(ltqFilter.toString())
          ) {
            return item;
          }
        });
      }

      if (statusFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.status.toString().includes(statusFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lastActivityReferenceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.lastactivityref.toString().includes(lastActivityReferenceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.l.toString().includes(lFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (accNoFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.accno.toLowerCase().includes(accNoFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }

    }
    // ********* Status Filter ***********

    if (e.target.name === "status") {
      setStatusFilter(e.target.value)
      var searchData = marketOpenData.filter((item) => {
        if (
          item.status.toString().includes(e.target.value.toString())
        ) {
          return item;
        }
      });

      if (tokenFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.token.includes(tokenFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (symbolFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.symbol.toLowerCase().includes(symbolFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (sFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.s.toLowerCase().includes(sFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (requestTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.requesttime.includes(requestTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (localTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.localtime.includes(localTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (responseTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.responsetime.includes(responseTimeFilter.toString())

          ) {
            return item;
          }
        });
      }

      if (resLocFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.ertd.toString().includes(resLocFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (locReqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.locreq.toString().includes(locReqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (reqResFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.reqres.toString().includes(reqResFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (exIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.exid.toString().includes(exIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (priceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.price.toString().includes(priceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (qtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.qty.toString().includes(qtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (remQtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.remqty.toString().includes(remQtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (otFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ot.toLowerCase().includes(otFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (mFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.m.toLowerCase().includes(mFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (errCodeFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.errcode.toString().includes(errCodeFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ctcIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ctclid.toString().includes(ctcIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (refIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.refid.toString().includes(refIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (seriesFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.series.toLowerCase().includes(seriesFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (ltqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltq.toString().includes(ltqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ltpFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltp.toString().includes(ltpFilter.toString())
          ) {
            return item;
          }
        });
      }

      if (lastActivityReferenceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.lastactivityref.toString().includes(lastActivityReferenceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.l.toString().includes(lFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (accNoFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.accno.toLowerCase().includes(accNoFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }

    }
    // ********* LastActivityReference Filter ***********

    if (e.target.name === "lastActivityReference") {
      setLastActivityReferenceFilter(e.target.value)
      var searchData = marketOpenData.filter((item) => {
        if (
          // console.log("LastActivityReference",item)
          item.lastactivityref.toString().includes(e.target.value.toString())
        ) {
          return item;
        }
      });

      if (tokenFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.token.includes(tokenFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (symbolFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.symbol.toLowerCase().includes(symbolFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (sFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.s.toLowerCase().includes(sFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (requestTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.requesttime.includes(requestTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (localTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.localtime.includes(localTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (responseTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.responsetime.includes(responseTimeFilter.toString())

          ) {
            return item;
          }
        });
      }

      if (resLocFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.ertd.toString().includes(resLocFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (locReqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.locreq.toString().includes(locReqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (reqResFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.reqres.toString().includes(reqResFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (exIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.exid.toString().includes(exIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (priceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.price.toString().includes(priceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (qtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.qty.toString().includes(qtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (remQtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.remqty.toString().includes(remQtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (otFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ot.toLowerCase().includes(otFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (mFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.m.toLowerCase().includes(mFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (errCodeFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.errcode.toString().includes(errCodeFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ctcIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ctclid.toString().includes(ctcIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (refIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.refid.toString().includes(refIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (seriesFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.series.toLowerCase().includes(seriesFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (ltqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltq.toString().includes(ltqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ltpFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltp.toString().includes(ltpFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (statusFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.status.toString().includes(statusFilter.toString())
          ) {
            return item;
          }
        });
      }

      if (lFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.l.toString().includes(lFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (accNoFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.accno.toLowerCase().includes(accNoFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }

    }
    // ********* L Filter ***********

    if (e.target.name === "l") {
      setLFilter(e.target.value)
      var searchData = marketOpenData.filter((item) => {
        if (
          // console.log("LastActivityReference",item)
          item.l.toString().includes(e.target.value.toString())
        ) {
          return item;
        }
      });


      if (tokenFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.token.includes(tokenFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (symbolFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.symbol.toLowerCase().includes(symbolFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (sFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.s.toLowerCase().includes(sFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (requestTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.requesttime.includes(requestTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (localTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.localtime.includes(localTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (responseTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.responsetime.includes(responseTimeFilter.toString())

          ) {
            return item;
          }
        });
      }

      if (resLocFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.ertd.toString().includes(resLocFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (locReqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.locreq.toString().includes(locReqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (reqResFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.reqres.toString().includes(reqResFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (exIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.exid.toString().includes(exIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (priceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.price.toString().includes(priceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (qtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.qty.toString().includes(qtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (remQtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.remqty.toString().includes(remQtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (otFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ot.toLowerCase().includes(otFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (mFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.m.toLowerCase().includes(mFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (errCodeFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.errcode.toString().includes(errCodeFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ctcIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ctclid.toString().includes(ctcIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (refIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.refid.toString().includes(refIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (seriesFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.series.toLowerCase().includes(seriesFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (ltqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltq.toString().includes(ltqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ltpFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltp.toString().includes(ltpFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (statusFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.status.toString().includes(statusFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lastActivityReferenceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.lastactivityref.toString().includes(lastActivityReferenceFilter.toString())
          ) {
            return item;
          }
        });
      }

      if (accNoFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.accno.toLowerCase().includes(accNoFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }

    }
    // ********* AccNo Filter ***********

    if (e.target.name === "accNo") {
      setAccNoFilter(e.target.value)
      var searchData = marketOpenData.filter((item) => {
        if (
          item.accno.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          return item;
        }
      });

      if (tokenFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.token.includes(tokenFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (symbolFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.symbol.toLowerCase().includes(symbolFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (sFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.s.toLowerCase().includes(sFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (requestTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.requesttime.includes(requestTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (localTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.localtime.includes(localTimeFilter.toString())

          ) {
            return item;
          }
        });
      }
      if (responseTimeFilter !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.responsetime.includes(responseTimeFilter.toString())

          ) {
            return item;
          }
        });
      }

      if (resLocFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.ertd.toString().includes(resLocFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (locReqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.locreq.toString().includes(locReqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (reqResFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("ertd",item)
            item.reqres.toString().includes(reqResFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (exIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.exid.toString().includes(exIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (priceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.price.toString().includes(priceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (qtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.qty.toString().includes(qtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (remQtyFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.remqty.toString().includes(remQtyFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (otFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ot.toLowerCase().includes(otFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (mFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.m.toLowerCase().includes(mFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (errCodeFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.errcode.toString().includes(errCodeFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ctcIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ctclid.toString().includes(ctcIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (refIdFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.refid.toString().includes(refIdFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (seriesFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.series.toLowerCase().includes(seriesFilter.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (ltqFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltq.toString().includes(ltqFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (ltpFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.ltp.toString().includes(ltpFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (statusFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            item.status.toString().includes(statusFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lastActivityReferenceFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.lastactivityref.toString().includes(lastActivityReferenceFilter.toString())
          ) {
            return item;
          }
        });
      }
      if (lFilter !== "") {
        var searchData = searchData.filter((item) => {
          if (
            // console.log("LastActivityReference",item)
            item.l.toString().includes(lFilter.toString())
          ) {
            return item;
          }
        });
      }


    }

    // result = initial data
    //check non-empty state
    setMarketOpenDataValue(searchData)
  }



  // const  FilterRecords =  async(e) => {
  //   // ********* Token Filter ***********

  //   if (e.target.name === "token") {
  //   await  setTokenFilter(e.target.value)
  //   }
  //   // ********* Symbol Filter ***********

  //   if (e.target.name === "symbol") {
  //   await  setSymbolFilter(e.target.value)

  //   }
  //   // ********* S Filter ***********

  //   if (e.target.name === "s") {
  //   await  setSFilter(e.target.value)

  //   }

  //    // ********* executedtime Filter ***********
  //   if (e.target.name === "executedtime") {
  //     setlocalTimeFilter(e.target.value)

  // }
  //   // ********* Responsetime Filter ***********

  //   if (e.target.name === "responsetime") {
  //     setResponseTimeFilter(e.target.value)

  //   }
  //   // ********* ERTD Filter ***********

  //   if (e.target.name === "ertd") {
  //     setresLocFilter(e.target.value)

  //   }
  //   // ********* ExID Filter ***********

  //   if (e.target.name === "exid") {
  //     setExIdFilter(e.target.value)

  //   }
  //   // ********* Price Filter ***********

  //   if (e.target.name === "price") {
  //     setPriceFilter(e.target.value)

  //   }
  //   // ********* Qty Filter ***********

  //   if (e.target.name === "qty") {
  //     setQtyFilter(e.target.value)

  //   }
  //   // ********* RemQTY Filter ***********

  //   if (e.target.name === "remqty") {
  //     setRemQTYFilter(e.target.value)

  //   }
  //   // ********* OT Filter ***********

  //   if (e.target.name === "ot") {
  //     setOTFilter(e.target.value)

  //   }
  //   // ********* M Filter ***********

  //   if (e.target.name === "m") {
  //     setMFilter(e.target.value)

  //   }
  //   // ********* ErrCode Filter ***********

  //   if (e.target.name === "errcode") {
  //     setErrCodeFilter(e.target.value)

  //   }
  //   // ********* CtclId Filter ***********

  //   if (e.target.name === "ctclid") {
  //     setCtclIdFilter(e.target.value)

  //   }
  //   // ********* RefId Filter ***********

  //   if (e.target.name === "refid") {
  //     setRefIdFilter(e.target.value)

  //   }
  //   // ********* Series Filter ***********

  //   if (e.target.name === "series") {
  //     setSeriesFilter(e.target.value)

  //   }
  //   // ********* LTQ Filter ***********

  //   if (e.target.name === "ltq") {
  //     setLTQFilter(e.target.value)

  //   }
  //   // ********* LTP Filter ***********

  //   if (e.target.name === "ltp") {
  //     setLTPFilter(e.target.value)

  //   }
  //   // ********* Status Filter ***********

  //   if (e.target.name === "status") {
  //     setStatusFilter(e.target.value)

  //   }
  //   // ********* LastActivityReference Filter ***********

  //   if (e.target.name === "lastActivityReference") {
  //     setLastActivityReferenceFilter(e.target.value)

  //   }
  //   // ********* LastActivityReference Filter ***********

  //   if (e.target.name === "l") {
  //     setLFilter(e.target.value)

  //   }
  //   // ********* AccNo Filter ***********

  //   if (e.target.name === "accNo") {
  //     setAccNoFilter(e.target.value)

  //   }

  //   var Result = marketOpenData

  //   if(await tokenFilter !== ""){
  //     Result = Result.filter((item) => {
  //       if (
  //         item.token.includes(tokenFilter.toString())
  //       ) {
  //         return item;
  //       }
  //     });
  //   }
  //   if(await symbolFilter !== ""){
  //     // console.log("EventsymbolFilter",e.target.value)
  //     // console.log("Symbol",symbolFilter)

  //     var Result = Result.filter((item) => {
  //       if (
  //         item.symbol.toLowerCase().includes(symbolFilter.toLowerCase())
  //       ) {
  //         return item;
  //       }
  //     });
  //   }
  //   if(await sFilter !== ""){
  //     // console.log("EventsFilter",e.target.value)
  //     // console.log("sFilter",sFilter)
  //     var Result = Result.filter((item) => {
  //       if (
  //         item.s.toLowerCase().includes(sFilter.toLowerCase())
  //       ) {
  //         return item;
  //       }
  //     });
  //   }
  //   if(localTimeFilter !== ""){
  //     var Result = Result.filter((item) => {
  //       if (
  //         item.executedtime.includes(localTimeFilter.toString())
  //       ) {
  //         return item;
  //       }
  //     });
  //   }
  //   if(responseTimeFilter !== ""){
  //     var Result = Result.filter((item) => {
  //       if (
  //         item.responsetime.includes(responseTimeFilter.toString())
  //       ) {
  //         return item;
  //       }
  //     });
  //   }
  //   if(resLocFilter !== ""){
  //     var Result = Result.filter((item) => {
  //       if (
  //         // console.log("ertd",item)
  //         item.ertd.toString().includes(resLocFilter.toString())
  //       ) {
  //         return item;
  //       }
  //     });
  //   }
  //   if(exIdFilter !== ""){
  //     var Result = Result.filter((item) => {
  //       if (
  //         item.exid.toString().includes(exIdFilter.toString())
  //       ) {
  //         return item;
  //       }
  //     });
  //   }
  //   if(priceFilter !== ""){
  //     var Result = Result.filter((item) => {
  //       if (
  //         item.price.toString().includes(priceFilter.toString())
  //       ) {
  //         return item;
  //       }
  //     });
  //   }
  //   if(qtyFilter !== ""){
  //     var Result = Result.filter((item) => {
  //       if (
  //         item.qty.toString().includes(qtyFilter.toString())
  //       ) {
  //         return item;
  //       }
  //     });
  //   }
  //   if(remQtyFilter !== ""){
  //     var Result = Result.filter((item) => {
  //       if (
  //         item.remqty.toString().includes(remQtyFilter.toString())
  //       ) {
  //         return item;
  //       }
  //     });
  //   }
  //   if(otFilter !== ""){
  //     var Result = Result.filter((item) => {
  //       if (
  //         item.ot.toLowerCase().includes(otFilter.toLowerCase())
  //       ) {
  //         return item;
  //       }
  //     });
  //   }
  //   if(mFilter !== ""){
  //     var Result = Result.filter((item) => {
  //       if (
  //         item.m.toLowerCase().includes(mFilter.toLowerCase())
  //       ) {
  //         return item;
  //       }
  //     });
  //   }
  //   if(errCodeFilter !== ""){
  //     var Result = Result.filter((item) => {
  //       if (
  //         item.errcode.toString().includes(errCodeFilter.toString())
  //       ) {
  //         return item;
  //       }
  //     });
  //   }
  //   if(ctcIdFilter !== ""){
  //     var Result = Result.filter((item) => {
  //       if (
  //         item.ctclid.toString().includes(ctcIdFilter.toString())
  //       ) {
  //         return item;
  //       }
  //     });
  //   }

  //   if(refIdFilter !== ""){
  //     var Result = Result.filter((item) => {
  //       if (
  //         item.refid.toString().includes(refIdFilter.toString())
  //       ) {
  //         return item;
  //       }
  //     });
  //   }
  //   if(seriesFilter !== ""){
  //     var Result = Result.filter((item) => {
  //       if (
  //         item.series.toLowerCase().includes(seriesFilter.toLowerCase())
  //       ) {
  //         return item;
  //       }
  //     });
  //   }
  //   if(ltqFilter !== ""){
  //     var Result = Result.filter((item) => {
  //       if (
  //         item.ltq.toString().includes(ltqFilter.toString())
  //       ) {
  //         return item;
  //       }
  //     });
  //   }
  //   if(ltpFilter !== ""){
  //     var Result = Result.filter((item) => {
  //       if (
  //         item.ltp.toString().includes(ltpFilter.toString())
  //       ) {
  //         return item;
  //       }
  //     });
  //   }
  //   if(statusFilter !== ""){
  //     var Result = Result.filter((item) => {
  //       if (
  //         item.status.toString().includes(statusFilter.toString())
  //       ) {
  //         return item;
  //       }
  //     });
  //   }
  //   if(lastActivityReferenceFilter !== ""){
  //     var Result = Result.filter((item) => {
  //       if (
  //         // console.log("LastActivityReference",item)
  //         item.lastactivityref.toString().includes(lastActivityReferenceFilter.toString())
  //       ) {
  //         return item;
  //       }
  //     });
  //   }
  //   if(lFilter !== ""){
  //     var Result = Result.filter((item) => {
  //       if (
  //         // console.log("LastActivityReference",item)
  //         item.l.toString().includes(lFilter.toString())
  //       ) {
  //         return item;
  //       }
  //     });
  //   }
  //   if(accNoFilter !== ""){
  //     var Result = Result.filter((item) => {
  //       if (
  //         item.accno.toLowerCase().includes(accNoFilter.toLowerCase())
  //       ) {
  //         return item;
  //       }
  //     });
  //   }

  //       // result = initial data
  //       //check non-empty state
  //   await  setMarketOpenDataValue(Result)

  // }

  //     const  FilterRecords =  (e) => {
  //     // ********* Token Filter ***********

  //     if (e.target.name === "token") {
  //       setTokenFilter(e.target.value)

  // if(result == ""){
  //   searchData = marketOpenFilter.filter((item) => {
  //    if (
  //      item.token.includes(e.target.value.toString())
  //    ) {
  //      return item;
  //    }
  //  });
  // setResult(searchData);
  // }
  // else{
  //   searchData = result.filter((item) => {
  //     if (
  //       item.token.includes(e.target.value.toString())
  //     ) {
  //       return item;
  //     }
  //   });
  //  setResult(searchData);
  // }
  //     }
  //     // ********* Symbol Filter ***********

  //     if (e.target.name === "symbol") {
  //       setSymbolFilter(e.target.value)
  // if(result === ""){

  //   var searchData = marketOpenData.filter((item) => {
  //     if (
  //       item.symbol.toLowerCase().includes(e.target.value.toLowerCase())
  //     ) {
  //       return item;
  //     }
  //   });
  //  setResult(searchData);

  // }else{
  //   var searchData = result.filter((item) => {
  //     if (
  //       item.symbol.toLowerCase().includes(e.target.value.toLowerCase())
  //     ) {
  //       return item;
  //     }
  //   });
  //  setResult(searchData);
  // }

  //     }
  //     // ********* S Filter ***********

  //     if (e.target.name === "s") {
  //       setSFilter(e.target.value)

  // if(result === ""){

  //   var searchData = marketOpenData.filter((item) => {
  //     if (
  //       item.s.toLowerCase().includes(e.target.value.toLowerCase())
  //     ) {
  //       return item;
  //     }
  //   });
  //  setResult(searchData);

  // }else{
  //   var searchData = result.filter((item) => {
  //     if (
  //       item.s.toLowerCase().includes(e.target.value.toLowerCase())
  //     ) {
  //       return item;
  //     }
  //   });
  //  setResult(searchData);
  // }

  //     }
  //     // ********* Executedtime Filter ***********
  //     if (e.target.name === "executedtime") {
  //       setlocalTimeFilter(e.target.value)
  //       var searchData = marketOpenData.filter((item) => {
  //         if (
  //           item.executedtime.includes(e.target.value.toString())
  //         ) {
  //           return item;
  //         }
  //       });

  //     }
  //     // ********* Responsetime Filter ***********

  //     if (e.target.name === "responsetime") {
  //       setResponseTimeFilter(e.target.value)
  //       var searchData = marketOpenData.filter((item) => {
  //         if (
  //           item.responsetime.includes(e.target.value.toString())
  //         ) {
  //           return item;
  //         }
  //       });

  //     }
  //     // ********* ERTD Filter ***********

  //     if (e.target.name === "ertd") {
  //       setresLocFilter(e.target.value)
  //       var searchData = marketOpenData.filter((item) => {
  //         if (
  //           // console.log("ertd",item)
  //           item.ertd.toString().includes(e.target.value.toString())
  //         ) {
  //           return item;
  //         }
  //       });
  //     }
  //     // ********* ExID Filter ***********

  //     if (e.target.name === "exid") {
  //       setExIdFilter(e.target.value)
  //       var searchData = marketOpenData.filter((item) => {
  //         if (
  //           item.exid.toString().includes(e.target.value.toString())
  //         ) {
  //           return item;
  //         }
  //       });
  //     }
  //     // ********* Price Filter ***********

  //     if (e.target.name === "price") {
  //       setPriceFilter(e.target.value)
  //       var searchData = marketOpenData.filter((item) => {
  //         if (
  //           item.price.toString().includes(e.target.value.toString())
  //         ) {
  //           return item;
  //         }
  //       });
  //     }
  //     // ********* Qty Filter ***********

  //     if (e.target.name === "qty") {
  //       setQtyFilter(e.target.value)
  //       var searchData = marketOpenData.filter((item) => {
  //         if (
  //           item.qty.toString().includes(e.target.value.toString())
  //         ) {
  //           return item;
  //         }
  //       });
  //     }
  //     // ********* RemQTY Filter ***********

  //     if (e.target.name === "remqty") {
  //       setRemQTYFilter(e.target.value)
  //       var searchData = marketOpenData.filter((item) => {
  //         if (
  //           item.remqty.toString().includes(e.target.value.toString())
  //         ) {
  //           return item;
  //         }
  //       });
  //     }
  //     // ********* OT Filter ***********

  //     if (e.target.name === "ot") {
  //       setOTFilter(e.target.value)
  //       var searchData = marketOpenData.filter((item) => {
  //         if (
  //           item.ot.toLowerCase().includes(e.target.value.toLowerCase())
  //         ) {
  //           return item;
  //         }
  //       });
  //     }
  //     // ********* M Filter ***********

  //     if (e.target.name === "m") {
  //       setMFilter(e.target.value)
  //       var searchData = marketOpenData.filter((item) => {
  //         if (
  //           item.m.toLowerCase().includes(e.target.value.toLowerCase())
  //         ) {
  //           return item;
  //         }
  //       });
  //     }
  //     // ********* ErrCode Filter ***********

  //     if (e.target.name === "errcode") {
  //       setErrCodeFilter(e.target.value)
  //       var searchData = marketOpenData.filter((item) => {
  //         if (
  //           item.errcode.toString().includes(e.target.value.toString())
  //         ) {
  //           return item;
  //         }
  //       });
  //     }
  //     // ********* CtclId Filter ***********

  //     if (e.target.name === "ctclid") {
  //       setCtclIdFilter(e.target.value)
  //       var searchData = marketOpenData.filter((item) => {
  //         if (
  //           item.ctclid.toString().includes(e.target.value.toString())
  //         ) {
  //           return item;
  //         }
  //       });
  //     }
  //     // ********* RefId Filter ***********

  //     if (e.target.name === "refid") {
  //       setRefIdFilter(e.target.value)
  //       var searchData = marketOpenData.filter((item) => {
  //         if (
  //           item.refid.toString().includes(e.target.value.toString())
  //         ) {
  //           return item;
  //         }
  //       });
  //     }
  //     // ********* Series Filter ***********

  //     if (e.target.name === "series") {
  //       setSeriesFilter(e.target.value)
  //       var searchData = marketOpenData.filter((item) => {
  //         if (
  //           item.series.toLowerCase().includes(e.target.value.toLowerCase())
  //         ) {
  //           return item;
  //         }
  //       });
  //     }
  //     // ********* LTQ Filter ***********

  //     if (e.target.name === "ltq") {
  //       setLTQFilter(e.target.value)
  //       var searchData = marketOpenData.filter((item) => {
  //         if (
  //           item.ltq.toString().includes(e.target.value.toString())
  //         ) {
  //           return item;
  //         }
  //       });
  //     }
  //     // ********* LTP Filter ***********

  //     if (e.target.name === "ltp") {
  //       setLTPFilter(e.target.value)
  //       var searchData = marketOpenData.filter((item) => {
  //         if (
  //           item.ltp.toString().includes(e.target.value.toString())
  //         ) {
  //           return item;
  //         }
  //       });
  //     }
  //     // ********* Status Filter ***********

  //     if (e.target.name === "status") {
  //       setStatusFilter(e.target.value)
  //       var searchData = marketOpenData.filter((item) => {
  //         if (
  //           item.status.toString().includes(e.target.value.toString())
  //         ) {
  //           return item;
  //         }
  //       });
  //     }
  //     // ********* LastActivityReference Filter ***********

  //     if (e.target.name === "lastActivityReference") {
  //       setLastActivityReferenceFilter(e.target.value)
  //       var searchData = marketOpenData.filter((item) => {
  //         if (
  //           // console.log("LastActivityReference",item)
  //           item.lastactivityref.toString().includes(e.target.value.toString())
  //         ) {
  //           return item;
  //         }
  //       });
  //     }
  //     // ********* LastActivityReference Filter ***********

  //     if (e.target.name === "l") {
  //       setLFilter(e.target.value)
  //       var searchData = marketOpenData.filter((item) => {
  //         if (
  //           // console.log("LastActivityReference",item)
  //           item.l.toString().includes(e.target.value.toString())
  //         ) {
  //           return item;
  //         }
  //       });
  //     }
  //     // ********* AccNo Filter ***********

  //     if (e.target.name === "accNo") {
  //       setAccNoFilter(e.target.value)
  //       var searchData = marketOpenData.filter((item) => {
  //         if (
  //           item.accno.toLowerCase().includes(e.target.value.toLowerCase())
  //         ) {
  //           return item;
  //         }
  //       });
  //     }

  //     // result = initial data
  //     //check non-empty state
  //   setMarketOpenDataValue(result)
  //   }




  const getSelectedFilter = () => {
    // console.log("Empty", selectedValue)
    switch (selectedValue) {
      case 'Token':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              Token
            </label>
            <input
              type="text"
              placeholder="Token"
              name="token"
              className="form-control"

              onChange={(e) => FilterRecords(e)}
              value={tokenFilter}
            />
          </div>
        </>)
      case 'Symbol':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              Symbol
            </label>
            <select
              className="form-control"
              onChange={(e) => FilterRecords(e)}
              value={symbolFilter}
              name="symbol"
            >
              <option value="">All</option>
              {Object.keys(getSymboles("Symbol")).map((sm, i) => (

                <option value={sm}>{sm}</option>

              ))}
            </select>
          </div>

        </>)
      case 'S':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              S
            </label>
            <select
              className="form-control"
              onChange={(e) => {
                FilterRecords(e);
              }}
              value={sFilter}
              name="s"
            >
              <option value="">All</option>
              {Object.keys(getSymboles("S")).map((sm, i) => (

                <option value={sm}>{sm}</option>

              ))}
            </select>
          </div>
        </>)
      case 'RequestTime':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              RequestTime
            </label>
            <input
              type="text"
              placeholder="RequestTime"
              name="requesttime"
              className="form-control"

              onChange={(e) => FilterRecords(e)}
              value={requestTimeFilter}
            />
          </div>
        </>)
      case 'LocalTime':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              LocalTime
            </label>
            <input
              type="text"
              placeholder="LocalTime"
              name="localtime"
              className="form-control"

              onChange={(e) => FilterRecords(e)}
              value={localTimeFilter}
            />
          </div>
        </>)
      case 'ResponseTime':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              ResponseTime
            </label>
            <input
              type="text"
              placeholder="ResponseTime"
              name="responsetime"
              className="form-control"

              onChange={(e) => FilterRecords(e)}
              value={responseTimeFilter}
            />
          </div>
        </>)
      case 'ResLoc':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              ResLoc
            </label>
            <input
              type="text"
              placeholder="ResLoc"
              name="resloc"
              className="form-control"

              onChange={(e) => FilterRecords(e)}
              value={resLocFilter}
            />
          </div>
        </>)
      case 'LocReq':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              LocReq
            </label>
            <input
              type="text"
              placeholder="LocReq"
              name="locreq"
              className="form-control"

              onChange={(e) => FilterRecords(e)}
              value={resLocFilter}
            />
          </div>
        </>)
      case 'ReqRes':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              ReqRes
            </label>
            <input
              type="text"
              placeholder="ReqRes"
              name="reqres"
              className="form-control"

              onChange={(e) => FilterRecords(e)}
              value={resLocFilter}
            />
          </div>
        </>)
      case 'ExID':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              ExID
            </label>
            <input
              type="text"
              placeholder="ExID"
              name="exid"
              className="form-control"

              onChange={(e) => FilterRecords(e)}
              value={exIdFilter}
            />
          </div>
        </>)
      case 'Price':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              Price
            </label>
            <input
              type="text"
              placeholder="Price"
              name="price"
              className="form-control"

              onChange={(e) => FilterRecords(e)}
              value={priceFilter}
            />
          </div>
        </>)
      case 'Qty':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              Qty
            </label>
            <input
              type="text"
              placeholder="Qty"
              name="qty"
              className="form-control"

              onChange={(e) => FilterRecords(e)}
              value={qtyFilter}
            />
          </div>
        </>)
      case 'RemQTY':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              RemQTY
            </label>
            <input
              type="text"
              placeholder="RemQTY"
              name="remqty"
              className="form-control"

              onChange={(e) => FilterRecords(e)}
              value={remQtyFilter}
            />
          </div>
        </>)
      case 'OT':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              OT
            </label>
            <select
              className="form-control"
              onChange={(e) => {
                FilterRecords(e);
              }}
              value={otFilter}
              name="ot"
            >
              <option value="">All</option>
              {Object.keys(getSymboles("OT")).map((sm, i) => (

                <option value={sm}>{sm}</option>

              ))}
            </select>
          </div>

        </>)
      case 'M':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              M
            </label>
            <select
              className="form-control"
              onChange={(e) => {
                FilterRecords(e);
              }}
              value={mFilter}
              name="m"
            >
              <option value="">All</option>
              {Object.keys(getSymboles("M")).map((sm, i) => (

                <option value={sm}>{sm}</option>

              ))}
            </select>
          </div>

        </>)
      case 'ErrCode':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              ErrCode
            </label>
            <input
              type="text"
              placeholder="ErrCode"
              name="errcode"
              className="form-control"

              onChange={(e) => FilterRecords(e)}
              value={errCodeFilter}
            />
          </div>
        </>)
      case 'CtclId':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              CtclId
            </label>
            <input
              type="text"
              placeholder="CtclId"
              name="ctclid"
              className="form-control"

              onChange={(e) => FilterRecords(e)}
              value={ctcIdFilter}
            />
          </div>
        </>)
      case 'RefId':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              RefId
            </label>
            <input
              type="text"
              placeholder="RefId"
              name="refid"
              className="form-control"

              onChange={(e) => FilterRecords(e)}
              value={refIdFilter}
            />
          </div>
        </>)
      case 'Series':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              Series
            </label>
            <select
              className="form-control"
              onChange={(e) => {
                FilterRecords(e);
              }}
              value={seriesFilter}
              name="series"
            >
              <option value="">All</option>
              {Object.keys(getSymboles("Series")).map((sm, i) => (

                <option value={sm}>{sm}</option>

              ))}
            </select>
          </div>
        </>)
      case 'LTQ':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              LTQ
            </label>
            <input
              type="text"
              placeholder="LTQ"
              name="ltq"
              className="form-control"

              onChange={(e) => FilterRecords(e)}
              value={ltqFilter}
            />
          </div>
        </>)
      case 'LTP':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              LTP
            </label>
            <input
              type="text"
              placeholder="LTP"
              name="ltp"
              className="form-control"

              onChange={(e) => FilterRecords(e)}
              value={ltpFilter}
            />
          </div>
        </>)
      case 'Status':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              Status
            </label>
            <input
              type="text"
              placeholder="Status"
              name="status"
              className="form-control"

              onChange={(e) => FilterRecords(e)}
              value={statusFilter}
            />
          </div>
        </>)
      case 'LastActivityReference':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              LastActivityReference
            </label>
            <input
              type="text"
              placeholder="LastActivityReference"
              name="lastActivityReference"
              className="form-control"

              onChange={(e) => FilterRecords(e)}
              value={lastActivityReferenceFilter}
            />
          </div>
        </>)
      case 'L':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              L
            </label>
            <input
              type="text"
              placeholder="L"
              name="l"
              className="form-control"

              onChange={(e) => FilterRecords(e)}
              value={lFilter}
            />
          </div>
        </>)
      case 'AccNo':
        return (<>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              AccNo
            </label>
            <select
              className="form-control"
              onChange={(e) => {
                FilterRecords(e.target.value);
              }}
              value={accNoFilter}
              name="accNo"
            >
              <option value="">All</option>
              {Object.keys(getSymboles("AccNo")).map((sm, i) => (

                <option value={sm}>{sm}</option>

              ))}
            </select>
          </div>

        </>)

      default:
        return null


    }
  }


  // *******************Market Details Table********************

  const getMarketDetailTable = () => {
    if (marketOpenData && marketOpenData !== undefined) {

      var MarketDetalarray = []

      var dateFilter = marketOpenData.map((item) => {
        return item.requesttime.split(" ")[0]
      })

      var newArrDate = [];
      dateFilter.forEach((item) => {
        newArrDate[item] = dateFilter.filter((el) => {
          return el === item;
        }).length;
      });
      // console.log("newArrDate",newArrDate) 

      Object.keys(newArrDate).map((date) => {
        // console.log("date", date)

        const DateFiltered = marketOpenData.filter((filter) => {
          if (filter.requesttime.includes(date)) {
            return filter
          }
        })
        // console.log("DateFiltered",DateFiltered)
        const getSymbols = DateFiltered.map((item) => {
          return item.symbol
        })
        var newArrSymbol = [];
        getSymbols.forEach((item) => {
          newArrSymbol[item] = getSymbols.filter((el) => {
            return el === item;
          }).length;
        });
        // console.log("newArrSymbol", Object.keys(newArrSymbol))
        Object.keys(newArrSymbol).map((symbol) => {
          var Stream
          for (var i = 65; i <= 90; i++) {
            if (symbol.charAt(0).charCodeAt(0) <= 67) {
              // console.log("Stram", 1, symbol.charAt(0).charCodeAt(0))
              Stream = 1
              break;
            }
            else if (symbol.charAt(0).charCodeAt(0) > 67 && symbol.charAt(0).charCodeAt(0) <= 73) {
              // console.log("Stream", 2, symbol.charAt(0).charCodeAt(0))
              Stream = 2
              break;
            }
            else if (symbol.charAt(0).charCodeAt(0) > 73 && symbol.charAt(0).charCodeAt(0) <= 80) {
              // console.log("Stream", 3, symbol.charAt(0).charCodeAt(0))
              Stream = 3
              break;
            }
            else if (symbol.charAt(0).charCodeAt(0) > 80 && symbol.charAt(0).charCodeAt(0) <= 90) {
              // console.log("Stream", 4, symbol.charAt(0).charCodeAt(0))
              Stream = 4
              break;
            }
            return Stream
          }



          const symbolsData = DateFiltered.filter((filter) => {
            if (filter.symbol.includes(symbol)) {
              return filter
            }
          })
          // console.log("symbol", symbol)

          const symbolActivity = symbolsData.map((item) => {

            const sumSymbolActivity = parseInt(item.exid.toString().slice(-7))
            return sumSymbolActivity
          })
          const averageSymbolActivity = symbolActivity.reduce((a, b) => a + b, 0) / symbolActivity.length
          // console.log("averageSymbolActivity", Math.round(averageSymbolActivity * 100) / 100)

          const RejectedFilter = symbolsData.filter((filter) => {
            if (filter.errcode.includes("16387")) {
              return filter
            }
          })
        
          const RejectTime = RejectedFilter.length > 0 && RejectedFilter.slice(-1)[0].requesttime
          const LastRejectExid =  RejectedFilter.length > 0 && RejectedFilter.slice(-1)[0].exid

          const ConfirmedFilter = symbolsData.filter((filter) => {
            if (filter.errcode.includes("16387")) {
              return filter
            }
          })
        
          
          const ConfirmTime = ConfirmedFilter.length > 0 && ConfirmedFilter[0].requesttime
          const ConfirmedExid =  ConfirmedFilter.length > 0 && ConfirmedFilter[0].exid




          MarketDetalarray.push({
            date: date,
            symbol: symbol,
            stream: Stream,
            lastRejectTime: RejectTime ? RejectTime.split(" ")[1] : " - ",
            lastRejectExid: LastRejectExid ? LastRejectExid : " - ",
            firsrConfirmTime: ConfirmTime ? ConfirmTime.split(" ")[1] : " - ",
            firsrConfirmExid: ConfirmedExid ? ConfirmedExid : " - ",
            symbolactivity: parseInt(averageSymbolActivity),
            streamactivity: parseInt(averageSymbolActivity)
          })

        })

      })
      var groupedByDate = {};
      for (var key in MarketDetalarray) {

        var date = MarketDetalarray[key].date;
        if (!groupedByDate[date]) {
          groupedByDate[date] = [];
        }
        groupedByDate[date].push(MarketDetalarray[key]);
      }
      // console.log("groupedByDate", groupedByDate)
      var metaArray = []
      Object.keys(groupedByDate).forEach((item) => {
        var groupedByStream = {};
        for (var key in groupedByDate[item]) {

          var stream = groupedByDate[item][key].stream;
          if (!groupedByStream[stream]) {
            groupedByStream[stream] = [];
          }
          groupedByStream[stream].push(groupedByDate[item][key]);
        }
        // console.log("groupedByStream", groupedByStream)
        metaArray.push({ date: item, streamdata: Object.values(groupedByStream) })
      })
      // console.log("metaArray", metaArray)
      setMarketMetaArray(metaArray)
      setMarketDataArrayValues(metaArray)
      setMarketDetailsTable(MarketDetalarray)
      setMarketDetailArray(MarketDetalarray)
    }

  }

  useEffect(() => {
    getMarketDetailTable()
  }, [marketOpenData])


  // ************************* OrderId Match ********************************
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color; 
  }

  const IndexCount = () => {
    return Object.keys(getSymboles("Symbol")).length;

    // console.log("val",val)
  }


  const conditionalFirstTable = [
       {

      when: row => (parseInt(row.exid.toString().slice(-7)) >= nillStart && parseInt(row.exid.toString().slice(-7)) < nillEnd),
      style: {
        backgroundColor: 'rgb(65 65 249 / 48%)',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {

      when: row => (parseInt(row.exid.toString().slice(-7)) >= midStart && parseInt(row.streamactivity) < midEnd),
      style: {
        backgroundColor: 'rgb(65 65 249 / 48%)',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {

      when: row => (parseInt(row.exid.toString().slice(-7)) >= averageStart && parseInt(row.streamactivity) < averageEnd),
      style: {
        backgroundColor: 'rgb(65 65 249 / 65%)',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {

      when: row => (parseInt(row.exid.toString().slice(-7)) >= highStart && parseInt(row.streamactivity) < highEnd),
      style: {
        backgroundColor: 'rgb(65 65 249 / 85%)',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {

      when: row => (parseInt(row.exid.toString().slice(-7)) >= superHighStart),
      style: {
        backgroundColor: 'rgb(65, 65, 249)',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
  
  ]

  const conditionalRowStyles = [

    // {

    //   when: row => (parseInt(row.exid.toString().slice(-7)) >= nillStart && parseInt(row.exid.toString().slice(-7)) < nillEnd),
    //   style: {
    //     backgroundColor: 'rgb(65 65 249 / 48%)',
    //     color: 'white',
    //     '&:hover': {
    //       cursor: 'pointer',
    //     },
    //   },
    // },
    {

      when: row => (parseInt(row.streamactivity) >= midStart && parseInt(row.streamactivity) < midEnd),
      style: {
        backgroundColor: 'rgb(65 65 249 / 48%)',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {

      when: row => (parseInt(row.streamactivity) >= averageStart && parseInt(row.streamactivity) < averageEnd),
      style: {
        backgroundColor: 'rgb(65 65 249 / 65%)',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {

      when: row => (parseInt(row.streamactivity) >= highStart && parseInt(row.streamactivity) < highEnd),
      style: {
        backgroundColor: 'rgb(65 65 249 / 85%)',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {

      when: row => (parseInt(row.streamactivity) >= superHighStart),
      style: {
        backgroundColor: 'rgb(65, 65, 249)',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },

  ];

  // *************************** Market Details Table *************************

  const AvgstreamAct = (streamVal) => {
    const StreamAvg = streamVal.map((item) => {
      return item.symbolactivity
    }).reduce((a, b) => a + b, 0)
    // console.log("StreamAvg",StreamAvg)
    return StreamAvg / streamVal.length
  }

  const getColor = (streamAct) => {

    // if (streamAct >= nillStart && streamAct < nillEnd) {
    //   return '#fff'
    // }

    if (streamAct >= midStart && streamAct < midEnd) {
      return 'rgb(65 65 249 / 48%)'
    }

    else if (streamAct >= averageStart && streamAct < averageEnd) {
      return 'rgb(65 65 249 / 65%)'
    }

    else if (streamAct >= highStart && streamAct < highEnd) {
      return 'rgb(65 65 249 / 85%)'
    }

    else if (streamAct >= superHighStart) {
      return 'rgb(65, 65, 249)'
    }
  }

  const MarketFilters = (e) => {

    var marketDetailArray = []
    marketDataArrayValues.map((firstArray) => {
      firstArray.streamdata.map((secondArray) => {
        secondArray.map((thirdArray) => {
          marketDetailArray.push(thirdArray)
        })
      })
    })

    // ************Market Date ****************

    if (e.target.name === "datemarket") {
      // setMarketDateFilter(e.target.value)
      var filterArray = []
      marketDetailArray.filter((item) => {
        if (item.date.toString().includes(e.target.value.toString())) {
          filterArray.push({ date: item.date, streamdata: [[item]] })
        }
      })

      // if(marketStreamFilter !== ""){

      //   // console.log("filter",filterArray)
      //   var FilterMarketDetailArray = []
      //   filterArray.map((firstArray) => {
      //     firstArray.streamdata.map((secondArray) => {
      //       secondArray.map((thirdArray) => {
      //         FilterMarketDetailArray.push(thirdArray)
      //       })
      //     })
      //   })
      //   var filterArray = []
      //   FilterMarketDetailArray.filter((item) => {
      //     if (item.stream.toString().includes(marketStreamFilter.toString())) {
      //       filterArray.push({ date: item.date, streamdata: [[item]] })
      //     }
      //   })
      // }

    }

    // ************** Market Stream ****************

    if (e.target.name === "streammarket") {
      // setMarketStreamFilter(e.target.value)
      var filterArray = []
      marketDetailArray.filter((item) => {
        if (item.stream.toString().includes(e.target.value.toString())) {
          filterArray.push({ date: item.date, streamdata: [[item]] })
        }
      })
    }


    // ************** Market Symbol ****************

    if (e.target.name === "marketsymbol") {
      // setMarketSymbolFilter(e.target.value)
      var filterArray = []
      marketDetailArray.filter((item) => {
        if (item.symbol.toString().includes(e.target.value.toString())) {
          filterArray.push({ date: item.date, streamdata: [[item]] })
        }
      })



    }

    // *************** Market Stream Activity **********

    if (e.target.name === "streamactivity") {
      var filterArray = []
      marketDetailArray.filter((item) => {
        if (item.streamactivity >= fromStreamValue && item.streamactivity <= toStreamValue) {
          filterArray.push({ date: item.date, streamdata: [[item]] })
        }
      })
    }


    // *************** Reset Stream Activity **********

    // if(e.target.name === "streamactivityreset"){
    //   setFromStreamValue("");
    //   setToStreamValue("");
    // setMarketMetaArray(marketDataArrayValues)
    // }

    if (fromStreamValue !== "" && toStreamValue !== "") {
      setMarketMetaArray(filterArray)
      return
    } else {
      setMarketMetaArray(marketDataArrayValues)
      // return
    }

    setMarketMetaArray(e.target.value !== '' ? filterArray : marketDataArrayValues)

  }


  // **************************** Market Details Table *******************************

  const MarketDetailTableFilters = (e) => {

    // ****************datemarkettable*******************

    if (e.target.name === "datemarkettable") {
      setMarketDateFilter(e.target.value)

      var SerachMarketDetailsTable = marketDetailArray && marketDetailArray.filter((item) => {
        if (item.date.toString().includes(e.target.value.toString())) {
          return item
        }
      })

      if (marketStreamFilter !== "") {
        var SerachMarketDetailsTable = SerachMarketDetailsTable.filter((item) => {
          if (item.stream.toString().includes(marketStreamFilter.toString())) {
            return item
          }
        })
      }

      if (marketSymbolFilter !== "") {
        var SerachMarketDetailsTable = SerachMarketDetailsTable.filter((item) => {
          if (item.symbol.toString().includes(marketSymbolFilter.toString())) {
            return item
          }
        })
      }

      if (fromStreamValue !== "" && toStreamValue !== "") {
        var SerachMarketDetailsTable = SerachMarketDetailsTable.filter((item) => {
          if (item.streamactivity >= fromStreamValue && item.streamactivity <= toStreamValue) {
            return item
          }
        })
      }

    }

    // ****************streammarkettable*******************

    if (e.target.name === "streammarkettable") {
      setMarketStreamFilter(e.target.value)

      var SerachMarketDetailsTable = marketDetailArray && marketDetailArray.filter((item) => {
        if (item.stream.toString().includes(e.target.value.toString())) {
          return item
        }
      })

      if (marketDateFilter !== "") {
        var SerachMarketDetailsTable = SerachMarketDetailsTable.filter((item) => {
          if (item.date.toString().includes(marketDateFilter.toString())) {
            return item
          }
        })
      }

      if (marketSymbolFilter !== "") {
        var SerachMarketDetailsTable = SerachMarketDetailsTable.filter((item) => {
          if (item.symbol.toString().includes(marketSymbolFilter.toString())) {
            return item
          }
        })
      }

      if (fromStreamValue !== "" && toStreamValue !== "") {
        var SerachMarketDetailsTable = SerachMarketDetailsTable.filter((item) => {
          if (item.streamactivity >= fromStreamValue && item.streamactivity <= toStreamValue) {
            return item
          }
        })
      }

    }


    // ****************marketsymboltable*******************

    if (e.target.name === "marketsymboltable") {
      setMarketSymbolFilter(e.target.value)

      var SerachMarketDetailsTable = marketDetailArray && marketDetailArray.filter((item) => {
        if (item.symbol.toString().includes(e.target.value.toString())) {
          return item
        }
      })

      if (marketDateFilter !== "") {
        var SerachMarketDetailsTable = SerachMarketDetailsTable.filter((item) => {
          if (item.date.toString().includes(marketDateFilter.toString())) {
            return item
          }
        })
      }

      if (marketStreamFilter !== "") {
        var SerachMarketDetailsTable = SerachMarketDetailsTable.filter((item) => {
          if (item.stream.toString().includes(marketStreamFilter.toString())) {
            return item
          }
        })
      }

      if (fromStreamValue !== "" && toStreamValue !== "") {
        var SerachMarketDetailsTable = SerachMarketDetailsTable.filter((item) => {
          if (item.streamactivity >= fromStreamValue && item.streamactivity <= toStreamValue) {
            return item
          }
        })
      }

    }

    // ****************streamactivitytable*******************

    if (e.target.name === "streamactivitytable") {
      var SerachMarketDetailsTable = marketDetailArray && marketDetailArray.filter((item) => {
        if (item.streamactivity >= fromStreamValue && item.streamactivity <= toStreamValue) {
          return item
        }
      })

      if (marketDateFilter !== "") {
        var SerachMarketDetailsTable = SerachMarketDetailsTable.filter((item) => {
          if (item.date.toString().includes(marketDateFilter.toString())) {
            return item
          }
        })
      }

      if (marketSymbolFilter !== "") {
        var SerachMarketDetailsTable = SerachMarketDetailsTable.filter((item) => {
          if (item.symbol.toString().includes(marketSymbolFilter.toString())) {
            return item
          }
        })
      }

      if (marketStreamFilter !== "") {
        var SerachMarketDetailsTable = SerachMarketDetailsTable.filter((item) => {
          if (item.stream.toString().includes(marketStreamFilter.toString())) {
            return item
          }
        })
      }

    }

    setMarketDetailsTable(SerachMarketDetailsTable)
  }


  return (
    <>
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header order_type">
                <button onClick={() => backToForm()} className="export-btn back"> Back</button>
                <h4 className="card-title">Market Data</h4>
              </div>
              <div className="card-body">

                <div className="color-div col-md-6  m-auto">
                  <ul className="d-flex justify-content-center">
                    <li style={{ background: '#fff' }}>Nill
                      <p style={{ color: "black" }}>{nillStart} to {nillEnd}</p>
                    </li>
                    {/* rgb(65 65 249 / 48%) */}
                    <li style={{ background: 'rgb(65 65 249 / 48%)' }}>Mid
                      <p >{midStart} to {midEnd}</p>

                    </li>
                    {/* rgb(65 65 249 / 65%) */}
                    <li style={{ background: 'rgb(65 65 249 / 65%)' }}>Average
                      <p>{averageStart} to {averageEnd}</p>
                    </li>
                    <li style={{ background: 'rgb(65 65 249 / 85%)' }}>High
                      <p>{highStart} to {highEnd}</p>
                    </li>
                    {/* rgb(65 65 249 / 85%) */}
                    <li style={{ background: 'rgb(65, 65, 249)' }}>Superhigh
                      <p> above {superHighStart}</p>
                    </li>

                  </ul>
                </div>
                <div className="row order-type-export">

                  <div className="export-btn">
                    {/* <ExportToExcel apiData={Object.values(dataTrade)} fileName={fileName}/> */}


                    <h6>[{tokenFilter !== "" ? "Token :" + tokenFilter + "," : ""}{" "}
                      {symbolFilter !== "" ? "Symbol :" + symbolFilter + "," : ""}{" "}{sFilter !== "" ? "S :" + sFilter + "," : ""}{" "}{requestTimeFilter !== "" ? "RequestTime :" + requestTimeFilter + "," : ""} {" "} {localTimeFilter !== "" ? "LocalTime :" + localTimeFilter + "," : ""} {" "} {responseTimeFilter !== "" ? "ResponseTime :" + responseTimeFilter : ""} {" "} {resLocFilter !== "" ? "ResLoc :" + resLocFilter : ""} {" "} {locReqFilter !== "" ? "LocReq :" + locReqFilter : ""} {" "}  {reqResFilter !== "" ? "ReqRes :" + reqResFilter : ""} {" "} {exIdFilter !== "" ? "exId :" + exIdFilter : ""} {" "} {priceFilter !== "" ? "Price :" + priceFilter : ""} {" "} {qtyFilter !== "" ? "Qty :" + qtyFilter : ""} {" "} {remQtyFilter !== "" ? "RemQty :" + remQtyFilter : ""} {" "} {otFilter !== "" ? "OT :" + otFilter : ""} {" "} {mFilter !== "" ? "M :" + mFilter : ""} {" "} {errCodeFilter !== "" ? "ErrCode :" + errCodeFilter : ""} {" "} {ctcIdFilter !== "" ? "CtcId :" + ctcIdFilter : ""} {" "} {refIdFilter !== "" ? "RefId :" + refIdFilter : ""} {" "} {seriesFilter !== "" ? "Series :" + seriesFilter : ""} {" "} {ltqFilter !== "" ? "Ltq :" + ltqFilter : ""} {" "} {ltpFilter !== "" ? "Ltp :" + ltpFilter : ""} {" "} {statusFilter !== "" ? "Status :" + statusFilter : ""} {" "} {lastActivityReferenceFilter !== "" ? "LastActivityReference :" + lastActivityReferenceFilter : ""} {" "} {lFilter !== "" ? "L :" + lFilter : ""} {" "} {accNoFilter !== "" ? "AccNo :" + accNoFilter : ""}
                      ]
                    </h6>

                  </div>


                  <div className="col-md-2">
                    <label style={{ fontWeight: "bold", color: "black" }}>
                      Filter
                    </label>
                    <select
                      className="form-control"
                      onChange={(e) => {
                        setSelectedValue(e.target.value);
                      }}
                      value={selectedValue}
                      name="filter"
                    >
                      <option value="All">All</option>
                      {FilterArrayList.map((sm, i) => (
                        <option value={sm}>{sm}</option>
                      ))}
                    </select>
                  </div>
                  {selectedValue && getSelectedFilter()}
                </div>


                <DataTable
                  columns={columns}
                  data={MarketOpenDataValue}
                  // noHeader
                  defaultSortField="id"
                  defaultSortAsc={false}
                  pagination
                  highlightOnHover
                  fixedHeader={true}
                  fixedHeaderScrollHeight={'550px'}
                  paginationPerPage={10}
                  paginationComponentOptions={paginationComponentOptions}
                  paginationRowsPerPageOptions={[10, 50, 100]}
                  customStyles={customStyles}
                  conditionalRowStyles={conditionalFirstTable}

                />




              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div >

        <h3>Market Details</h3>

        <div className="row" style={{ "marginBottom": "10px" }}>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              Date
            </label>
            <input
              type="date"
              // placeholder="yyyy-mm-dd"
              name="datemarket"
              className="form-control"
              // required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
              onChange={(e) => MarketFilters(e)}
              value={marketDateFilter}
            />
          </div>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              Stream
            </label>
            <select
              className="form-control"
              onChange={(e) => MarketFilters(e)}
              value={marketStreamFilter}
              name="streammarket"
            >
              <option value="">All</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>

            </select>
          </div>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              Symbol
            </label>
            <select
              className="form-control"
              onChange={(e) => MarketFilters(e)}
              value={marketSymbolFilter}
              name="marketsymbol"
            >
              <option value="">All</option>
              {Object.keys(getSymboles("Symbol")).map((sm, i) => (

                <option value={sm}>{sm}</option>

              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label style={{ fontWeight: "bold", color: "black" }}>
              Stream Activity
            </label>
            <div className="row">
              <div className="col-md-3">
                <input
                  type="text"
                  placeholder="From"
                  name="fromstream"
                  className="form-control"

                  onChange={(e) => setFromStreamValue(e.target.value)}
                  value={fromStreamValue}
                />

              </div>
              <div className="col-md-3">

                <input
                  type="text"
                  placeholder="To"
                  name="tostream"
                  className="form-control"

                  onChange={(e) => setToStreamValue(e.target.value)}
                  value={toStreamValue}
                />
              </div>
              <div className="col-md-2">

                <Button
                  name="streamactivity"
                  variant="primary"
                  onClick={(e) => MarketFilters(e)}

                >
                  Filter
                </Button>
              </div>
              <div className="col-md-3">

                <Button
                  name="streamactivityreset"
                  variant="primary"
                  onClick={(e) => {
                    setFromStreamValue("");
                    setToStreamValue("");
                    setMarketMetaArray(marketDataArrayValues)
                  }}

                >
                  ResetSA
                </Button>
              </div>
            </div>
          </div>
        </div >

      </div> 
      <div className="markettable-scroll">
        <Table border="2px" className="table table-fixed market-content">

          <tbody>
            <thead className="marketheader table-dev" id="MarketHeaderId">
              <tr >
                <th>Date</th>
                <th>Stream</th>
                <th>Symbol</th>
                <th>lastRejectTime</th>
                <th>firsrConfirmTime</th>
                <th>Symbol Activity</th>
                <th>Stream Activity</th>


              </tr>
            </thead>
            {marketMetaArray && marketMetaArray.map((item, indexdate) => (

              <tr>

                <td class="table-dev">

                  {item.streamdata.map((streamdata, index1) => (
                    <>
                      <table class="table-dev" >

                        {streamdata.map((streamloop, index2) => (
                          <tr style={{ color: '#fff', background: getColor(streamloop.streamactivity) }}>

                            {index1 > 0 ? <td >{ }</td> : <td align="left" rowspan={item.streamdata.length}>{streamloop.date}</td>}

                            {index2 > 0 ? '' : <td rowspan={streamdata.length}>{streamloop.stream}</td>}
                            <td align="left">{streamloop.symbol}</td>
                            <td align="left">{streamloop.lastRejectTime}</td>
                            <td align="left">{streamloop.firsrConfirmTime}</td>
                            <td align="left">{streamloop.symbolactivity}</td>
                            {streamdata.length > 1 ? <td rowspan={streamdata.length}> {index2 > 0 ? '' : AvgstreamAct(streamdata)} </td> : <td align="left">{streamloop.streamactivity}</td>}
                          </tr>
                        ))}
                      </table>

                    </>
                  ))}

                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>


    */}
      <div >
        <h3>Market Details</h3>

        <div className="row" style={{ "marginBottom": "10px" }}>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              Date
            </label>
            <input
              type="date"
              // placeholder="yyyy-mm-dd"
              name="datemarkettable"
              className="form-control"
              // required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
              onChange={(e) => MarketDetailTableFilters(e)}
              value={marketDateFilter}
            />
          </div>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              Stream
            </label>
            <select
              className="form-control"
              onChange={(e) => MarketDetailTableFilters(e)}
              value={marketStreamFilter}
              name="streammarkettable"
            >
              <option value="">All</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>

            </select>
          </div>
          <div className="col-md-2">
            <label style={{ fontWeight: "bold", color: "black" }}>
              Symbol
            </label>
            <select
              className="form-control"
              onChange={(e) => MarketDetailTableFilters(e)}
              value={marketSymbolFilter}
              name="marketsymboltable"
            >
              <option value="">All</option>
              {Object.keys(getSymboles("Symbol")).map((sm, i) => (

                <option value={sm}>{sm}</option>

              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label style={{ fontWeight: "bold", color: "black" }}>
              Stream Activity
            </label>
            <div className="row">
              <div className="col-md-3">
                <input
                  type="text"
                  placeholder="From"
                  name="fromstream"
                  className="form-control"

                  onChange={(e) => setFromStreamValue(e.target.value)}
                  value={fromStreamValue}
                />

              </div>
              <div className="col-md-3">

                <input
                  type="text"
                  placeholder="To"
                  name="tostream"
                  className="form-control"

                  onChange={(e) => setToStreamValue(e.target.value)}
                  value={toStreamValue}
                />
              </div>
              <div className="col-md-2">

                <Button
                  name="streamactivitytable"
                  variant="primary"
                  onClick={(e) => MarketDetailTableFilters(e)}

                >
                  Filter
                </Button>
              </div>
              <div className="col-md-3">

                <Button
                  name="streamactivityresettable"
                  variant="primary"
                  onClick={(e) => {
                    setFromStreamValue("");
                    setToStreamValue("");
                    setMarketDetailsTable(marketDetailArray)

                  }}

                >
                  ResetSA
                </Button>
              </div>
            </div>
          </div>
        </div >

        <DataTable
          columns={columns1}
          data={marketDetailsTable}
          // noHeader
          defaultSortField="id"
          defaultSortAsc={false}
          pagination
          highlightOnHover
          fixedHeader={true}
          fixedHeaderScrollHeight={'550px'}
          paginationPerPage={10}
          paginationComponentOptions={paginationComponentOptions}
          paginationRowsPerPageOptions={[10, 50, 100]}
          customStyles={customStyles}
          conditionalRowStyles={conditionalRowStyles}
        />
      </div>

    </>

  )
}
export default MarketOpenTimeTable;