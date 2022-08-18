import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import ExportToExcel from "../../../common/ExportToExcel";
import OrderTypeLinegraph from '../../Charts/OrderTypeLineGraph';
// import excel from 'xlsx';
// const reader = require('xlsx')

// import OrderI_DXLSX from '../../../../src/16012022_RESPONES.xlsx'


const OrderTypeTable = (props) => {
  const { tradingData} = props;
  const fileName = "ordertype";
  const [orderTypeData, setOrderTypeData] = useState(tradingData.data);
  const [filterData, setFilterData] = useState(tradingData.data);

  const [oType, setOType] = useState("");
  const [orderN, setOrderN] = useState("");
  const [algo, setAlgo] = useState("");
  const [sq, setSq] = useState("");
  const [tQuantityFilter, setTQuantityFilter] = useState("");
  const [NQuantityFilter, setNQuantityFilter] = useState("");

  const [lessThanTquant, setLessThanTquant] = useState("");
  const [greaterThanTquant, setGreaterThanTquant] = useState("");
  const [equalThanTquant, setEqualThanTquant] = useState("");

  const [lessThanNQ, setLessThanNQ] = useState("");
  const [greaterThanNQ, setGreaterThanNQ] = useState("");
  const [equalThanNQ, setEqualThanNQ] = useState("");
  const [equalSQCount, setEqualSQCount] = useState("");

  const [orderDiff, setOrderDiff] = useState("");
  const [orderIdListMatch ,setOrderIdListmatch]  = useState("")


  useEffect(()=>{
    // setOrderTypeData(tradingData.data);
 
        },[])


  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: 'ALL',
  };

  const customStyles = {
    rows: {
      style: {},
    },
    headCells: {
      style: {
        width: "30px",
        background: "#000",
        color: "#fff",
      },
    },
    cells: {
      style: {
        justifyContent: "center",
        minWidth: "auto !important",
      },
    },
  };

  var Otype = tradingData.data.map((t) => {
    return t.otype;
  });
  var newArrOtype = [];
  Otype.forEach((item) => {
    newArrOtype[item] = Otype.filter((el) => {
      return el === item;
    }).length;
  });

  var OrderN = tradingData.data.map((t) => {
    return t.ordern;
  });
  var newArrOrderN = [];
  OrderN.forEach((item) => {
    newArrOrderN[item] = OrderN.filter((el) => {
      return el === item;
    }).length;
  });

  var Algo = tradingData.data.map((t) => {
    return t.algo;
  });
  var newArrAlgo = [];
  Algo.forEach((item) => {
    newArrAlgo[item] = Algo.filter((el) => {
      return el === item;
    }).length;
  });

  var SQ = tradingData.data.map((t) => {
    return t.sq;
  });
  var newArrSQ = [];
  SQ.forEach((item) => {
    newArrSQ[item] = SQ.filter((el) => {
      return el === item;
    }).length;
  });

  const searchRecord = (e) => {
    // if(e.target.value === ""){
    //   return
    // }
    
    if (e.target.name === "otype") {
      
      setOType(e.target.value);
      var searchData = filterData.filter((item) => {
        if (
          item.otype
            .toString()
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        ) {
          return item;
        }
      });

      if (orderN !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.ordern.toString().toLowerCase().includes(orderN.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (algo !== "") {
        searchData = searchData.filter((item) => {
          if (item.algo.toString().toLowerCase().includes(algo.toLowerCase())) {
            return item;
          }
        });
      }
      if (sq !== "") {
        searchData = searchData.filter((item) => {
          if (item.sq.toString().toLowerCase().includes(sq.toLowerCase())) {
            return item;
          }
        });
      }

      if (lessThanTquant !== "") {
        searchData = searchData.filter((item) => {
          if (item.tquantity < lessThanTquant) {
            return item;
          }
        });
      }
      if (greaterThanTquant !== "") {
        searchData = searchData.filter((item) => {
          if (item.tquantity > greaterThanTquant) {
            return item;
          }
        });
      }

      if (equalThanTquant !== "") {
        searchData = searchData.filter((item) => {
          if (item.tquantity == equalThanTquant) {
            return item;
          }
        });
      }

      if (lessThanNQ !== "") {
        searchData = searchData.filter((item) => {
          if (item.totalnq < lessThanNQ) {
            return item;
          }
        });
      }

      if (greaterThanNQ !== "") {
        searchData = searchData.filter((item) => {
          if (item.totalnq > greaterThanNQ) {
            return item;
          }
        });
      }

      if (equalThanNQ !== "") {
        searchData = searchData.filter((item) => {
          if (item.totalnq == equalThanNQ) {
            return item;
          }
        });
      }
      
      if (equalSQCount !== "") {
        searchData = searchData.filter((item) => {
          if (item.sqcount == equalSQCount) {
            return item;
          }
        });
      }

    }

    //********** OrderN ********/

    if (e.target.name === "ordern") {
      setOrderN(e.target.value);
      var searchData = filterData.filter((item) => {
        if (
          item.ordern
            .toString()
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        ) {
          return item;
        }
      });

      if (oType !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.otype.toString().toLowerCase().includes(oType.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (algo !== "") {
        searchData = searchData.filter((item) => {
          if (item.algo.toString().toLowerCase().includes(algo.toLowerCase())) {
            return item;
          }
        });
      }
      if (sq !== "") {
        searchData = searchData.filter((item) => {
          if (item.sq.toString().toLowerCase().includes(sq.toLowerCase())) {
            return item;
          }
        });
      }
      if (lessThanTquant !== "") {
        searchData = searchData.filter((item) => {
          if (item.tquantity < lessThanTquant) {
            return item;
          }
        });
      }
      if (greaterThanTquant !== "") {
        searchData = searchData.filter((item) => {
          if (item.tquantity > greaterThanTquant) {
            return item;
          }
        });
      }

      if (equalThanTquant !== "") {
        searchData = searchData.filter((item) => {
          if (item.tquantity == equalThanTquant) {
            return item;
          }
        });
      }
      if (lessThanNQ !== "") {
        searchData = searchData.filter((item) => {
          if (item.totalnq < lessThanNQ) {
            return item;
          }
        });
      }

      if (greaterThanNQ !== "") {
        searchData = searchData.filter((item) => {
          if (item.totalnq > greaterThanNQ) {
            return item;
          }
        });
      }

      if (equalThanNQ !== "") {
        searchData = searchData.filter((item) => {
          if (item.totalnq == equalThanNQ) {
            return item;
          }
        });
      }
      
      if (equalSQCount !== "") {
        searchData = searchData.filter((item) => {
          if (item.sqcount == equalSQCount) {
            return item;
          }
        });
      }

    }

 //********** Algo ********/

    if (e.target.name === "algo") {
      setAlgo(e.target.value);
      var searchData = tradingData.data.filter((item) => {
        if (
          item.algo
            .toString()
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        ) {
          return item;
        }
      });

      if (oType !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.otype.toString().toLowerCase().includes(oType.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (orderN !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.ordern.toString().toLowerCase().includes(orderN.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (sq !== "") {
        searchData = searchData.filter((item) => {
          if (item.sq.toString().toLowerCase().includes(sq.toLowerCase())) {
            return item;
          }
        });
      }

      if (lessThanTquant !== "") {
        searchData = searchData.filter((item) => {
          if (item.tquantity < e.target.value) {
            return item;
          }
        });
      }
      if (greaterThanTquant !== "") {
        searchData = searchData.filter((item) => {
          if (item.tquantity > e.target.value) {
            return item;
          }
        });
      }

      if (equalThanTquant !== "") {
        searchData = searchData.filter((item) => {
          if (item.tquantity == e.target.value) {
            return item;
          }
        });
      }

      if (lessThanNQ !== "") {
        searchData = searchData.filter((item) => {
          if (item.totalnq < e.target.value) {
            return item;
          }
        });
      }

      if (greaterThanNQ !== "") {
        searchData = searchData.filter((item) => {
          if (item.totalnq > e.target.value) {
            return item;
          }
        });
      }

      if (equalThanNQ !== "") {
        searchData = searchData.filter((item) => {
          if (item.totalnq == e.target.value) {
            return item;
          }
        });
      }
      
      if (equalSQCount !== "") {
        searchData = searchData.filter((item) => {
          if (item.sqcount == e.target.value) {
            return item;
          }
        });
      }

    }

    //********** SQ ********/

    if (e.target.name === "sq") {
      setSq(e.target.value);
    
      var searchData = tradingData.data.filter((item) => {
        if (
          item.sq
            .toString()
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        ) {
         
          return item;
        }
      });

      if (oType !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.otype.toString().toLowerCase().includes(oType.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (orderN !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.ordern.toString().toLowerCase().includes(orderN.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (algo !== "") {
        searchData = searchData.filter((item) => {
          if (item.algo.toString().toLowerCase().includes(algo.toLowerCase())) {
            return item;
          }
        });
      }

      if (lessThanTquant !== "") {
        searchData = searchData.filter((item) => {
          if (item.tquantity < lessThanTquant) {
            return item;
          }
        });
      }
      if (greaterThanTquant !== "") {
        searchData = searchData.filter((item) => {
          if (item.tquantity > greaterThanTquant) {
            return item;
          }
        });
      }

      if (equalThanTquant !== "") {
        searchData = searchData.filter((item) => {
          if (item.tquantity == equalThanTquant) {
            return item;
          }
        });
      }

      if (lessThanNQ !== "") {
        searchData = searchData.filter((item) => {
          if (item.totalnq < lessThanNQ) {
            return item;
          }
        });
      }

      if (greaterThanNQ !== "") {
        searchData = searchData.filter((item) => {
          if (item.totalnq > greaterThanNQ) {
            return item;
          }
        });
      }

      if (equalThanNQ !== "") {
        searchData = searchData.filter((item) => {
          if (item.totalnq == equalThanNQ) {
            return item;
          }
        });
      }
      
      if (equalSQCount !== "") {
        searchData = searchData.filter((item) => {
          if (item.sqcount == equalSQCount) {
            return item;
          }
        });
      }

    }

//********** TQunantity ********/

    if (e.target.name === "lessThanTQ") {
      setLessThanTquant(e.target.value);
      if(e.target.value === ""){
        setOrderTypeData(tradingData.data);
        
        setNQuantityFilter("");
        // setTQuantityFilter("");
        setSq("");
        setAlgo("");
        setOrderN("");
        setOType("");
        setEqualSQCount("");
        return       
      }
      var searchData = tradingData.data.filter((item) => {
        if (item.tquantity < e.target.value) {
          return item;
        }
      });

      if (oType !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.otype.toString().toLowerCase().includes(oType.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (orderN !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.ordern.toString().toLowerCase().includes(orderN.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (algo !== "") {
        searchData = searchData.filter((item) => {
          if (item.algo.toString().toLowerCase().includes(algo.toLowerCase())) {
            return item;
          }
        });
      }
      if (sq !== "") {
        searchData = searchData.filter((item) => {
          if (item.sq.toString().toLowerCase().includes(sq.toLowerCase())) {
            return item;
          }
        });
      }
     
      if (lessThanNQ !== "") {
        searchData = searchData.filter((item) => {
          if (item.totalnq < lessThanNQ) {
            return item;
          }
        });
      }

      if (greaterThanNQ !== "") {
        searchData = searchData.filter((item) => {
          if (item.totalnq > greaterThanNQ) {
            return item;
          }
        });
      }

      if (equalThanNQ !== "") {
        searchData = searchData.filter((item) => {
          if (item.totalnq == equalThanNQ) {
            return item;
          }
        });
      }

      
      if (equalSQCount !== "") {
        searchData = searchData.filter((item) => {
          if (item.sqcount == equalSQCount) {
            return item;
          }
        });
      }

    }

    if (e.target.name === "greaterThanTQ" ) {
      setGreaterThanTquant(e.target.value);
      if(e.target.value === ""){
        setOrderTypeData(tradingData.data);
        
        setNQuantityFilter("");
        // setTQuantityFilter("");
        setSq("");
        setAlgo("");
        setOrderN("");
        setOType("");
        setEqualSQCount("");
        return       
      }
      var searchData = tradingData.data.filter((item) => {
        if (item.tquantity > e.target.value) {
          return item;
        }
      });

      if (oType !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.otype.toString().toLowerCase().includes(oType.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (orderN !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.ordern.toString().toLowerCase().includes(orderN.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (algo !== "") {
        searchData = searchData.filter((item) => {
          if (item.algo.toString().toLowerCase().includes(algo.toLowerCase())) {
            return item;
          }
        });
      }
      if (sq !== "") {
        searchData = searchData.filter((item) => {
          if (item.sq.toString().toLowerCase().includes(sq.toLowerCase())) {
            return item;
          }
        });
      }
  
      if (lessThanNQ !== "") {
        searchData = searchData.filter((item) => {
          if (item.totalnq < lessThanNQ) {
            return item;
          }
        });
      }

      if (greaterThanNQ !== "") {
        searchData = searchData.filter((item) => {
          if (item.totalnq > greaterThanNQ) {
            return item;
          }
        });
      }

      if (equalThanNQ !== "") {
        searchData = searchData.filter((item) => {
          if (item.totalnq == equalThanNQ) {
            return item;
          }
        });
      }
      
      if (equalSQCount !== "") {
        searchData = searchData.filter((item) => {
          if (item.sqcount == equalSQCount) {
            return item;
          }
        });
      }

    }

    if (e.target.name === "equalsTQ"  ) {
      setEqualThanTquant(e.target.value);
      if(e.target.value === ""){
        setOrderTypeData(tradingData.data);
        
        setNQuantityFilter("");
        // setTQuantityFilter("");
        setSq("");
        setAlgo("");
        setOrderN("");
        setOType("");
        setEqualSQCount("");
        return       
      }
      var searchData = tradingData.data.filter((item) => {
        if (item.tquantity == e.target.value) {
          return item;
        }
      });

      if (oType !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.otype.toString().toLowerCase().includes(oType.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (orderN !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.ordern.toString().toLowerCase().includes(orderN.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (algo !== "") {
        searchData = searchData.filter((item) => {
          if (item.algo.toString().toLowerCase().includes(algo.toLowerCase())) {
            return item;
          }
        });
      }
      if (sq !== "") {
        searchData = searchData.filter((item) => {
          if (item.sq.toString().toLowerCase().includes(sq.toLowerCase())) {
            return item;
          }
        });
      }
    

      if (lessThanNQ !== "") {
        searchData = searchData.filter((item) => {
          if (item.totalnq < lessThanNQ) {
            return item;
          }
        });
      }

      if (greaterThanNQ !== "") {
        searchData = searchData.filter((item) => {
          if (item.totalnq > greaterThanNQ) {
            return item;
          }
        });
      }

      if (equalThanNQ !== "") {
        searchData = searchData.filter((item) => {
          if (item.totalnq == equalThanNQ) {
            return item;
          }
        });
      }
      
      if (equalSQCount !== "") {
        searchData = searchData.filter((item) => {
          if (item.sqcount == equalSQCount) {
            return item;
          }
        });
      }

    }

//********** TotalNQ ********/
    
    if (e.target.name === "lessThanNQ" ) {
      setLessThanNQ(e.target.value);
      if(e.target.value === ""){
        setOrderTypeData(tradingData.data);
        
        // setNQuantityFilter("");
        setTQuantityFilter("");
        setSq("");
        setAlgo("");
        setOrderN("");
        setOType("");
        setEqualSQCount("");
        return       
      }
      var searchData = tradingData.data.filter((item) => {
        if (item.totalnq < e.target.value) {
          return item;
        }
      });

      if (oType !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.otype.toString().toLowerCase().includes(oType.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (orderN !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.ordern.toString().toLowerCase().includes(orderN.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (algo !== "") {
        searchData = searchData.filter((item) => {
          if (item.algo.toString().toLowerCase().includes(algo.toLowerCase())) {
            return item;
          }
        });
      }
      if (sq !== "") {
        searchData = searchData.filter((item) => {
          if (item.sq.toString().toLowerCase().includes(sq.toLowerCase())) {
            return item;
          }
        });
      }
      if (lessThanTquant !== "") {
        searchData = searchData.filter((item) => {
          if (item.tquantity < lessThanTquant) {
            return item;
          }
        });
      }
      if (greaterThanTquant !== "") {
        searchData = searchData.filter((item) => {
          if (item.tquantity > greaterThanTquant) {
            return item;
          }
        });
      }

      if (equalThanTquant !== "") {
        searchData = searchData.filter((item) => {
          if (item.tquantity == equalThanTquant) {
            return item;
          }
        });
      }
      
      if (equalSQCount !== "") {
        searchData = searchData.filter((item) => {
          if (item.sqcount == equalSQCount) {
            return item;
          }
        });
      }

    }

    if (e.target.name === "greaterThanNQ" ) {
      setGreaterThanNQ(e.target.value);
      if(e.target.value === ""){
        setOrderTypeData(tradingData.data);
        
        // setNQuantityFilter("");
        setTQuantityFilter("");
        setSq("");
        setAlgo("");
        setOrderN("");
        setOType("");
        setEqualSQCount("");
        return       
      }
      var searchData = tradingData.data.filter((item) => {
        if (item.totalnq > e.target.value) {
          return item;
        }
      });

      if (oType !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.otype.toString().toLowerCase().includes(oType.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (orderN !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.ordern.toString().toLowerCase().includes(orderN.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (algo !== "") {
        searchData = searchData.filter((item) => {
          if (item.algo.toString().toLowerCase().includes(algo.toLowerCase())) {
            return item;
          }
        });
      }
      if (sq !== "") {
        searchData = searchData.filter((item) => {
          if (item.sq.toString().toLowerCase().includes(sq.toLowerCase())) {
            return item;
          }
        });
      }
      if (lessThanTquant !== "") {
        searchData = searchData.filter((item) => {
          if (item.tquantity < lessThanTquant) {
            return item;
          }
        });
      }
      if (greaterThanTquant !== "") {
        searchData = searchData.filter((item) => {
          if (item.tquantity > greaterThanTquant) {
            return item;
          }
        });
      }

      if (equalThanTquant !== "") {
        searchData = searchData.filter((item) => {
          if (item.tquantity == equalThanTquant) {
            return item;
          }
        });
      }
      
      if (equalSQCount !== "") {
        searchData = searchData.filter((item) => {
          if (item.sqcount == equalSQCount) {
            return item;
          }
        });
      }

    }

    if (e.target.name === "equalsNQ" ) {
      setEqualThanNQ(e.target.value);
      if(e.target.value === ""){
        setOrderTypeData(tradingData.data);
        
        // setNQuantityFilter("");
        setTQuantityFilter("");
        setSq("");
        setAlgo("");
        setOrderN("");
        setOType("");
        setEqualSQCount("");
        return       
      }
      var searchData = tradingData.data.filter((item) => {
        if (item.totalnq == e.target.value) {
          return item;
        }
      });

      if (oType !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.otype.toString().toLowerCase().includes(oType.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (orderN !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.ordern.toString().toLowerCase().includes(orderN.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (algo !== "") {
        searchData = searchData.filter((item) => {
          if (item.algo.toString().toLowerCase().includes(algo.toLowerCase())) {
            return item;
          }
        });
      }
      if (sq !== "") {
        searchData = searchData.filter((item) => {
          if (item.sq.toString().toLowerCase().includes(sq.toLowerCase())) {
            return item;
          }
        });
      }
      if (lessThanTquant !== "") {
        searchData = searchData.filter((item) => {
          if (item.tquantity < lessThanTquant) {
            return item;
          }
        });
      }
      if (greaterThanTquant !== "") {
        searchData = searchData.filter((item) => {
          if (item.tquantity > greaterThanTquant) {
            return item;
          }
        });
      }

      if (equalThanTquant !== "") {
        searchData = searchData.filter((item) => {
          if (item.tquantity == equalThanTquant) {
            return item;
          }
        });
      }
   
      if (equalSQCount !== "") {
        searchData = searchData.filter((item) => {
          if (item.sqcount == equalSQCount) {
            return item;
          }
        });
      }

    }

    //********** SQCount ********/

    if(e.target.name === "sqcount" ){
      setEqualSQCount(e.target.value);
     
      if(e.target.value === ""){
        setOrderTypeData(tradingData.data);
        
        setNQuantityFilter("");
        setTQuantityFilter("");
        setSq("");
        setAlgo("");
        setOrderN("");
        setOType("");
        return       
      }
     
      var searchData = tradingData.data.filter((item) => {
      //  console.log("entry")
        if (item.sqcount == e.target.value ) {
          return item;
        }
      });
    
      if (oType !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.otype.toString().toLowerCase().includes(oType.toLowerCase())
          ) {
            return item;
          }
        });
      }

      if (orderN !== "") {
        searchData = searchData.filter((item) => {
          if (
            item.ordern.toString().toLowerCase().includes(orderN.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (algo !== "") {
        searchData = searchData.filter((item) => {
          if (item.algo.toString().toLowerCase().includes(algo.toLowerCase())) {
            return item;
          }
        });
      }

      if (sq !== "") {
        searchData = searchData.filter((item) => {
          if (item.sq.toString().toLowerCase().includes(sq.toLowerCase())) {
            return item;
          }
        });
      }
      if (lessThanTquant !== "") {
        searchData = searchData.filter((item) => {
          if (item.tquantity < lessThanTquant) {
            return item;
          }
        });
      }
      if (greaterThanTquant !== "") {
        searchData = searchData.filter((item) => {
          if (item.tquantity > greaterThanTquant) {
            return item;
          }
        });
      }
      if (equalThanTquant !== "") {
        searchData = searchData.filter((item) => {
          if (item.tquantity == equalThanTquant) {
            return item;
          }
        });
      }

      if (lessThanNQ !== "") {
        searchData = searchData.filter((item) => {
          if (item.totalnq < lessThanNQ) {
            return item;
          }
        });
      }

      if (greaterThanNQ !== "") {
        searchData = searchData.filter((item) => {
          if (item.totalnq > greaterThanNQ) {
            return item;
          }
        });
      }

      if (equalThanNQ !== "") {
        searchData = searchData.filter((item) => {
          if (item.totalnq == equalThanNQ) {
            return item;
          }
        });
      }

    }

    // console.log("serach",searchData)
    setOrderTypeData(searchData);
  };


  // **************CSV Export **************

  var JsonFields = ["SNo","TIME","TStamp","Otype","OrderN","Algo","MCount","SQ","SQCount","OrderID","OId Diff","TotalNQ","TQuantity","OCount","Price",]

function JsonToCSV(){
    var csvStr = JsonFields.join(",") + "\n";
   orderTypeData.forEach(airport => {
       
        csvStr += airport.sno +  ',' + airport.time + ',' + airport.timestamp + ','  + airport.otype + ',' + airport.ordern+ ',' +airport.algo + ',' + airport.mcount + ',' + airport.sq +  ',' + airport.sqcount +  ',' + airport.orderid +  ',' +  airport.orderidDiff +  ',' +  airport.totalnq +  ',' +  airport.tquantity +  ',' +  airport.ocount + ',' + airport.price +  "\n";
   
        })
        return csvStr;
}

// console.log("scd",orderTypeData)
const csvStr1 = JsonToCSV()
function downloadCSV(csvStr) {
  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvStr);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'OrderTypeData.csv';
  hiddenElement.click(); 
}


// *********************Table Conditional Style ****************************

const conditionalRowStyles = [
  {
   
    when: row => row.orderidDiff == orderDiff,
    style: {
      backgroundColor: 'rgb(114 159 64)',
      color: 'white',
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  // You can also pass a callback to style for additional customization
  {
   
    when: row => orderIdListMatch ? row.orderid == orderIdListMatch.filter((item)=>{
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


// *****************************File OrderId Data Read ****************************

// console.log("orderIdListMatch",orderIdListMatch)

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
    <div>
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              {/* <div className="card-header">
                             
                <div className="col-md-2 order_type">
                  <button onClick={() => backToForm()} className="export-btn"> Back</button>
                  <h4 className="card-title">OrderType</h4>
                </div>
               
              
              </div> */}

              <div className="card-body">
                <div className="row">
              <div className="export-btn">
              <button  onClick={() =>downloadCSV(csvStr1)}>ExportToCSV</button>
                    {/* <ExportToExcel
                      apiData={orderTypeData}
                      fileName={fileName}
                    /> */}
       <button onClick={() =>getOrderIdList()}>OrderId Match</button>
                  </div>
                  </div>
                <div className="row order-type-export">
                  
                  <div className="col-md-2">
                    <label style={{ fontWeight: "bold", color: "black" }}>
                      OType
                    </label>
                    <select
                      className="form-control"
                      onChange={(e) => {
                        searchRecord(e);
                      }}
                      value={oType}
                      name="otype"
                    >
                      <option value="">All</option>
                      {Object.keys(newArrOtype).map((sm, i) => (
                        <option value={sm}>{sm}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label style={{ fontWeight: "bold", color: "black" }}>
                      OrderN
                    </label>
                    <select
                      className="form-control"
                      onChange={(e) => {
                        searchRecord(e);
                      }}
                      value={orderN}
                      name="ordern"
                    >
                      <option value="">All</option>
                      {Object.keys(newArrOrderN).map((sm, i) => (
                        <option value={sm}>{sm}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-2">
                    <label style={{ fontWeight: "bold", color: "black" }}>
                      Algo
                    </label>
                    <select
                      className="form-control"
                      onChange={(e) => {
                        searchRecord(e);
                      }}
                      value={algo}
                      name="algo"
                    >
                      <option value="">All</option>
                      {Object.keys(newArrAlgo).map((sm, i) => (
                        <option value={sm}>{sm}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-2">
                    <label style={{ fontWeight: "bold", color: "black" }}>
                      SQ
                    </label>
                    <select
                      className="form-control"
                      onChange={(e) => {
                        searchRecord(e);
                      }}
                      value={sq}
                      name="sq"
                    >
                      <option value="">All</option>
                      {Object.keys(newArrSQ).map((sm, i) => (
                        <option value={sm}>{sm}</option>
                      ))}
                    </select>
                  </div>
 
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
                        //  value={greaterThanTquant}
                      />
                  </div>
              
                  <div className="col-md-2">
                    <label style={{ fontWeight: "bold", color: "black" }}>
                      TotalNQ
                    </label>
                    <div className="tquantity">
                    <select
                      className="form-control"
                      onChange={(e) => {
                        setNQuantityFilter(e.target.value);
                      }}
                      value={NQuantityFilter}

                      // name="allNQ"
                    >
                      <option value="">All</option>
                      <option value="lessThanNQ">LT</option>
                      <option value="greaterThanNQ">GT</option>
                      <option value="equalsNQ">Equal</option>
                    </select>
                    {NQuantityFilter !== "" ? (
                      <input
                        type="text"
                        placeholder={NQuantityFilter}
                        name={NQuantityFilter}
                        className="form-control"
                        
                        onChange={(e) => searchRecord(e)}
                        //  value={greaterThanTquant}
                      />
                    ) : (
                      " "
                    )}
                    </div>
                  </div>

                  <div className="col-md-2">
                    <label style={{ fontWeight: "bold", color: "black" }}>
                      TQuantity
                    </label>
                    <div className="tquantity">
                    <select
                      className="form-control"
                      onChange={(e) => {
                        setTQuantityFilter(e.target.value);
                      }}
                      value={tQuantityFilter}
                      // name="allTQuant"
                    >
                      <option value="">All</option>
                      <option value="lessThanTQ">LT</option>
                      <option value="greaterThanTQ">GT</option>
                      <option value="equalsTQ">Equal</option>
                    </select>
                    {tQuantityFilter !== "" ? (
                      <input
                        type="text"
                        placeholder={tQuantityFilter}
                        name={tQuantityFilter}
                        className="form-control"
                        // style={{ marginTop: "10px" }}
                        onChange={(e) => searchRecord(e)}
                        //  value={greaterThanTquant}
                      />
                    ) : (
                      " "
                    )}
                    </div>
                  </div>
                 

                  <div className="col-md-2">
                    <label style={{ fontWeight: "bold", color: "black" }}>
                     Order Diff
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Order Diff"
                        name="sqcount"
                        className="form-control"
                        
                        onChange={(e) => setOrderDiff(e.target.value)}
                        //  value={greaterThanTquant}
                      />
                  </div>
                </div>

                {/* <DataTableExtensions 
      {...tradingData}
      filter={false}
      export={false}
      print={false}
      
      > */}

                <DataTable
                  columns={tradingData.columns}
                  data={orderTypeData}
                  defaultSortField="id"
                  defaultSortAsc={false}
                  pagination
                  highlightOnHover
                  fixedHeader ={true}
                  fixedHeaderScrollHeight= {'550px'}
                  customStyles={customStyles}
                  paginationComponentOptions={paginationComponentOptions}
                  paginationPerPage={10}
                 paginationRowsPerPageOptions={[10,50,100]}
                 conditionalRowStyles={conditionalRowStyles}
                />

                {/* </DataTableExtensions> */}
              </div>
            </div>
          </div>
        </div>

        <OrderTypeLinegraph orderTypeData={orderTypeData} orderTypeGraph={tradingData.data}/>
      </div>
    </div>
  );
};

export default OrderTypeTable;
