import { useEffect, useState } from "react"

export function AddGuests({ onUpdateCapacity }) {
    const [capacity, setCapacity] = useState({ adults: 0, children: 0, infants: 0, pets: 0 })
    // const [disableBtn, setDisableBtn] = useState(false)

    useEffect(() => {
        onUpdateCapacity({ capacity })
        // eslint-disable-next-line
    }, [capacity])
    function onChange(symbol, type) {
        let newValue = capacity[type]
        let totValue = newValue

        if (symbol === '+') newValue += 1
        else newValue -= 1


        // limitations for "+"
        if (symbol === '+') {

            if ((type === 'adults' || type === 'children')) {
                if (type === 'adults') totValue += capacity.children
                else totValue += capacity.adults

                // Combined count of adults and children exceeds 16, do not update state
                if (totValue > 15) return

                // } else if (type === 'infants' && newValue > 5) {
                //     // Infants count exceeds 5, do not update state
                //     return
                // } else if (type === 'pets' && newValue > 5) {
                //     // Pets count exceeds 5, do not update state
                //     return
            }
        }

        // minimum limit
        if (newValue < 0) {
            newValue = 0
        }

        setCapacity({
            ...capacity,
            [type]: newValue
        })
    }

    return (
        <section className='add-guests-cmp-header'>
            <div className="guest-select-row">
                <p>Adults <span>Ages 13 or above</span></p>
                <div className="guest-count-container">
                    <button onClick={() => onChange('-', 'adults')} >-</button>
                    {capacity.adults}
                    <button onClick={() => onChange('+', 'adults')}>+</button>
                </div>
            </div>
            <div className="guest-select-row">
                <p>Children <span>Ages 2-12</span></p>
                <div className="guest-count-container">
                    <button onClick={() => onChange('-', 'children')} >-</button>
                    {capacity.children}
                    <button onClick={() => onChange('+', 'children')}>+</button>
                </div>
            </div>
            <div className="guest-select-row">
                <p>Infants <span>Under 2</span></p>
                <div className="guest-count-container">
                    <button onClick={() => onChange('-', 'infants')} disabled={capacity.infants <= 0}>-</button>
                    {capacity.infants}
                    <button onClick={() => onChange('+', 'infants')} disabled={capacity.infants >= 5}>+</button>
                </div>
            </div>
            <div className="guest-select-row">
                <p>Pets <span>Bringing a service animal?</span></p>
                <div className="guest-count-container">
                    <button onClick={() => onChange('-', 'pets')} disabled={capacity.pets <= 0}>-</button>
                    {capacity.pets}
                    <button onClick={() => onChange('+', 'pets')} disabled={capacity.pets >= 5}>+</button>
                </div>
            </div>
        </section>
    )
}