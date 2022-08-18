import React,{useState,useEffect} from 'react';
import {Table} from 'react-bootstrap';


const OrderPositioningSummary = (props) =>{
    const {
        positionSummaryData
    } = props
    var [orderDetailsProp, setOrderDetailsProp] = useState("");
    var [lastOrderDetails,setLastOrderDetails] = useState("");
const [pendingOders,setPendingOrders] = useState(0);
const [SloOrders, setSloOrders] =useState(0)




  if(orderDetailsProp){
    console.log("Ladr11",orderDetailsProp) 

    // var StartArray = orderDetailsProp.slice(0,orderDetailsProp.length-1)
      var penTotalNq =  orderDetailsProp.map((item)=>{
          return item.TotalNQ
         })
         const sumTotalNq = penTotalNq.reduce((a, b) => a + b, 0)
         console.log("penTQuantity",penTotalNq)


         const penTQuantity = orderDetailsProp.map((item)=>{
           return item.TQuantity
          })
          const sumTQuantity = penTQuantity.reduce((a, b) => a + b, 0)
          console.log("penTQuantity",penTQuantity)
         
          const calcPendingOrder = sumTotalNq-sumTQuantity
          console.log("calcPendingOrder",calcPendingOrder)
        //  setPendingOrders(sumTotalNq-sumTQuantity) 
         
         const sloOrdersvalues = orderDetailsProp.filter((item)=>{
           if(item.ordern === "SLO"){
         return item
           }
         })
        //  setSloOrders(sloOrdersvalues && sloOrdersvalues.length)
         console.log("sloOrdersvalues",sloOrdersvalues) 
  }

  // console.log("Ladr",positionSummaryData,"length",positionSummaryData && positionSummaryData.length) 


useEffect(()=>{

  if(positionSummaryData !== undefined){

    setOrderDetailsProp(positionSummaryData.slice(0,positionSummaryData.length-1))
    setLastOrderDetails(positionSummaryData.slice(-1))
    }
},[positionSummaryData])

return(
  <>
  {/* { orderDetailsProp !== "" &&  */}
  <div >
  <h3>Orders Position</h3>

 

  </div>
{/* } */}
  </>  
)
}
export default OrderPositioningSummary;