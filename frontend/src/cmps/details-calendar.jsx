import { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"


export function DetailsCalendar() {
    const [selectedDate, setSelectedDate] = useState(new Date())
    return (
        <Calendar
        value={selectedDate}
        onChange={(date) => setSelectedDate(date)}
    />
    )
}