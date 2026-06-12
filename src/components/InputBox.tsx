import React from "react"

interface InputBoxProps{
    amountRef : React.RefObject<HTMLInputElement|null>
}
export function InputBox(props : InputBoxProps){
    // eslint-disable-next-line react-hooks/refs
    return <input ref={props.amountRef} type="text" placeholder="Amount" />
}