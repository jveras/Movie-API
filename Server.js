var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    cors = require("cors");

app.use(bodyParser.urlencoded({ "extended": "true" }));
    app.use(bodyParser.json());
    app.use(bodyParser.json({ type: "application/vdn.api+json" }));
    app.use(cors());

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'zxcvbnm',
  database : 'Movies'
});





app.post("/Add", function(request, respond){
  console.log("Hit ")
   var info = request.body;
   console.log(info)
   var list = [];  
   connection.query(`select * from Movies where movie Like "%${info.link}%";`, function (error, results, fields) {
    
    for (let index = 0; index < results.length; index++) {
      
        list.push(results[index]);
        
        
      }
      if(list.length === 0){
        var request = require('request');
       request(`http://www.omdbapi.com/?apikey=d84188da&s=${info.link}`, function (error, response, body) {
        var list2 = JSON.parse(body);
        
          list2 = list2.Search;
      
        
      for (let index = 0; index < list2.length; index++) {
        var poster = list2[index].Poster;
        
        if(poster === "N/A" ){
          poster = "http://www.identdentistry.ca/identfiles/no_image_available.png";
      }
     
        connection.query(`insert into Movies(movie,Poster,imdID,movieYear,movieType) values("${list2[index].Title}","${poster}","${list2[index].imdbID}","${list2[index].Year}","${list2[index].Type}");`, function (error, results, fields) {
          console.log(error)
      });
        
      }
      
      var newlist=[]
      connection.query(`select * from Movies where movie Like "%${info.link}%";`, function (error, results, fields) {
console.log(results);
        
        for (let index = 0; index < results.length; index++) {
          
            newlist.push(results[index]);
            
          }
          respond.json({
            data:newlist
        });
        });
      });
      
      }else{
        console.log("Hit 2")
        respond.json({
          data:list
      })
      }
      
  });

  
  
   
   
});    
app.post("/Single", function(request, respond){
  var value = request.body;
   
  connection.query(`select * from Movies where ID ="${value.value}";`, function (error, results, fields) {
    
    respond.json({
      data:results
  })
  });
});   

app.listen(8081, function(){
  console.log("Server Started");
});


connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

function drop(){
connection.query(`drop table Movies `, function (error, results, fields) {
  
});
}

