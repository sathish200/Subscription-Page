import React from 'react'
interface ButtonProps {
riconcomponent?: React.JSX.Element
className?:string,
title?:string,
label?:string,
icon?:string,
ricon?:any
disabled?:boolean
iconcomponent?: React.JSX.Element
onClick?:() => void
type?:"button" | "submit" | "reset" 
}
const Button = (props:ButtonProps) => {
  return (
    <>
     <button className={`${props?.className === undefined ? 'pw-ui-btn' : `pw-ui-btn ${props?.className}`}`} type={props?.type ? props?.type : 'button'} title={props?.title ? props?.title : props?.label} aria-label={props?.label} disabled={props?.disabled} onClick={props?.onClick}> {props?.icon && <span className={props?.icon}></span>} { props?.iconcomponent && <span>{props?.iconcomponent}</span>} {props.label} {props?.ricon && <span className={props?.ricon}></span>} {props?.riconcomponent && <span>{props?.riconcomponent}</span>}</button>
    </>
  )
} 

export default Button