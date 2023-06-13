import { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import '../assets/styles/cmps/_CalendarPicker.scss'
import { addDays } from 'date-fns'

// import { addDays, format } from 'date-fns'

export function CalendarPicker({ onSetDates, onCheckInClick, calAmount = 2 }) {
  const [selectedDates, setSelectedDates] = useState([])
  const [isCheckInClicked, setIsCheckInClicked] = useState(false)
  const pastMonth = new Date(2023, 5, 13)
  const [range, setRange] = useState({
    from: pastMonth,
    to: addDays(pastMonth, 4)
  })

  useEffect(() => {
    onCheckInClick(isCheckInClicked)
    // eslint-disable-next-line
  }, [isCheckInClicked])

  function handleDayClick(date) {
    if (!range.from || range.to) {
      console.log('first if')

      setRange({ from: date, to: null })
      onCheckInClick(false)
    } else if (date > range.from) {  //Both
      setRange({ ...range, to: date })
      console.log('Both')

      setSelectedDates([date])
      setIsCheckInClicked(true)

      const startDate = range.from.getTime() // Convert to timestamp
      const endDate = date.getTime() // Convert to timestamp
      onSetDates(startDate, endDate)
    } else {
      console.log('else')

      setRange({ from: date, to: null })
      onCheckInClick(false);
    }
  }

  // function handleDayClick(date) {
  //   if (selectedDates.length === 0 || selectedDates.length === 2) {
  //     setSelectedDates([date])
  //     setIsCheckInClicked(true)


  //   } else if (selectedDates.length === 1 && date > selectedDates[0]) {
  //     // setIsCheckInClicked(false)
  //     setSelectedDates([...selectedDates, date])
  //     const startDate = selectedDates[0].getTime() // Convert to timestamp
  //     const endDate = date.getTime() // Convert to timestamp
  //     onSetDates(startDate, endDate)
  //   } else {
  //     // setIsCheckInClicked(false)

  //     setSelectedDates([date])
  //   }
  // }

  return (
    <div className='calendar-picker-header'>
      {console.log({ before: new Date() })}
      <DayPicker
        selected={range}
        mode="range"
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