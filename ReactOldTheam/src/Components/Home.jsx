import React from "react";
import OrderTypeForm from './Forms/OrderTypeForm';
import AtpCalculator from './Forms/AtpCalculator';
import PendingOrderForm from './Forms/PendingOrderForm';
import StreamDataForm from './Forms/StreamDataForm';
import OrderPositioningForm from './Forms/OrderPositioningForm';
import MarketOpenTime from './Forms/MarketOpenTime';
import MultiScriptScanner from './Forms/MultiScriptScanner';
import { Tabs, Tab } from 'react-bootstrap';


const Home = () => {



  return (
    <>
      <div className="tab-wrapper">
        <Tabs defaultActiveKey="AtpCalculator" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="AtpCalculator" title="AtpCalculator">
            <AtpCalculator />
          </Tab>
          <Tab eventKey="OrderType" title="OrderType">
            <OrderTypeForm />
          </Tab>
          <Tab eventKey="PendingOrder" title="PendingOrder">
            <PendingOrderForm />
          </Tab>
          <Tab eventKey="OrderPositioning" title="OrderPositioning">
            <OrderPositioningForm />
          </Tab>
          <Tab eventKey="StreamData" title="StreamData">
            <StreamDataForm />
          </Tab>
          <Tab eventKey="MarketOpenTime" title="MarketOpenTime">
            <MarketOpenTime />
          </Tab>
          <Tab eventKey="MultiScriptScanner" title="MultiScriptScanner">
            <MultiScriptScanner />
          </Tab>
        </Tabs></div>



    </>
  );
};

export default Home;
