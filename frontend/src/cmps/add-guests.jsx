
export function AddGuests({ filterByToEdit, handleChange }) {

    return (
        <section className='add-guests-cmp-header'>
            <div>
                <p>Adults <span>Ages 13 or above</span></p>
                <div>{false && <button>-</button>} 0 <button>+</button></div>
            </div>
            <div>
                <p>Infants <span>Ages 2–12</span></p>
                <div>{false && <button>-</button>} 0 <button>+</button></div>
            </div>
            <div>
                <p>Pets <span> <a href="">Bringing a service animal?</a></span></p>
                <div>{false && <button>-</button>} 0 <button>+</button></div>
            </div>
        </section>
    )
}
