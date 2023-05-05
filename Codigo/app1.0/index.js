const express = require('express')
const app = express()
const path = require('path');

// rotas 

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname + '/HTMLs/index.html'))
})
app.listen(8081, function(){
    console.log("servidor rodando na url larica http://localhost:8081");
})