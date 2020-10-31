var express = require('express');
var router = express.Router();
var passport = require('passport');
var Customer = require('../models/customers')
var User = require('../models/users')
var Post = require('../models/posts');
const users = require('../models/users');

router.get('/customer/register', function (req, res) {
    res.render('customer/register');
});


router.get('/customer/dashboard', function (req, res) {
    res.render('customer/customer')
});


router.get('/customer/view', function (req, res) {
    Post.find({}, function (err, post) {
        User.find({}, function (err, user) {
            if (err) {
                console.log(err);
            } else {
                res.render('customer/view', { posts: post, users: user });
            }
        });
    });
});


router.get('/customer/slot', function (req, res) {
    User.find({}, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            res.render('customer/slot_book', { users: user });
        }
    });
});


router.post('/customer/slot', function (req, res) {
    User.find({}, function (err, user) {
        console.log(req.body.slot)
        console.log(user)
    });
})



router.post('/customer/register', function (req, res) {
    var newCustomer = new Customer({ username: req.body.username, password: req.body.password });
    Customer.create(newCustomer, function (err, customer) {
        if (err) {
            console.log(err);
        } else {
            console.log(customer);
        }
    });
    res.redirect('/customer/dashboard');

});

router.get('/customer/login', function (req, res) {
    res.render('customer/login');
})

router.post('/customer/login', function (req, res) {
    Customer.find({}, function (err, customers) {
        customers.forEach(function (customer) {
            if (customer.username === req.body.username) {
                if (customer.password === req.body.password) {
                    res.redirect('/customer/dashboard')
                }
                else {
                    req.flash("error", "Incorrect Password");
                    console.log('Incorrect Password');
                }
            }
            else {
                req.flash("error", "No User Exists");
                console.log("No user exists");
            }
        })
    });
})

router.get('/logout', function (req, res) {
    req.logout();
    req.flash("success", "Logged Out Successfully")
    res.redirect('/');
});


module.exports = router