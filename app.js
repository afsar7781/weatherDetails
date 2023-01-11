const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app=express();
app.use(bodyParser.urlencoded({extended:true}))

port=3000;

app.get('/',(req,res)=>{
res.sendFile(__dirname + '/index.html')
})

app.post('/',(req,res)=>{

console.log('received');

const query = req.body.cityName;
const apiKey = 'a432bc71b84e9b33264f1b45bf62623e';
const unit = 'metric';
const url= "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit;

https.get(url,(response)=>{
    console.log(response.statusCode)

    response.on("data", (data)=>{
    const weatherData=JSON.parse(data)
    const temp = weatherData.main.temp
    const weatherDescription=weatherData.weather[0].description;
const icon = weatherData.weather[0].icon
const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
res.write("<p>The weather is currently " + weatherDescription + '<p>');

        res.write('<h1>the temperature in '+ query +' is '+ temp + "degrees celcius.</h1>");
        res.write("<img src="+imageURL +">")
        res.send()
});
});
})



app.listen(port,()=>{
    console.log(`server is running on port ${port} `)
})