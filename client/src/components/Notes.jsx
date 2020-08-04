import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";

function Notes(props) {


  

  return (
    <div>
      <Header />
      <h2 className="greet"> welcome {props.user_details.username} </h2>
      <CreateArea username={props.user_details.username} />
      <Footer />
    </div>
  );
}

export default Notes;
