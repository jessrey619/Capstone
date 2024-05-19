// import React from 'react'

// function Card({ card }) {
//   return (
//     <div className='col-xxl-4 col-md-6'>
//         <div className='card info-card sales-card'>
//             <CardFilter filterChange={handleFilterCahgne} />
//             <div className='card-body'>
//                 <h5 className='card-title'>
//                     {card.name} <span>{filter}</span>
//                 </h5>

//                 <div className='d-flex align-items-center'>
//                     <div className='card-icon rounded-circle d-flex align-items-center justify-content-center'>
//                         <i className={card.icon}></i>
//                     </div>
//                     <div className='ps-3'>
//                         <h6>
//                             {card.name === 'Total Vehicles'
//                                 ? '$' + card.amount.toLocaleString('en-US')
//                                 : card.amount.toLocaleString('en-US')
//                             }
//                         </h6>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     </div>>
//   )
// }

// export default Card