import React from "react";

export default function Input(props){
    return(
        <input placeholder={props.placeholder} type={props.type} onChange={props.func}
            name={props.name} value={props.value}
        />
    );

}
