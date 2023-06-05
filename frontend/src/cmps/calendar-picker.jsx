import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

export function CalendarPicker({ onSetDates }) {
  const [selectedDates, setSelectedDates] = useState([])

  function handleDayClick(date) {
    if (selectedDates.length === 0 || selectedDates.length === 2) {
      setSelectedDates([date])
    } else if (selectedDates.length === 1 && date > selectedDates[0]) {
      setSelectedDates([...selectedDates, date])
      const startDate = selectedDates[0].getTime() // Convert to timestamp
      const endDate = date.getTime() // Convert to timestamp
      onSetDates(startDate, endDate)
    } else {
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