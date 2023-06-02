import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

export function CalendarPicker() {
  return (
    <div className='calendar-picker-header'>
      <DayPicker numberOfMonths={2} />
    </div>
  )
}

// import React, { useState, useRef } from 'react';
// import { addDays, format } from 'date-fns';
// // import { DateRangePicker } from 'react-date-range';
// // import 'react-date-range/dist/styles.css'; // Import the styles
// // import 'react-date-range/dist/theme/default.css'; // Import the theme

// export function CalendarPicker() {
//   const [selectionRange, setSelectionRange] = useState({
//     startDate: new Date(),
//     endDate: addDays(new Date(), 1),
//     key: 'selection',
//   });

//   const checkInRef = useRef(null);
//   const checkOutRef = useRef(null);

//   const handleSelect = (ranges) => {
//     setSelectionRange(ranges.selection);
//   };

//   const handleCheckInClick = () => {
//     checkInRef.current.focus();
//   };

//   const handleCheckOutClick = () => {
//     checkOutRef.current.focus();
//   };

//   return (
//     <div>
//       <div>
//         <button onClick={handleCheckInClick}>Check-in</button>
//         <input
//           ref={checkInRef}
//           type="text"
//           value={format(selectionRange.startDate, 'dd/MM/yyyy')}
//           readOnly
//         />
//       </div>
//       <div>
//         <button onClick={handleCheckOutClick}>Check-out</button>
//         <input
//           ref={checkOutRef}
//           type="text"
//           value={format(selectionRange.endDate, 'dd/MM/yyyy')}
//           readOnly
//         />
//       </div>
//       {/* <DateRangePicker
//         ranges={[selectionRange]}
//         onChange={handleSelect} */}
//       {/* /> */}
//     </div>
//   );
// }







