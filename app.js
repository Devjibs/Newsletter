const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const user_data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }

            }
        ]
    };

    const jsonData = JSON.stringify(user_data)

    const url = "https://usX.api.mailchimp.com/3.0/lists/"";
    
    const request = https.request(url, options, function(response){
        if(response.statusCode == 200){
            res.sendFile(__dirname + "/success.html")
        }
        else{
            res.sendFile(__dirname + "/failure.html")
        }



        response.on(user_data, function(user_data){
            console.log(JSON.parse(user_data))
        })
    })

    const options = {
        method: "POST";
        auth: " "
    }

    request.write(jsonData);
    request.end();
    
});

app.listen(3000, function() {
    console.log("server is listening to port 3000");
});