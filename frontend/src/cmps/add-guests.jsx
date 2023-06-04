
export function AddGuests({ filterByToEdit, handleChange }) {

    return (
        <section className='add-guests-cmp-header'>
            <div>
                <p>Adults <span>Ages 13 or above</span></p>
                <div>{false && <button>-</button>} {filterByToEdit.adults} <button>+</button></div>
            </div>
            <div>
                <p>Children <span>Ages 2-12</span></p>
                <div>{false && <button>-</button>} 0 <button>+</button></div>
            </div>
            <div>
                <p>Infants <span>Under 2</span></p>
                <div>{false && <button>-</button>} 0 <button>+</button></div>
            </div>
            <div>
                <p>Pets <span> Bringing a service animal?</span></p>
                <div>{false && <button>-</button>} 0 <button>+</button></div>
            </div>
        </section>
    )
}
