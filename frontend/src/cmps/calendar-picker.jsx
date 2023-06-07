import { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import '../assets/styles/cmps/_CalendarPicker.scss';

export function CalendarPicker({ onSetDates, onCheckInClick, calAmount = 2 }) {
  const [selectedDates, setSelectedDates] = useState([])
  const [isCheckInClicked, setIsCheckInClicked] = useState(false)

  useEffect(() => {
    onCheckInClick(isCheckInClicked)
    // eslint-disable-next-line
  }, [isCheckInClicked])

  function handleDayClick(date) {
    if (selectedDates.length === 0 || selectedDates.length === 2) {
      setSelectedDates([date])
      setIsCheckInClicked(true)


    } else if (selectedDates.length === 1 && date > selectedDates[0]) {
      setIsCheckInClicked(false)
      setSelectedDates([...selectedDates, date])
      const startDate = selectedDates[0].getTime() // Convert to timestamp
      const endDate = date.getTime() // Convert to timestamp
      onSetDates(startDate, endDate)
    } else {
      setIsCheckInClicked(true)

      setSelectedDates([date])
    }
  }

  return (
    <div className='calendar-picker-header'>
      <DayPicker
        selected={selectedDates}
        onDayClick={handleDayClick}
        numberOfMonths={calAmount}
        modifiers={{
          start: selectedDates[0],
          end: selectedDates[1],
      
        }}
        disabledDays={{ before: new Date() }}
      />
    </div>
  )
}