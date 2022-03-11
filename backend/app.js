const express = require('express');
const cors = require('cors')
const fs = require('fs');
var bodyParser = require('body-parser');
const { stringify } = require('querystring');

const funcionarios = JSON.parse(fs.readFileSync('./database.json'))

const app = express();

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); //habilitando cors na nossa aplicacao

app.get('/', (req, res) => res.send("Hello World"))

app.get('/home', function(req, res) {
    
    funcionarios.forEach(element => {
        if(element.token == "33562"){
            console.log("Logado!!")
            res.json({ auth: true, token: "33562" });
        }else{
            res.json({ auth: false, token: "" });
        }
    })
    
});


function validToken(req, res, next){
 
}
app.post('/register', urlencodedParser, (req, res) => {
    const form = req.body;

    let funcSearch = funcionarios.slice()
    
    funcSearch = funcSearch.filter(element => {
        return element.name == form.name;
    });
    
    if(funcSearch.length == 0 ){
        funcionarios.push({name: form.name, pass: form.pass, token: ""})
        
        fs.writeFileSync('./database.json', JSON.stringify(funcionarios));
        res.sendStatus(201);
    }else{
        res.sendStatus(401);
    }
   
}) 

app.post('/login', urlencodedParser, (req, res) => {
    const form = req.body;

    const token = "33562";
    
    if(token != form.token){
        res.sendStatus(401);
    }

    funcionarios.forEach(element => {
        if(element.name == form.name && element.pass == form.pass){
            element.token = form.token;
            fs.writeFileSync('./database.json', JSON.stringify(funcionarios));
            res.json({ auth: true, token: form.token });
        }else{
            res.status(401).json({message: 'Login inválido!'});
        }
    });
    
})  

app.get('/logout', (req, res) => {
    let funcSearch = funcionarios.slice()

    funcionarios.forEach(element => {
        if(element.token == "33562"){
            element.token = "";
            fs.writeFileSync('./database.json', JSON.stringify(funcionarios));
            res.json({ auth: false, token: element.token });
        }
    });
})

const server = app.listen(8000, () => { 
    console.log("http://localhost:8000");
});