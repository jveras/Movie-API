var global = "";

$('#Movies').keydown(function (event) {
    var keypressed = event.keyCode || event.which;
    if (keypressed == 13) {
        var value=$("#Movies").val();
        global = value;
    $.ajax("http://localhost:8081/Add", {
                            method: "POST",
                            data:{
                                link:value
                            },
                            success: function(results){
                                var html=""
                                $("#allMovies").html(html);
                                var data = results.data;
                                console.log(data);
                                for (let index = 0; index < data.length; index++) {
                                    html+=`
                                    <div class="col-lg-4 box text-center">
                                    <img class="img" onclick='selected(${data[index].id})' src="${data[index].poster}" >
                                    </br>
                                    <h5 class="">${data[index].movie}</h5>
                                    
                                    </div>`
                                    
                                } 
                                $("#allMovies").html(html);
                                
                            },
                            error: function(err){
                            console.log(err);
                            }
                        });
             $(".movies").val("");
    }
});
$(".btn").click(function(){
    var value=$("#Movies").val();
    global = value;
    $.ajax("http://localhost:8081/Add", {
                            method: "POST",
                            data:{
                                link:value
                            },
                            success: function(results){
                                var html=""
                                $("#allMovies").html(html);
                                var data = results.data;
                                console.log(data);
                                for (let index = 0; index < data.length; index++) {
                                    html+=`
                                    <div class="col-lg-4 box text-center">
                                    <img class="img" onclick='selected(${data[index].id})' src="${data[index].poster}" >
                                    </br>
                                    <h5 class="">${data[index].movie}</h5>
                                    
                                    </div>`
                                    
                                } 
                                $("#allMovies").html(html);
                                
                            },
                            error: function(err){
                            console.log(err);
                            }
                        });
             $(".movies").val("");           
});
function selected(id){
    
    $.ajax("http://localhost:8081/Single", {
                            method: "POST",
                            data:{
                                value:id
                            },
                            success: function(results){
                                var html=""
                                var data = results.data[0];
                                console.log(data);

                                    html+=`
                                    <div class="col-lg-12 box text-center">
                                    <h2 class="">${data.movie}</h2>
                                    <img class="img" src="${data.poster}" >
                                    <h5 class="">Type : ${capitalize(data.movieType)}</h5>
                                    <h5 class="">Year : ${data.movieYear}</h5>
                                    </br>
                                    <button onclick='back("${global}")'>Return</button>
                                    
                                    </div>`
                                    
                                
                                $("#allMovies").html(html);
                                global = "";
                            },
                            error: function(err){
                            console.log(err);
                            }
                        });

}

function back(str){
    $.ajax("http://localhost:8081/Add", {
                            method: "POST",
                            data:{
                                link:str
                            },
                            success: function(results){
                                var html=""
                                $("#allMovies").html(html);
                                var data = results.data;
                                console.log(data);
                                for (let index = 0; index < data.length; index++) {
                                    html+=`
                                    <div class="col-lg-4 box text-center">
                                    <img class="img" onclick='selected(${data[index].id})' src="${data[index].poster}" >
                                    </br>
                                    <h5 class="">${data[index].movie}</h5>
                                    
                                    </div>`
                                    
                                } 
                                $("#allMovies").html(html);
                                global=str;
                            },
                            error: function(err){
                            console.log(err);
                            }
                        });
             
    }

function capitalize(s)
{
    return s[0].toUpperCase() + s.slice(1);
}





