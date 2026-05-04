const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static(__dirname)); 

app.get('/api/employees', (req, res) =>{
    const data = fs.readFileSync('employees.json','utf-8');
    const employees = JSON.parse(data);

    res.json(employees);
}); 


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});