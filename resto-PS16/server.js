const express = require('express');
const path=require('path');

const app=express();

app.use((req,res,next)=>{
    console.log(req.method, " - ", req.url);
    next();
})

app.use(express.static(path.join(__dirname)));


app.get('/home',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});