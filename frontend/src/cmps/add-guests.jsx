import { hr } from "date-fns/locale"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export function AddGuests({ onUpdateCapacity, maxCapacity = 16, onOpenGuestsModal, isFromOrderForm = false, capacity }) {
    // const [capacity, setCapacity] = useState({ adults: 0, children: 0, infants: 0, pets: 0 })
    const isDetailsShown = useSelector(storeState => storeState.systemModule.isDetailsShown)
    // const [disableBtn, setDisableBtn] = useState(false)


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
                if (totValue > maxCapacity - 1) return

            }
        }

        // minimum limit
        if (newValue <= 0) {
            newValue = 0
        }

        onUpdateCapacity({ ...capacity, [type]: newValue })
    }



    return (
        <section className='add-guests-cmp-header'>

            <div className="guest-select-row">
                <p>Adults <span>Ages 13 or above</span></p>
                <div className="guest-count-container">
                    <button className={!capacity.adults ? 'blank' : ''} onClick={(ev) => { ev.preventDefault(); onChange('-', 'adults') }} >-</button>
                    <span> {capacity.adults} </span>
                    <button onClick={(ev) => { ev.preventDefault(); onChange('+', 'adults') }} >+</button>
                </div>
            </div>
            {!isFromOrderForm && <hr />}
            <div className="guest-select-row">
                <p>Children <span>Ages 2-12</span></p>
                <div className="guest-count-container">
                    <button className={!capacity.children ? 'blank' : ''} onClick={(ev) => { ev.preventDefault(); onChange('-', 'children') }} >-</button>
                    <span> {capacity.children} </span>
                    <button onClick={(ev) => { ev.preventDefault(); onChange('+', 'children') }} >+</button>
                </div>
            </div>
            {!isFromOrderForm && <hr />}
            <div className="guest-select-row">
                <p>Infants <span>Under 2</span></p>
                <div className="guest-count-container">
                    <button className={!capacity.infants ? 'blank' : ''} onClick={(ev) => { ev.preventDefault(); onChange('-', 'infants') }} disabled={capacity.infants <= 0}>-</button>
                    <span> {capacity.infants} </span>
                    <button onClick={(ev) => { ev.preventDefault(); onChange('+', 'infants') }} disabled={capacity.infants >= 5}>+</button>
                </div>
            </div>
            {!isFromOrderForm && <hr />}
            <div className="guest-select-row">
                <p>Pets <span>Bringing a service animal?</span></p>
                <div className="guest-count-container">
                    <button className={!capacity.pets ? 'blank' : ''} onClick={(ev) => { ev.preventDefault(); onChange('-', 'pets') }} disabled={capacity.pets <= 0}>-</button>
                    <span> {capacity.pets} </span>
                    <button onClick={(ev) => { ev.preventDefault(); onChange('+', 'pets') }} disabled={capacity.pets >= 5}>+</button>
                </div>
            </div>
            {isDetailsShown && isFromOrderForm &&
                <div>
                    <div>
                        <p>This place has a maximum of {maxCapacity + ` ${maxCapacity > 1 ? 'guests' : 'guest'}`} , not including infants.</p>
                    </div>
                    <div>
                        <button className="btn-close" onClick={onOpenGuestsModal}> Close </button>
                    </div>
                </div>}
        </section>
    )
}