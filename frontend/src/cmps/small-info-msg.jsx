export function SmallInfoMsg({ message }) {

    function toggleMsg() {
        console.log('closed')
    }

    return (
        <div className="small-info-msg-container">
            {/* TODO: change 'x' to svg + active close btn */}
            <button onClick={() => toggleMsg()} className="close-btn">x</button> 
            <p>{message}</p>
        </div>
    )
}