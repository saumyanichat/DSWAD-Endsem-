    // npm init -y 
    // npm install express
    // node Server.js

    const express=require('express');
    const fs=require('fs');

    const app=express();

    app.use(express.static(__dirname));

    app.get('/api/products' , (req,res)=>{
        const data=fs.readFileSync('products.json','utf-8');
        const products=JSON.parse(data);

        res.json(products);
    });

    app.listen(3000,()=>{
        console.log("Hello server port no. 3000")
    })