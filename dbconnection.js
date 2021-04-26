const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./dbmodels/authuser');
const Donor = require('./dbmodels/donors')
const bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const authentication = require("./middlewear/authentication")



// ================  Database Connection  ====================//

dotenv.config({ path: './config.env' });
const dbs = process.env.DATABASE;
const port = process.env.PORT;

mongoose.connect(dbs, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', function () {
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});

// ====================== Server  =============================//

// ====================== MiddleWares  =============================//
app.use(express.json());
app.use(bodyParser.json())
app.use(cookieParser());

// ====================== Rest APIs  =============================//
app.post('/signup', (req, res) => {
    const { name, email, password, age, bloodgroup, gender, phone, imageURL } = req.body;
    if (!name || !email || !password || !age || !bloodgroup || !gender || !phone) {
        return res.status(422).json({ error: "Kindly fill all the fields" });
    }
    else {
        User.findOne({ email: email }).then((userExist) => {
            if (userExist) {
                return res.status(422).json({ error: "Email exist" });
            }
            else {
                const user = new User({ name, email, password, age, bloodgroup, gender, phone, imageURL });
                user.save().then(() => {
                    res.status(201).json({ message: "User register" })
                })
                    .catch((err) => { res.status(500).json({ err: "Registration failed" }) })
                console.log(user);
            }
        })
            .catch(err => { console.log(err) })
    }
})


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Kindly fill all the fields" });
        }
        else {
            const login = await User.findOne({ email: email });
            if (login) {
                const passMatch = bcrypt.compare(password, login.password);
                const token = await login.generationAuthToken();
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 86400000),
                    httpOnly: true,
                })
                if (!passMatch) {
                    res.status(400).send({ error: "Invalid User" })
                }
                else {
                    res.send({ message: "Login successfully" })
                    res.json(login);
                }
            }
            else {
                res.status(400).json({ error: "Invalid data" })
            }
        }
    }
    catch (err) {
        res.json({ err: "Operations Failed" })
    }
})
app.get('/profile', authentication, (req, res) => {
    res.send(req.profile);
    console.log(req.profile)

})

app.post('/donorsdata', (req, res) => {
    const { fullname, email, age, bloodgroup, gender, phone, imageURL, latitude, longitude } = req.body;
    if (!fullname || !email || !age || !bloodgroup || !gender || !phone || !latitude || !longitude) {
        return res.status(422).json({ error: "Kindly fill all the fields" });
    }
    else {
        Donor.findOne({ email: req.headers.jwtoken.email }).then((userexist) => {
            if (userexist) {
                let Donors = new Donor({ fullname, email, age, bloodgroup, gender, phone, imageURL, latitude, longitude });
                Donors.save().then(() => {
                    res.status(201).json({ message: "Donate blood profile created" })
                })
                    .catch((err) => { res.status(500).json({ err: "Donate blood profile not created" }) })
            }
            else {
                return res.status(422).json({ error: "User does not exist" });
            }
        })
            .catch(err => { console.log(err) })
    }
})

app.get('//donorsdata', (req, res) => {
    Donor.findOne({ email: req.headers.jwtoken.email }).then((userExist) => {
        if (userExist) {
            Donor.find({}, (err, data) => {
                if (data) {
                    res.send({
                        data: data,
                        status: 201,
                    })
                }
                else {
                    res.send({ message: "data is not available" });
                }
            })
        }
        else {
            res.send({
                message: "User is not exist"
            })
        }
    })
})


app.post('/logout', (req, res) => {
    res.clearCookie("jwtoken");
    req.logout();
    res.status(200).send("User has been logout");
})

// ====================== PORT listening =======================//
app.listen(port, () => {
    console.log("server is running");
})