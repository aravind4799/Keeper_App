import React, { useState,useEffect} from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import axios from "axios";
import Note from "./Note";


function CreateArea(props) {

  const [user_notes, setdetails] = useState([]);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [state, setstate] = useState(false);

  const getdata = () => {
    axios.get("http://localhost:3010/getuserdetails",{params:{username:props.username}})

    .then((response) => {
         console.log(response.data )
         setdetails(response.data)
        
    })
    .catch((response)=> (console.log(response)))
  }
  
  useEffect(()=>{
    getdata()
  },[])
 
  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prev_value => {
      return({
        ...prev_value,
        [name]:value
      })
    } )

   
  }


   const submitNote = (e) => {
    e.preventDefault();
    axios({
      url: 'http://localhost:3010/save',
      method: 'POST',
      data: {
        username:props.username,
        newnote:note    
      }
    }).then(response => {
      if(response.data.saved){
        setNote({
          title:"",
          content:""
        })
        getdata();
      }
    })
  };

  function deleteNote(title,content) {
    axios({
      url:"http://localhost:3010/delete",
      method:'POST',
      data:{
        username:props.username,
        title:title,
        content:content
      }
    }).then(response => {
      if(response.data.deleted){
        getdata();
      }
    })
    
  }

  function handle_text_click() {
    setstate(true);
  }

  return (
    <div className="div-form" >
      <form className="create-note" >
        {state && (
          <input
            
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          
          name="content"
          onClick={handle_text_click}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={state ? "3" : "1"}
        />

        <Zoom in={state}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>

      { user_notes.map((noteItem, index) => {
        return (
           < Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      }) }
    </div>

    
  );
}

export default CreateArea;
