import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../Home';
import CommonTamplate from '../CommonTamplate';
// import TradingData  from '../TradingData/TradingData';


const Router = () => {
    return (
        <>
             <BrowserRouter>
 <Routes>
 {/* <Route exact path="/">
            <Navigate to="/home" />
        </Route> */}
        <Route path="/" element={<CommonTamplate page={<Home/>} />}></Route>
        {/* <Route path="/atpcalculator" element={<CommonTamplate page={<TradingData/>} />}></Route> */}

 </Routes>
             </BrowserRouter>
        </>
    );
}

export default Router;
