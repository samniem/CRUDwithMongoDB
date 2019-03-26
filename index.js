const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

//MongoDB connection
mongoose.connect('mongodb://localhost/userbase')
let db = mongoose.connection
db.once('open', function(){
    console.log("Successfully connected to MongoDB.")
})
db.on('error', function(err){
    console.log(err)
})

//load Users
let Users = require('./schemas/users')

//init express 
const app = express()

//Parsing
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Load pug views
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//public folder
app.use(express.static(path.join(__dirname, 'public')))

//Index route
app.get('/', function(req, res){
    Users.find({}, function(err, users){
        if(err){
            console.log(err)
        }else{
            res.render('index',{
                users:users
            })
        }
    })
})

//Get user
app.get('/user/:id', function(req, res){
    Users.findById(req.params.id, function(err, user){
        res.render('user',{
            user:user
        })
    })
})

//Add user
app.get('/users/add', function(req, res){
    res.render('add_user')
})

//Add user submit (POST)
app.post('/users/add', function(req, res){
    let user = new Users()
    user.name = req.body.name
    user.email = req.body.email
    user.country = req.body.country
    if(req.body.city){
        user.city = req.body.city
    }
    if(req.body.address){
        user.address = req.body.address
    }
    if(req.body.occupation){
        user.occupation = req.body.occupation
    }

    user.save(function(err){
        if(err){
            console.log(err)
            return
        }else{
            res.redirect('/')
        }
    })
})

//Edit user data
app.get('/users/edit/:id', function(req, res){
    Users.findById(req.params.id, function(err, user){
        res.render('edit_user',{
            user:user
        })
    })
})

//Update user data
app.post('/users/edit/:id', function(req, res){
    let user = {}
    user.name = req.body.name
    user.email = req.body.email
    user.country = req.body.country
    user.city = req.body.city
    user.address = req.body.address
    user.occupation = req.body.occupation

    let query = {_id:req.params.id}
    console.log(query)

    Users.update(query, user, function(err){
        if(err){
            console.log(err)
            return
        }else{
            res.redirect('/')
        }
    })
})

//Delete user
app.delete('/users/edit/:id', function(req, res){
    let query = {_id:req.params.id}
    console.log(query)
    Users.deleteOne(query, function(err){
        if(err){
            console.log(err)
        }else{
            res.send('Successfully deleted user')
        }
    })
})

//start the server
app.listen(3000, function(){
    console.log('Server started on port 3000')
})

