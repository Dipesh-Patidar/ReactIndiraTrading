import React, { createContext, useReducer, useEffect, useState } from 'react';
import { Route, Routes as Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";
import { reducer } from './Reducer'
import { Nav, Col, Row, Badge, Image, Button, Dropdown, Accordion, Navbar, Tab } from '@themesberg/react-bootstrap';

import {
  getSymbolList
} from '../services';


//Forms Pages

import AtpCalculator from "./atpcalculator/AtpCalculator";
import OrderType from "./ordertype/OrderType";
import PendingOrders from "./pendingorders/PendingOrders";
import MultiScript from "./multiscript/MultiScriptForm";
import MarketOpenTime from './marketopentime/MarketOpenTime';

// Tables 
import AtpCalculatorTable from "./atpcalculator/AtpCalculatorTable";
import PendingOrderTable from "./pendingorders/PendingOrderTable";
import OrderTypetable from "./ordertype/OrderTypeTable";
import MultiScriptTable from "./multiscript/MultiScriptTable";
import OptionData from "./optiondata/OptionData";
import OptionIndex from './optionindex/OptionIndex';
import MarketOpenTimeTable from './marketopentime/MarketOpenTimeTable';



// components
import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import Preloader from "../components/Preloader";
import AlertToast from '../common/AlertToast';


export const Context = createContext();


const initialState = {
  // MultiScriptTokenList:[]
}

const RouteWithSidebar = (props) => {
  // const [loaded, setLoaded] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  const [alertColor, setAlertColor] = useState("");

  const onAlertClose = e => {
    setShowAlert(false);
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const getSymbolListData = async () => {
    const res = await getSymbolList(setShowAlert, setTextAlert, setAlertColor);
    const SymbolRes = res.sort((a, b) => a.Script.localeCompare(b.Script))
    dispatch({
      type: 'SYMBOLLIST_DATA',
      payload: SymbolRes
    })
  }

  useEffect(() => {
    getSymbolListData()
    // console.log("ResSymbol", SymbolRes)
  }, [])

  const getAtpCalculatorData = (data) => {
    return dispatch({
      type: 'ATP_CALCULATOR_DATA',
      payload: data
    })
  }

  const getOrderTypeData = (data) => {
    return dispatch({
      type: 'Order_Type_DATA',
      payload: data
    })
  }

  const getMultiScriptTokens = (tokens) => {
    return dispatch({
      type: 'MULTISCRIPT_GET_ToKENS',
      payload: tokens
    })

  }
  const getMultiScriptTokensData = (tokens) => {
    return dispatch({
      type: 'MULTISCRIPT_DATA',
      payload: tokens
    })

  }

  const getOptionDatacontext = (respo)=>{
    return  dispatch({
      type: 'OPTION_DATA',
      payload: respo
    })
  }


  const getOptionIndexData = (respo)=>{
    return  dispatch({
      type: 'OPTION_INDEX',
      payload: respo
    })
  }

  // useEffect(() => {
  //   const timer = setTimeout(() => setLoaded(true), 1000);
  //   return () => clearTimeout(timer);
  // }, []);




  return (
    <>
      {/* <Preloader show={loaded ? false : true} /> */}

      <Sidebar />

      <main className="content">
        {/* <Navbar /> */}
        <Context.Provider value={{ ...state, getMultiScriptTokens, getMultiScriptTokensData, getAtpCalculatorData, getOrderTypeData ,getOptionDatacontext ,getOptionIndexData }}>
          {props.component}
        </Context.Provider>

        <Footer />
      </main>
      {showAlert &&
        <AlertToast
          hideAlert={onAlertClose}
          showAlert={showAlert}
          message={textAlert}
          alertColor={alertColor}
        />
      }
    </>

  );
};

export default () => (
  <>
    <Switch >

      <Route exact path={Routes.AtpCalculator.path} element={<RouteWithSidebar component={<AtpCalculator />} />} />
      <Route exact path={Routes.AtpCalculatorTable.path} element={<RouteWithSidebar component={<AtpCalculatorTable />} />} />
      <Route exact path={Routes.OrderType.path} element={<RouteWithSidebar component={<OrderType />} />} />
      <Route exact path={Routes.OrederTypeTable.path} element={<RouteWithSidebar component={<OrderTypetable />} />} />
      <Route exact path={Routes.PendingOrders.path} element={<RouteWithSidebar component={<PendingOrders />} />} />
      <Route exact path={Routes.PendingOrderTable.path} element={<RouteWithSidebar component={<PendingOrderTable />} />} />
      <Route exact path={Routes.MultiScript.path} element={<RouteWithSidebar component={<MultiScript />} />} />
      <Route exact path={Routes.MultiScriptTable.path} element={<RouteWithSidebar component={<MultiScriptTable />} />} />
      <Route exact path={Routes.OptionData.path} element={<RouteWithSidebar component={<OptionData />} />} />
      <Route exact path={Routes.OptionIndexData.path} element={<RouteWithSidebar component={<OptionIndex />} />} />
      <Route exact path={Routes.MarketOpenTime.path} element={<RouteWithSidebar component={<MarketOpenTime />} />} />
      <Route exact path={Routes.MarketOpenTimeTable.path} element={<RouteWithSidebar component={<MarketOpenTimeTable />} />} />




      {/* <Tab.Container id="left-tabs-example" defaultActiveKey="AtpCalculator">

    <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="AtpCalculator">
                    <RouteWithSidebar component={<AtpCalculator />} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="OrderType">
                    <RouteWithSidebar component={<OrderType />} />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>

                </Tab.Container> */}



      {/* <Route path="*" to={Routes.NotFound.path} /> */}
    </Switch>

  </>
);
