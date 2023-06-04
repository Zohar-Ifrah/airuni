import React from 'react';
import { useState } from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { stayService } from '../services/stay.service.local';


export function LabelsFilter() {
// eslint-disable-next-line
    const [items, setItems] = useState(stayService.getLabels());
    const [selected, setSelected] = useState([]);
    // const [position, setPosition] = useState(0);

    const isItemSelected = (id) => !!selected.find((el) => el === id);

    const handleClick =
        (id) =>
            ({ getItemById, scrollToItem }) => {
                const itemSelected = isItemSelected(id);

                setSelected((currentSelected) =>
                    itemSelected
                        ? currentSelected.filter((el) => el !== id)
                        : currentSelected.concat(id)
                );
            };

    return (
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {items.map((item) => (
                <Card
                    itemId={item.id} // NOTE: itemId is required for track items
                    title={item.title}
                    labelUrl={item.labelUrl}
                    key={item.id}
                    onClick={handleClick(item.id)}
                    selected={isItemSelected(item.id)}
                />
            ))}
        </ScrollMenu>
    );
}

function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } =
        React.useContext(VisibilityContext);

    return (
        <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
            {'<'}
        </Arrow>
    );
}

function RightArrow() {
    const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

    return (
        <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()} style={{ position: 'absolute' }}>
            {'>'}
        </Arrow>
    );
}

function Card({ onClick, selected, title, itemId, labelUrl }) {
    const visibility = React.useContext(VisibilityContext);

    return (
        <div
            onClick={() => onClick(visibility)}
            tabIndex={0}
        >
            <div className="card" >
                <img src={labelUrl} alt="title" />
                <div style={{ fontSize: '12px' }}>{title}</div>
            </div>
        </div>
    );
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
    );
}