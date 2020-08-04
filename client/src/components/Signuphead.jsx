import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";


export default function Signuphead(){
    return( 
        <div className="signuphead" >
          <h1> keeper app  </h1>
          <div className="center">
          <HighlightIcon style={{width:"60%",height:"auto"}} />
          <h3> we KEEP your notes </h3>
          <h6> never miss a Task! </h6>
          </div>
        </div>
     );
}