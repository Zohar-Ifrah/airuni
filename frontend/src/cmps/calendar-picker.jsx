import { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
// import '../assets/styles/cmps/_CalendarPicker.scss'
import { addDays } from 'date-fns'

// import { addDays, format } from 'date-fns'

export function CalendarPicker({ onSetDates, onCheckInClick, calAmount = 2, checkIn, checkOut }) {

  const [isCheckInClicked, setIsCheckInClicked] = useState(false)
  const pastMonth = new Date(2023, 5, 13)
  const [range, setRange] = useState({
    from: checkIn,
    to: checkOut
  })

  useEffect(() => {
    onCheckInClick(isCheckInClicked)
    // eslint-disable-next-line
  }, [isCheckInClicked])

  function handleDayClick(date) {
    if (!range.from || range.to) {
      console.log('first if')

      setIsCheckInClicked(true)
      setRange({ from: date, to: null })

    } else if (date > range.from) {  //Both
      setRange({ ...range, to: date })
      console.log('Both')
      setIsCheckInClicked(false)


      const startDate = range.from.getTime() // Convert to timestamp
      const endDate = date.getTime() // Convert to timestamp
      onSetDates(startDate, endDate)
    } else {
      console.log('else')

      setRange({ from: date, to: null })
      setIsCheckInClicked(false)
    }
  }

  const css = `
  .selected:not(.DayPicker-Day--outside) {
    background-color: black;
    color: white;
  }
  
  .DayPicker-Day--selected:not(.DayPicker-Day--outside) + .DayPicker-Day:not(.DayPicker-Day--selected):not(.DayPicker-Day--disabled) {
    background-color: grey;
  }
  `

  return (
    <div className='calendar-picker-header'>
      <style>{css}</style>
      <DayPicker
        selected={range}
        mode="range"
        onDayClick={handleDayClick}
        numberOfMonths={calAmount}
        disabledDays={{ before: new Date() }}
        modifiersClassNames={{
          selected: 'selected',
        }}
      />
    </div>
  )
}