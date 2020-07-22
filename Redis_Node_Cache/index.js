var express=require('express')
var fetch=require('node-fetch')
var redis=require('redis')
// const redis = require('ioredis')

var port = 5000;
var Redis_port;

var client = redis.createClient({host:'192.168.99.100',
Redis_port:6372});

var app = express();
function cache(req,res,next){
    var {username} = req.params;
    client.get(username,(err,data)=>{
    if(err){
        throw err;}
    if(data !==null){
        console.log("cached response")
        res.json(setResponse(username,data))
    }else{next();}
})}
function setResponse(username,repos){
    return repos;
}
async function getRepos(req,res,next){
    try{
        console.log("fetching data...")
        var {username} = req.params;
        var response = await fetch(`https://api.github.com/users/${username}`);

        var data = await response.json();
        var respos = data;

        //set data to redis
        client.setex(username,10000,JSON.stringify(respos))
          res.json(respos);

    }
    catch(err){
        console.error(err)
    }
}

app.get('/repos/:username',cache,getRepos)

app.listen(port, () =>{
    console.log("app listening port "+port);
});
