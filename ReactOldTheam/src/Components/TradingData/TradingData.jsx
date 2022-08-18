
import React, {useState}from "react";
import DataTable , { createTheme } from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import ExportToExcel from '../../common/ExportToExcel';

const TradingData = (props) => {
 
const {
  tradingData,
  dataTrade,
  columns,
  backToForm
} = props
const fileName = "atpcalulator";

// console.log("trade",tradingData)

const [atpCalculatorData, setAtpCalculatorData] = useState(tradingData.data);
  // console.log("dataTable",atpCalculatorData)

createTheme('solarized', {
  text: {
    primary: '#268bd2',
    secondary: '#2aa198',
  },
  background: {
    default: '#002b36',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#073642',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
});

const paginationComponentOptions = {
  selectAllRowsItem: true,
  selectAllRowsItemText: 'ALL',
};

const customStyles = {
  headCells: {
    style: {
      width:'30px',
      background:'#000',
      color:'#fff',
      justifyContent: 'center',
      
    },
  },
  cells: {
    style: {
      justifyContent:'center',
      minWidth:'auto !important',
      
      
    },
  },
};

 // **************CSV Export **************
 
var JsonFields = ["SNo","TIME","ANP","BATP","SATP","ATP","CNBQ","CNSQ","NBQ","NSQ","TQ"]

function JsonToCSV(){
    var csvStr = JsonFields.join(",") + "\n";
    Object.values(dataTrade).forEach(airport => {
       
        csvStr += airport.SNO +  ',' + airport.Time + ',' + airport.ANP + ','  + airport.BATP + ',' + airport.SATP+ ',' +airport.ATP + ',' + airport.CNBQ + ',' + airport.CNSQ +  ',' + airport.NBQ +  ',' + airport.NSQ +  ',' +  airport.TQ +  "\n";
        })
        return csvStr;
}

// console.log("scd",JsonToCSV())
const csvStr1 = JsonToCSV()
function downloadCSV(csvStr) {
  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvStr);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'AtpCalculator.csv';
  hiddenElement.click(); 
}
  



  return (
    <>
    <div className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header order_type">
              <button onClick={() => backToForm()} className="export-btn back"> Back</button>
                <h4 className="card-title">Trading</h4>
              </div>
              <div className="card-body">
          
        <div className="row order-type-export"> 
      <div className="export-btn">
      <button  onClick={() =>downloadCSV(csvStr1)}>ExportToCSV</button>
      {/* <ExportToExcel apiData={Object.values(dataTrade)} fileName={fileName}/> */}
               
                  </div>
                  </div>
        <DataTable
          columns={columns}
          data={atpCalculatorData}
          // noHeader
          defaultSortField="id"
          defaultSortAsc={false}
          fixedHeader ={true}
          fixedHeaderScrollHeight= {'550px'}
          pagination
          highlightOnHover
          paginationComponentOptions={paginationComponentOptions}
          // theme="solarized"
          customStyles={customStyles}
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10,50,100]}
        />
      {/* </DataTableExtensions> */}
    </div>
    </div>
    </div>
    </div>
    </div>

</>
  );
};

export default TradingData;
