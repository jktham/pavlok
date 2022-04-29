const http = require("http");
const url = require("url");
const axios = require("axios");
const fs = require("fs");
const express = require("express");

const app = express();
app.use(express.static('public'));

let client_id = JSON.parse(fs.readFileSync("credentials.json", "utf8"))["client_id"];
let client_secret = JSON.parse(fs.readFileSync("credentials.json", "utf8"))["client_secret"];
let token = "";

app.get("/controls", function (req, res) {
    let page = fs.readFileSync("public/index.html", "utf8");

    res.status(200);
    res.append('Content-Type', 'text/html; charset=utf8');
    res.send(page);
});

app.get("/auth", function (req, res) {

    res.redirect(302, `https://pavlok-mvp.herokuapp.com/oauth/authorize?client_id=${client_id}&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fredirect&response_type=code`);
});

app.get("/token", function (req, res) {
    if (token) {
        res.status(200).send(token);
    } else {
        res.sendStatus(500);
    }
});

app.get("/redirect", function (req, res) {
    let query = url.parse(req.url, true).query;
    let code = query["code"];

    if (code) {
        let data = {
            "client_id": client_id,
            "client_secret": client_secret,
            "code": code,
            "grant_type": "authorization_code",
            "redirect_uri": "http://127.0.0.1:3000/redirect"
        };
    
        axios.post("http://pavlok-mvp.herokuapp.com/oauth/token", data)
            .then((res) => {
                //console.log(res.data);
                console.log("Received token:", res.data["access_token"]);
                token = res.data["access_token"];
            }).catch((err) => {
                console.log(err);
            });
    }

    let page = fs.readFileSync("public/index.html", "utf8");

    res.redirect(302, "http://127.0.0.1:3000/controls");
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
