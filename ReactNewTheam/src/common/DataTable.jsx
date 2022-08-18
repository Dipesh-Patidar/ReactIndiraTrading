import React from 'react';
import DataTable from "react-data-table-component";


export default  (props) =>{
    const {
      columns ,
      data,
      progressPending
    ,
    conditionalRowStyles
  } = props

    const paginationComponentOptions = {
        selectAllRowsItem: true,
        selectAllRowsItemText: 'ALL',
      };
    
      const customStyles = {
        headCells: {
          style: {
            width: '30px',
            background: '#000',
            color: '#fff',
            justifyContent: 'center',
    
          },
        },
        cells: {
          style: {
            justifyContent: 'center',
            minWidth: 'auto !important',
    
    
          },
        },
      };
      
return(
    <>
      <DataTable
                              columns={columns}
                              data={data}
                              // noHeader
                              defaultSortField="id"
                              defaultSortAsc={false}
                              progressPending={progressPending}
                              pagination
                              highlightOnHover
                              fixedHeader={true}
                              fixedHeaderScrollHeight={'550px'}
                              paginationComponentOptions={paginationComponentOptions}
                              paginationRowsPerPageOptions={[10, 50, 100]}
                              customStyles={customStyles}
                              conditionalRowStyles={conditionalRowStyles}

                            />
    </>
)
}