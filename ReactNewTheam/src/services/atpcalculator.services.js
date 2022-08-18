import axios from 'axios';
const base_url1 = process.env.REACT_APP_BASE_URL;
const base_url = "http://192.168.100.22:9010/";




// console.log("base_url1",base_url1)

// Atp Calculator Data

export function getAtpCalculatorData(data, setLoader, setShowAlert, setTextAlert, setAlertColor) {
    const header = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    return axios.post(`${base_url}atpcalculator`, data, { headers: header }).then(res => {
        return Object.values(res.data)
    }).catch(err => {
        setLoader(false)
        setShowAlert(true)
        setTextAlert("AtpCalculater Api Network Err")
        setAlertColor("error")
        console.log("AtpCalculater Api Err", err)
    })
}

// Pending Orders Data

export function getPendingOrderData(data, setLoader, setShowAlert, setTextAlert, setAlertColor) {
    const header = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    return axios.post(`${base_url}pendingorder`, data, { headers: header }).then(res => {
        return Object.values(res.data)
    }).catch(err => {
        setLoader(false)
        setShowAlert(true)
        setTextAlert("PendingOrder Api Network Err")
        setAlertColor("error")
        console.log("PendingOrder Api Err", err)
    })
}

//Pending Orders Counts Data

export function getPendingOrderSummary(setLoader, setShowAlert, setTextAlert, setAlertColor) {
    const header = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    return axios.get(`${base_url}pendingsummary`, { headers: header }).then(res => {
        return res.data
    })
        .catch(err => {
            setLoader(false)
            setShowAlert(true)
            setTextAlert("PendingOrderSummary Api Network Err")
            setAlertColor("error")
            console.log("PendingOrderSummary Api Err", err)
        })
}


//Orders Type Data

export function getOrderTypeData(data, setLoader, setShowAlert, setTextAlert, setAlertColor) {
    const header = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    return axios.post(`${base_url}ordertype`, data, { headers: header }).then(res => {
        return Object.values(res.data)
    })
        .catch(err => {
            setLoader(false)
            setShowAlert(true)
            setTextAlert("OrdersTypeData Api Network Err")
            setAlertColor("error")
            console.log("OrdersTypeData Api Err", err)
        })
}

//MultiScript Data Get

export function getMultiSciptTokenList(setLoaded, setShowAlert, setTextAlert, setAlertColor) {
    const header = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    return axios.get(`${base_url}tokenlist`, { headers: header }).then(res => {
        return Object.values(res.data)
    })
        .catch(err => {
            setLoaded(false)
            setShowAlert(true)
            setTextAlert("MultiSciptTokenList Api Network Err")
            setAlertColor("error")
            console.log("MultiSciptTokenList Api Err", err)
        })
}


//MultiScript Type Data

export function getMultiScriptData(data, setLoadedOnSend, setShowAlert, setTextAlert, setAlertColor) {
    const header = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    return axios.post(`${base_url}multiscript`, data, { headers: header }).then(res => {
        return res.data
    })
        .catch(err => {
            setLoadedOnSend(false)
            setShowAlert(true)
            setTextAlert("MultiSciptData Api Network Err")
            setAlertColor("error")
            console.log("MultiSciptData Api Err", err)
        })
}

// SymbolList 
export function getSymbolList(setShowAlert, setTextAlert, setAlertColor) {
    const header = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    return axios.get(`${base_url}symlist`, { headers: header }).then(res => {
        return Object.values(res.data)
    })
        .catch(err => {
            setShowAlert(true)
            setTextAlert("SymbolList Api Network Err")
            setAlertColor("error")
            console.log("SymbolList Api Err", err)
        })
}


// OptionData
export function getOptionData(setShowAlert, setTextAlert, setAlertColor) {
    const header = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    return axios.get(`${base_url}optionmerdata`, { headers: header }).then(res => {
        return Object.values(res.data)
    })
        .catch(err => {
            setShowAlert(true)
            setTextAlert("Optiondata Api Network Err")
            setAlertColor("error")
            console.log("Optiondata Api Err", err)
        })
}

// OptionData
export function getOptionPerCentageData(setShowAlert, setTextAlert, setAlertColor) {
    const header = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    return axios.get(`${base_url}optionperdata`, { headers: header }).then(res => {
        return Object.values(res.data)
    })
        .catch(err => {
            setShowAlert(true)
            setTextAlert("optionperdata Api Network Err")
            setAlertColor("error")
            console.log("optionperdata Api Err", err)
        })
}

// OptionIndexData
export function getOptionIndexPerCentData(setShowAlert, setTextAlert, setAlertColor) {
    const header = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    return axios.get(`${base_url}optionidxdata`, { headers: header }).then(res => {
        return Object.values(res.data)
    })
        .catch(err => {
            setShowAlert(true)
            setTextAlert("OptionIndexPerData Api Network Err")
            setAlertColor("error")
            console.log("optionIndexperdata Api Err", err)
        })
}



//MarkletOpenData

export function getMarketOpenData(data,
    // setLoadedOnSend,
     setShowAlert, setTextAlert, setAlertColor) {
    const header = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    return axios.post(`${base_url}premarketorder`, data, { headers: header }).then(res => {
        return res.data
    })
        .catch(err => {
            // setLoadedOnSend(false)
            setShowAlert(true)
            setTextAlert("MarkletOpenData Api Network Err")
            setAlertColor("error")
            console.log("MarkletOpenData Api Err", err)
        })
}


