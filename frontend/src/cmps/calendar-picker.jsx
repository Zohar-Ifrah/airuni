import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

export function CalendarPicker({ onSetDates }) {
  const [selectedDates, setSelectedDates] = useState([])

  function handleDayClick(date) {
    if (selectedDates.length === 0 || selectedDates.length === 2) {
      // If no dates are selected or both dates are already selected, set the first date and clear the selection
      setSelectedDates([date])
    } else if (selectedDates.length === 1 && date > selectedDates[0]) {
      // If the first date is already selected and the clicked date is greater, set it as the second date
      setSelectedDates([...selectedDates, date])
      onSetDates(selectedDates[0], date) // Pass the selected dates to the parent component or perform any desired action
    } else {
      // If the first date is already selected and the clicked date is smaller, update the selection to the new check-in date
      setSelectedDates([date])
    }
  }

  return (
    <div className='calendar-picker-header'>
      <DayPicker
        selected={selectedDates}
        onDayClick={handleDayClick}
        numberOfMonths={2}
        modifiers={{
          start: selectedDates[0],
          end: selectedDates[1],
        }}
        disabledDays={{ before: new Date() }}
      />
    </div>
  )
}