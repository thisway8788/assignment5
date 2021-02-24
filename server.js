/************************************************************************************
*  WEB322 – Assignment 3 (Winter 2021)
*  I declare that this assignment is my own work in accordance with Seneca Academic
*  Policy. No part of this assignment has been copied manually or electronically from
*  any other source (including web sites) or distributed to other students.
* Name: Jeunghak Ham
* Student ID: 110214194 Course: WEB322NDD
************************************************************************************/

const path = require("path");
const express = require("express");
const exphbs = require('express-handlebars');
const data = require('./data');
const bodyParser = require('body-parser');
const utils = require('./utils');

const app = express();
app.engine('.hbs', exphbs({extname: '.hbs' , defaultLayout: 'main'}));
app.set('view engine', '.hbs');

app.use(bodyParser.urlencoded({extended: true}))

const HTTP_PORT = process.env.PORT || 8080;
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.use(express.static(path.join(__dirname, '/')));

app.get("/", function(req, res){
    const topMeals = data.getTopMeals();
    res.render('index', {
        data: {
            topMeals
        },
        
    });
});


app.get("/login", function(req, res){
    res.render('login', {
        data: {},
       
    });
});

app.post("/login", function(req, res){

    res.render('login', {
        data: {
            email: req.body.email,
            password: req.body.password,

            emailError: req.body.email === null || req.body.email === "",

            passwordError: req.body.password === null || req.body.password === "",
        },
    })
})

app.post("/signup", function(req, res){

    if (req.body.first === null || req.body.first === "" || req.body.last === null || req.body.last === "" || !utils.isEmail(req.body.email) || !utils.isEmail(req.body.email)) {

   
    res.render('signup', {
        data: {

            firstName: req.body.first,
            lastName: req.body.last, 
            firstNameError: req.body.first === null || req.body.first === "",
            lastNameError: req.body.last === null || req.body.last === "",
            email: req.body.email,
            password: req.body.password,

            emailError: !utils.isEmail(req.body.email),

            passwordError: !utils.isEmail(req.body.email),
            },
        })

        // using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: req.body.email, // Change to your recipient
  from: 'motherfatherilu@gmail.com', // Change to your verified sender
  subject: `Welcome to Toronto Best Lunch Box`,
  text: `Thank you, ${req.body.first} ${req.body.last}`,
  html: `<strong>Thank you, ${req.body.first} ${req.body.last}</strong>`,
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
        res.redirect('/welcome')
    }
})

app.get('/welcome', function(req, res){
    res.render('welcome', {
        data: {},
    })
})


app.get("/signup", function(req, res){
    res.render("signup", {
        data: {},
        
    });
});

app.get("/onthemenu", function(req, res){
    const lunchBoxMeals = data.getMealsByCategoryName('Lunch Box');
    const singleMeals = data.getMealsByCategoryName('Single');
    res.render("onthemenu", {
        data: {
            lunchBoxMeals,
            singleMeals
        },
        
    })
});

app.listen(HTTP_PORT, onHttpStart);