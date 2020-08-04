import React,{useState,useEffect} from "react";
import Input from "./Input";
import {useHistory} from "react-router-dom";
import axios from "axios";

export default function Login(props){

    // const get_data_from_db = () => {
    //     axios({url:"/getdata",method:"GET",})
    //     .then((response)=> {
    //         change_details(prev_value => {
    //             return({
    //                 ...prev_value,
    //                 data_from_db:response.data
    //             })
    //         })
    //        })
    //     .catch((err)=>(console.log(err)));
    // }

    const initialstate = {
        username:"",
        password:"",
        confirm_password:"",
        username_error:"",
        password_error:"",
        confirm_password_error:"",
        data_from_db:[]
    }

    //to keep track of user_inputs
    const [user_details,change_details] = useState(initialstate);

    //to keep track of login and register
    const[state,change_state]=useState(true)
    //ture = login
    //false= register
    
    useEffect(() => {
        // get_data_from_db()
        // console.log(user_details.data_from_db);
        //axios({url:"/getdata",method:"GET",query:{1:"testing"}})
        axios.get("http://localhost:3010/getdata")
        .then((response)=> {
            change_details(prev_value => {
                return({
                    ...prev_value,
                    data_from_db:response.data
                })
            })
           })
        .catch((err)=>(console.log(err)));
        console.log("render")
    },[state]);
 
    function change_to_register(){
        change_state(prev_value =>(!prev_value))
        change_details(()=>{
            return initialstate;
        }); 
    }

    function handle_change(event){
        const {name,value} = event.target;
        change_details(prev_value =>{
            return({
                ...prev_value,
                [name]:value
            });
        })
    }
    function validate(){

        let username_error=true;
        let password_error=true;
        let confirm_password_error=true;
        let user_name_exits=false;
        let password_match=false;

       // to remove errors everytime the user attempts to login or register
        change_details(prev_value =>{
            return({
                ...prev_value,
                username_error:"",
                password_error:"",
                confirm_password_error:""
            });
        })
        
        //check whether username already exists in db
        user_details.data_from_db.forEach( item => {
            if(item.username === user_details.username){
                user_name_exits=true;
                if(item.password === user_details.password){
                    password_match=true;
                }
            }
        });
        console.log(user_name_exits);
        console.log(password_match);


        if(user_details.username.length < 3){
            username_error=false;
            change_details(prev_value =>{
                return({
                    ...prev_value,
                    username_error:"Username should consist atleast 3 characters!"
                });
            })
        }
       
        
        if(user_details.password.length < 8){
            password_error=false;
            change_details(prev_value =>{
                return({
                    ...prev_value,
                    password_error:"password field should consist atleast 8 characters!"
                });
            })
        }

        if(user_details.password === user_details.username){
            password_error=false;
            change_details(prev_value =>{
                return({
                    ...prev_value,
                    password_error:"username cannot be password"
                });
            })
        }

        if(state)
        {

            if(!user_name_exits){
                username_error=false;
                change_details(prev_value =>
                    {
                    return({
                        ...prev_value,
                        username_error:"username does'nt exist"
                    })
                    })

            }
            if(user_name_exits && !password_match)
            {
                password_error=false;
                change_details(prev_value =>
                    {
                    return({
                        ...prev_value,
                        password_error:"password does'nt match"
                    })
                    })
            }

        }


        if(state === false)
        {
            if(user_name_exits){
                username_error=false
                change_details(prev_value => {
                    return({
                        ...prev_value,
                        username_error:"Username already exits"
                    })
                } )
            }

            if( user_details.password !== user_details.confirm_password){
                confirm_password_error=false;
                change_details(prev_value =>{
                    return({
                        ...prev_value,
                        confirm_password_error:"passwords does'nt match"
                    });
                })
            }
           
            if(user_details.confirm_password.length===0){
                confirm_password_error=false;
                change_details(prev_value =>{
                    return({
                        ...prev_value,
                        confirm_password_error:"confirm your password"
                    });
                })
            }
        
        }
 
        if(state){
            if(username_error && password_error)  {
                return true;
            }
        }
        if(!state){
            if(username_error && password_error && confirm_password_error)  {
                return true;
            }
        }
        else{
            return false;
        }
    }
    const history = useHistory();
    const navigateTo = () => history.push('/note');

    function validate_user(event){
        event.preventDefault()
        if(validate()){ 
            props.senddata(user_details);
            change_details(()=>{
                return initialstate;
            });
            //if the user is in registeration page
            if(!state){
                //console.log("we are in registration form");
        
                axios({
                    url:"http://localhost:3010/add",
                    method:"POST",
                    data:user_details
                })
                .then(function(response) {
                    console.log(response.data);
                    console.log(response.status);
                  })

                  .catch((err)=>(console.log(err)))

                navigateTo();
            }
            //in login page
            else{
                navigateTo();
            }
            
        }
    }

    return(
        <div className="login">
          <h1 style={{marginBottom:"7vh"}}>
          {state ? "Login" : "Register"}
          </h1>
          <form onSubmit={validate_user}>
          <Input 
              placeholder="Username"
              type="text"
              func={handle_change}
              name="username"
              value={user_details.username}
          />
            <div style={{color:"#fff", fontSize:15,marginBottom:7 }} >
              {user_details.username_error}
            </div>
            
              <Input 
              placeholder="your password"
              type="password"
              func={handle_change}
              name="password"
              value={user_details.password}
            />
          <div style={{color:"#fff", fontSize:15,marginBottom:7 }} >
              {user_details.password_error}
            </div>

            {state ? null :   
             <div>   
            <Input 
              placeholder="confirm password"
              type="password"
              func={handle_change}
              name="confirm_password"
              value={user_details.confirm_password}
             />
            <div style={{color:"#fff", fontSize:15,marginBottom:7 }} >
              {user_details.confirm_password_error}</div> 
            </div>}

            <button className="loginbutton" type="submit">
            {state ? "Login" : "Register"}
            </button>
          </form>
          {state ? <div><a href="#" onClick={change_to_register} > Register </a></div> : 
           <div><a href="#" onClick={change_to_register} > Login </a></div>}
          
        </div>
    );
}
