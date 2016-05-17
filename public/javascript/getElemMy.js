
var form = document.querySelector("form");
form.addEventListener("submit", function(event){
  event.preventDefault();
  //movieReq is the target for the async get request below
  var movieReq = form.action + "s=" + form.elements.s.value ;
  //alert(form.action + "s=" + form.elements.s.value + "&field=" + form.elements.field.value);
  //The World Wide Web Consortium (W3C) is the main international standards organization for the World Wide Web (abbreviated WWW or W3).
  // below, querySelector  is a script function defined/approved by W3C
  var oOutput = document.querySelector("#movieInfo");

  var req = new XMLHttpRequest();
  // the "true" parameter means asynchronous.  false would be synch (depreciated now)
  // this "req" variable receives the data returned by the async get request
  // and i believe the async trigger for the returned data is the "load" parameter named in the addEventListener
  req.open("GET", movieReq, true);
  req.addEventListener("load", function(){
    var readResp;
    var oRead = "<p></p>" + "xxxxxxxxxxxxxxxxxxxx" + "</p></p>" + 
    "xxxxxxxxxxxxxxxxxxxx" + "</p>" + "MOVIE SEARCH RESULTS" + "</p>" + "xxxxxxxxxxxxxxxxxxxx" + "</p>" ;
    if (req.status < 400){

      /*
      var testText = '{"name":"John Johnson","street":"Oslo West 16","phone":"555 1234567"}';
      post '/' do
        File.open('data.json', 'w') do |f|
          f.write params[testText]
        end
      end

      get '/data.json' do |filename|
        send_file('./#{filename}', :filename => filename, :type =>'application/octet-stream')
      end
      */
      //Search is the outer most object key 
      readResp = JSON.parse(req.responseText).Search;

      //set up the target for the async request for finding details for a specific movie
      for (var i = readResp.length - 1; i >= 0; i--) {
        oRead += "<p>" + "<span  id='spn" + i +
          "' onclick='movieDetails(this.id,\"id_movie_details" + i + "\")'>" +
          readResp[i].Title + "&nbsp;&nbsp" + "</span><span id='fav" +
          i +"'><button type='button' onclick='addFavorite(\"" +
          readResp[i].Title+"\",\""+ readResp[i].imdbID +
          "\")'>Favorite</button></span>" + "<p id = 'id_movie_details" + i + "'></p> "
      };
      // so set the text for the #movieInfo location (below the form display) on the web page
      oOutput.innerHTML = oRead;
    }else{
      alert("error");
    };
  });
  req.send(null);
});

function movieDetails(clicked_id,id_movie_details){
  var x=document.getElementById(clicked_id);
  //lert(x.innerHTML);
  var movieReq =  "http://www.omdbapi.com/?t=" + x.innerHTML + "&plot=short" ;

  var req = new XMLHttpRequest();
  req.open("GET", movieReq, true);
  req.addEventListener("load", function(){
    var readResp;
    var oRead = "";

    var movie_details = document.getElementById(id_movie_details);
    if (req.status < 400){      
      //readResp = JSON.stringify(JSON.parse(req.responseText));//, function(key,value){
      readResp = JSON.parse(req.responseText);
      //console.log(readResp);
      //this readResp now is an object of hashes (key:value pairs)
      //Note in JS, the "for..in" construct operates specifically on such objects
      //with the "obj_detail"  below getting each key in the object, one at a time.
      for (var obj_detail in readResp) {
        oRead += "<p>" + obj_detail + " : " + readResp[obj_detail] +  "</p>";
      };
      movie_details.innerHTML = oRead;       
    }else{
      alert("error");
    };
  });
  req.send(null);
}

function getFavorites(){
  var oOutput = document.querySelector("#listFavorites");
  var req = new XMLHttpRequest();
  req.open("GET", "/favorites", true);
  req.addEventListener("load", function(){
    var readResp;
    var oRead =  "<p></p>" + "xxxxxxxxxxxxxxx" +"</p>" + 
    "FAVORITE MOVIES" + "</p>" + "xxxxxxxxxxxxxxx"  + "<p></p>"
    if (req.status < 400){      
      readResp = JSON.parse(req.responseText);
      //readResp is an array of objects
      readResp.forEach(
        function(movie){
          oRead += movie["name"] + "</p>";
        }
      );
      oOutput.innerHTML = oRead;       
    }else{
      alert("error");
    };
  });  
  req.send(null);
};

function addFavorite(name, oid){

  var url = "/favorites";
  var params = "name=" + encodeURIComponent(name) + "&oid=" + encodeURIComponent(oid);
  params = params.replace(/%20/g, '+');
  var req = new XMLHttpRequest();

  req.open("POST", url, true);

  //Send the proper header information along with the request
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  req.setRequestHeader("Content-length", params.length);
  req.setRequestHeader("Connection", "close");

  req.onreadystatechange = function() {//Call a function when the state changes.
    //if(req.readyState == 4 && req.status == 200) {
    if(req.readyState == 4){
      //if(req.status == 200){
      if(req.status < 400){
      //alert(req.responseText);
        if(req.responseText == "Movie added to favorites"){
          getFavorites();
          alert("Favorite Added: " + name );
        } else {
          alert("Movie was already favorited");
        }
      }
    }
  };
  req.send(params);
  //console.log(params);
  return false;
};


