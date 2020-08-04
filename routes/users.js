const User = require("../models/user.models");
const express = require("express");
const router = express.Router();

router.get("/getdata",(req,res)=>{
    User.find({"username":{$ne:null}}, function(err,found_data){
        if(!err){
            //console.log(req.query.username);
            res.json(found_data)
        }
        else{
            console.log(err);
        }
    })
});

router.get("/getuserdetails",(req,res) =>{
    const user_name = req.query.username;
    User.findOne({username:user_name},function(err,found_data){
        if(!err && found_data){
            console.log(found_data +" from /getuserdetails");
            res.send(found_data.notes_array)
        }
        else{
            console.log(err)
        }
    }) 
});

router.post("/save" , (req,res) => {
    const username = req.body.username
    //console.log(username);
    User.findOne({username:username},function(err,found_data){
        if(!err && found_data){
            //console.log(found_data+"from /save");
            found_data.notes_array.push(req.body.newnote)
            found_data.save((err) =>{
                if(!err){
                    console.log(" saved to db ");
                    res.send({saved:true});
                }
                else{
                    console.log(err);
                }
            } );
        }
        else{
            console.log(err);
        }
    })
})

router.post("/delete",(req,res)=>{
    const username = req.body.username
    const title = req.body.title
    const content = req.body.content
    User.findOneAndUpdate({username:username},{$pull:{notes_array:{title:title,content:content}}},function(err,found_data){
        if(!err){
            console.log("value deleted")
            res.send({deleted:true});
        }
        else{
            console.log(err);
        }
    })

})


router.post("/add",(req,res)=>{
    const new_user = User({
        username:req.body.username,
        password:req.body.password
    });

    new_user.save((err)=>{
        if(!err){
           console.log("successfully saved to database");
        }
        else{
            console.log(err);
        }
    });
})



module.exports= router;