// import DatePicker from "react-datepicker";
// import React from "react";
// import { AiFillDelete } from "react-icons/ai";
// import { TiTick } from "react-icons/ti";

// function TableRows({ rowsData, deleteTableRows, handleChange }) {
//   const disablePastDate = () => {
//     // const today = new Date();
//     // const dd = String(today.getDate()).padStart(2, "0");
//     // const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
//     // const yyyy = today.getFullYear();
//     // console.log("Today", today, "date", dd, "month", mm, "year", yyyy);
//     // return yyyy + "-" + mm + "-" + dd;
//   };

//   return rowsData.map((data, index) => {
//     const { fullName, date, salary } = data;
//     return (
//       <tr key={index}>
//         <td>
//           <input
//             type='text'
//             value={fullName}
//             onChange={(evnt) => handleChange(index, evnt)}
//             name='fullName'
//             className='form-control'
//           />
//         </td>
//         <td>
//           <input
//             type='date'
//             value={date}
//             onChange={(evnt) => handleChange(index, evnt)}
//             name='date'
//             className='form-control'
//             min={disablePastDate()}
//           />
//         </td>
//         <td className='text-center'>
//           <input
//             type='checkbox'
//             value={salary}
//             onChange={(evnt) => handleChange(index, evnt)}
//             name='salary'
//             className='form-check-input '
//           />
//         </td>
//         <td>
//           <button
//             className='btn btn-outline-danger'
//             onClick={() => deleteTableRows(index)}>
//             <AiFillDelete />
//           </button>
//         </td>
//         <td>
//           <button className='btn btn-outline-success' onClick={() => index}>
//             <TiTick />
//           </button>
//         </td>
//       </tr>
//     );
//   });
// }

// export default TableRows;
