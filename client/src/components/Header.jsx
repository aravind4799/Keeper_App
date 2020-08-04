import React from "react";
import {useHistory} from "react-router-dom";
import HighlightIcon from "@material-ui/icons/Highlight";

function Header() {
  const history = useHistory();
  const navigateTo = () => history.push('/');
  return (
    <header>
      <div className="icon">
      <HighlightIcon style={{ width:"100%",height:"auto"}}/>
      </div>
      <h1> Keeper App</h1>
      <button className="headerbutton"onClick={navigateTo} > Log out </button>
    </header>
  );
}


export default Header;
