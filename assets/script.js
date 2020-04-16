// BASE URL TO ADD CITY NAME AND API KEY
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&apikey=" + APIKey;
var forecastURL= "https://api.openweathermap.org/data/2.5/forecast?q="+cityName +"&appid="+APIKey
/*
The 5-Day Forecast actually breaks down each day's forecast into hour blocks of 3, which will be 
really hard to parse. The function below will solve the problem: 
1) Create a global variable called forecastArray

2) After you make your 5-Day Forecast API call, call this function and pass in the list of weather objects
(response.list)
3. Once this function is done, your global forecast array will be populated.
4. Then loop through that array to create the 5 blue blocks at the bottom
5. You're welcome.  :)
// */ 
var forecastArray=[];
function getForecastForEachDay(listOfForecasts){
    var currentDate = "";
    for(var i=0; i<listOfForecasts.length; i++){
        // We want to capture one weather object for each day in the list. Once we've captured that
        // object, we can ignore all other objects for the same day
        var dateOfListItem = listOfForecasts[i].dt_txt.split(" ")[0];
        if( dateOfListItem !== currentDate ){
            // We need to extract just the date part and ignore the time
            currentDate = dateOfListItem;
            // Push this weather object to the forecasts array
            if( forecastArray.length < 5 ){
                forecastArray.push(listOfForecasts[i]);
            }
        }
    }
}
// MY API KEY
var APIKey  = "166a433c57516f51dfab1f7edaed8413"
// CITY NAME GOTTEN FROM SEARCH 
var cityName="springfield";


// // AJAX CALL JUST FOR WEATHER
// $.ajax({
//   // URL WITH MY KEY  
//   url: queryURL,
//   // METHOD IS JUST "GET" INFORMATION FROM API 
//   method: "GET",

// }).then(function(response){  
//   console.log(response);
// });

// // AJAX CALL FOR 5 DAY FORECAST
// function getFiveDayForecast(){
//   var listResponse;
//   $.ajax({
//     // URL WITH MY KEY  
//     url: forecastURL,
//     // METHOD IS JUST "GET" INFORMATION FROM API 
//     method: "GET",

//   }).then(function(response){  
//     // GET THE RESPONSE AND GET THE LIST ARRAY 
//     listResponse=response.list;
//     // TAKE THE LIST ARRAY AND PUT IT INTO GARYS FUNCTION TO GET 5 DAY 
//     getForecastForEachDay(listResponse);
//   });
//   console.log(forecastArray);
// }




// ARRAY TO BE SAVED TO LOCAL STORAGE 
var storedCities=[];




// SEARCH BUTTON CLICK HANDLER
$("#searchButton").on("click", function(){
    
    // PREVENTS THE PAGE FROM RELOADING 
    event.preventDefault();
    // SET SEARCHED CITY TO THE VALUE OF THE FORM INPUT
    searchedCity=$("#searchedCity").val();
    
    // MAKE SURE THE PORM IS POPULATED AND THE SEARCHED CITY IS NOT IN STORED CITIES
    if(searchedCity!="" && storedCities.indexOf(searchedCity)===-1){
        // CONSOLE LOGS SEARCHED CITY
        console.log(searchedCity);
        // SETS THE FORM INPUT BACK TO ""
        $("#searchedCity").val("");
        // ADDS THE SEARCHED CITY TO THE STORED CITIES
        storedCities.push(searchedCity);
        console.log(storedCities);
        saveToLocal(storedCities);
        getFromLocal();
    }
})
// SAVES ARRAY TO LOCAL STORAGE 
function saveToLocal(storedCities){
    localStorage.setItem("storedCities",JSON.stringify(storedCities));
}
// GET ARRAY FROM LOCAL STORAGE
function getFromLocal(){
    storedString=localStorage.getItem("storedCities");
    storedCities=JSON.parse(storedString);
    console.log(storedCities);   
    renderButtons();
}


// FUNTION TO RENDER THE BUTTONS FROM THE LOCALLY STORED ARRAY
function renderButtons(){
    $("#savedCities").empty();
    for (var i = 0; i < storedCities.length; i++) {  
        newbutton=$("<button>");
        newbutton.text(storedCities[i]);
        $("#savedCities").append(newbutton);
    }
}