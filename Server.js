var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    path = require("path");

    

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



app.get("/movie", function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));

});
app.get("/Movie.css", function(req, res) {
  res.sendFile(path.join(__dirname + '/Movie.css'));

});
app.get("/Movie.js", function(req, res) {
  res.sendFile(path.join(__dirname + '/Movie.js'));

});

app.get("/data", function(req, res) {
  var dbData=[];
  connection.query(`select * from Movies;`, function (error, results, fields) {
    for (let index = 0; index < results.length; index++) {
      
      dbData.push(results[index]);
      
      
    }
    res.send(dbData);
  });
  
  

});




app.post("/Add", function(request, respond){
    
    //This is the data given from the post request
    var info = request.body;
    //This array will be used to check the database
    var list = [];  
    console.log(info)
    connection.query(`select * from Movies where movie Like "%${info.link}%";`, function (error, results, fields) {
        //For loop saving all the results pulled from the database into the "list" array
        for (let index = 0; index < results.length; index++) {
            list.push(results[index]);
        }
    });
    //Checking to see if there was any data in the databse
    if(list.length === 0){
        var  request = require('request');
        //If no data is seen then a pull request to the imdb api is done with the movie word
        request(`http://www.omdbapi.com/?apikey=d84188da&s=${info.link}`, function (error, response, body) {
            //collecting the data and overriding the previous "list" array since it was empty
            list = JSON.parse(body);
            list = list.Search;
            //Here I am adding a personal feature where if the poster value, which is the movie's poster, is empty i replace it with a custom img
            for (let index = 0; index < list.length; index++) {
                var poster = list[index].Poster;
                if(poster === "N/A" ){
                    poster = "http://www.identdentistry.ca/identfiles/no_image_available.png";
                }
                //Updating all the data in my database so it now has all the new movies i just requested in it
                connection.query(`insert into Movies(movie,Poster,imdID,movieYear,movieType) values("${list[index].Title}","${poster}","${list[index].imdbID}","${list[index].Year}","${list[index].Type}");`, function (error, results, fields) {
                console.log(error)
                });
            }
            //This variable will be used to collect data from the database
            var pulledList=[]
            connection.query(`select * from Movies where movie Like "%${info.link}%";`, function (error, results, fields) {
                for (let index = 0; index < results.length; index++) {
                    //pushing all the data found in the "pulledList" variable
                    pulledList.push(results[index]);
                }
                respond.json({
                    //sending that data back as a response
                data:pulledList
                });
            });
        });
        
    }else{
        respond.json({
        data:list
        });
        }   
});  
  
app.post("/Single", function(request, respond){
  var value = request.body; 
  connection.query(`select * from Movies where ID ="${value.value}";`, function (error, results, fields) {
    respond.json({
      data:results
    });
  });
});   

app.listen(8081,0, function(){
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
connection.query(`drop table Movies; `, function (error, results, fields) {
  
});
}
function create(){
  connection.query(`Create table movies (     
    id       INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,  
    movie    varchar(64) not null,
    poster   varchar(200) not null,
    imdID    varchar(64)  NOT NULL,
    movieYear     varchar(64)  NOT NULL,
    movieType     varchar(64) not null); `, 
    function (error, results, fields) {
  
  });
}