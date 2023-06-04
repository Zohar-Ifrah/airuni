import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

export function CalendarPicker({ onSelectDate }) {
  const [selectedDate, setSelectedDate] = useState(null)

  function handleDayClick(date) {
    setSelectedDate(date)
    console.log(selectedDate)
    onSelectDate(date) // Pass the selected date to the parent component or perform any desired action
  }

  return (
    <div className='calendar-picker-header'>
      <DayPicker
        selected={selectedDate}
        onDayClick={handleDayClick}
        numberOfMonths={2}
      />
    </div>
  )
}