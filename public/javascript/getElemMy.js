
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
  // the "true" parameter means asynchronous.  true would be synch (depreciated now)
  // this "req" variable receives the data returned by the async get request
  // and i believe the async trigger for the returned data is the "load" parameter named in the addEventListener
  req.open("Get", movieReq, true);
  req.addEventListener("load", function(){
    var readResp;
    var oRead = "";
    if (req.status < 400){
      //readResp = JSON.stringify(JSON.parse(req.responseText).Search);//, function(key,value){

      //oOutput.innerHTML = JSON.stringify(JSON.parse(req.responseText).Search);
      readResp = JSON.parse(req.responseText).Search;
      //console.log(readResp);

      //set up the target for the async request for finding details for a specific movie
      for (var i = readResp.length - 1; i >= 0; i--) {
        oRead += "<p>" + "<span  id='spn" + i + "' onclick='movieDetails(this.id)'>" + readResp[i].Title + "</span><span id='detspn" + i + "'></span>" + "</p>";
      };
      // so set the text for the #movieInfo location (below the form display) on the web page
      oOutput.innerHTML = oRead;
    }else{
      alert("error");
    };
  });
  req.send(null);
});

function movieDetails(clicked_id){
  var x=document.getElementById(clicked_id);
  //lert(x.innerHTML);
  var movieReq =  "http://www.omdbapi.com/?t=" + x.innerHTML + "&plot=short" ;

  var req = new XMLHttpRequest();
  req.open("Get", movieReq, true);
  req.addEventListener("load", function(){
    var readResp;
    var oRead = "";
    var detailsSpan_id = "det" + clicked_id;
    var detailsElem = document.getElementById(detailsSpan_id);
    if (req.status < 400){      
      //readResp = JSON.stringify(JSON.parse(req.responseText));//, function(key,value){
      readResp = JSON.parse(req.responseText);
      for (obj_detail in readResp) {
        oRead += "<p>" + obj_detail + " : " + readResp[obj_detail] +  "</p>";
      };
      //oRead = readResp.Title;
      detailsElem.innerHTML = oRead;       
      //alert(readResp);
      //oOutput.innerHTML = JSON.stringify(JSON.parse(req.responseText).Search);
      /*
      readResp = JSON.parse(req.responseText).Search;
      console.log(readResp);

      for (var i = readResp.length - 1; i >= 0; i--) {
        oRead += "<p>" + "<span  id='spn" + i + "' onclick='movieDetails(this.id)'>" + readResp[i].Title + "</span>" + "</p>";
      };

      oOutput.innerHTML = oRead;
      */
    }else{
      alert("error");
    };
  });
  req.send(null);
}

function getValue()
  {
  var x=document.getElementById("beside");
  x.innerHTML  = "is this beside the click element?"
  }

function myGetElem(xx){
  var y = document.getElementById(xx);
  var t = "test";
  return t;
};
