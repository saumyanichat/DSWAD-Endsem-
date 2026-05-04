const { error } = require('console');
const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.static("public"));

//get the Api

app.get("weather/:city" ,(req,res)=>{
    const info = fs.readFileSync("weather.json","utf-8");
    const data = JSON.parse(info);

    const city = req.params.city.toLowerCase();

    if(data[city]){

        res.json(data[city]);

    }else{
        res.json({error:"City not found"});
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});