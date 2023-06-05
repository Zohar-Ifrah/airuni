import React, { useEffect } from 'react'
import { useState } from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import 'react-horizontal-scrolling-menu/dist/styles.css'
import { stayService } from '../services/stay.service.local'


export function LabelsFilter({ onSetFilter }) {
    // eslint-disable-next-line
    const [items, setItems] = useState(stayService.getLabels())
    const [filterByToEdit, setFilterByToEdit] = useState(stayService.getDefaultFilter())
    const [activeLabel, setActiveLabel] = useState(null)

    useEffect(() => {
        onSetFilter(filterByToEdit)

        // eslint-disable-next-line
    }, [filterByToEdit])


    function handleClick(id) {
        // console.log(id)
        // console.log(items)
        const label = items.filter(item => item.id === id)[0]
        // console.log(label.title)
        setFilterByToEdit({
            ...filterByToEdit,
            label: label.title
        })
        setActiveLabel(id)
    }

    function LeftArrow() {
        const { isFirstItemVisible, scrollPrev } =
            React.useContext(VisibilityContext)

        return (
            <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
                <img src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685990897/arrow-left-bold_veibjr.svg" alt="left-arrow" />
            </Arrow>
        )
    }

    function RightArrow() {
        const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext)

        return (
            <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()} style={{ position: 'absolute' }}>
                <img src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685990897/arrow-right-bold_flbszq.svg" alt="right-arrow" />
            </Arrow>
        )
    }

    function Card({ onClick, selected, title, itemId, labelUrl }) {
        const visibility = React.useContext(VisibilityContext)

        return (
            <div
                onClick={() => onClick(visibility)}
                tabIndex={0}
            >
                <div className={`card ${activeLabel === itemId ? 'active' : ''}`}  >
                    <img src={labelUrl} alt="title" />
                    <div style={{ fontSize: '12px' }}>{title}</div>
                </div>
            </div>
        )
    }

    function Arrow({ children, disabled, onClick }) {
        return (
            <button
                disabled={disabled}
                onClick={onClick}
                style={{
                    opacity: disabled ? "0" : "1",
                }}
            >
                {children}
            </button>
        )
    }

    return (
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {items.map((item) => (
                <Card
                    itemId={item.id}
                    title={item.title}
                    labelUrl={item.url}
                    key={item.id}
                    onClick={() => { handleClick(item.id) }}
                />
            ))}
        </ScrollMenu>
    )
}