window.onload = function(){
    console.log("link test");
    let url = "flights.json";
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        flightParse(xhr.responseText);
    }
    };
    xhr.open("GET", url, true);
    xhr.send();
    //register click events and call respective methods when clicked
    let btnApply = this.document.querySelector("#apply");
    let btnShowAll = this.document.querySelector("#showAll");
    btnApply.addEventListener("click", applyAllFilters);
    btnShowAll.addEventListener("click", showAllFlights);

}
//declares allFlights as a gloabal variable
let allFlights;
function flightParse(text){
    //sets allFlights to the result of JSON.parse
    allFlights = JSON.parse(text);
    console.log("flightsParse")
    //alert when data is done reading
    alert("File data is ready!");
}
//calls buildTable and sends in the flight data
function showAllFlights(){
    console.log("showAllFlights click");
    let flight = allFlights.flights;
    buildTable(flight);    
}
//calls the filter function and then calls the buildTable to build with the filtered data
function applyAllFilters(){
    console.log("applyAllFilters click");
    let flight = allFlights.flights;
    let filteredFlight = filterFlights(flight);
    buildTable(filteredFlight);
    //Clears the inputs after filtering is complete
    document.querySelector("#city").value = "";
    document.querySelector("#country").value = "";
    document.querySelector("#region").value = "";
    document.querySelector("#dayOfWeek").value = "Any";
    document.querySelector("#min").value = "";
    document.querySelector("#max").value = "";
    document.querySelector("#pilot").value = "";
    document.querySelector("#coPilot").value = "";

}

function filterFlights(flight){
    let filterArray = [];
    console.log("filterFlights fired")
    //pulls the data from the labels and makes the data usable for the filters
    let elemCity = document.querySelector("#city");
    let elemCountry = document.querySelector("#country");
    let elemRegion = document.querySelector("#region");
    let elemdayOfWeek = document.querySelector("#dayOfWeek");
    let elemMin = document.querySelector("#min");
    let elemMax = document.querySelector("#max");
    let elemPilot = document.querySelector("#pilot");
    let elemCoPilot = document.querySelector("#coPilot");
    
    let inputCity = elemCity.value.toLowerCase();
    let inputCountry = elemCountry.value.toLowerCase();
    let inputRegion = Number(elemRegion.value);
    let inputDayOfWeek = elemdayOfWeek.value.toLowerCase();
    let inputMin = Number(elemMin.value);
    let inputMax = Number(elemMax.value);
    //sets input max to an unreasonably high number so it wont trip up the filters if no value is entered into #inputMax
    if (inputMax === 0)
        inputMax = 10000000000000000000;
    //loops through the flights data
    for(let i = 0; i < flight.length; i++){
        let filterBool = true;
        let obj = flight[i];
        // checks if the object doesnt match the respective property that we are comparing against and if it doesnt sets the bool to false causing it not to be added to our filtered array
        if (!obj.destination.city.toLowerCase().includes(inputCity))
            filterBool = false;
        if (!obj.destination.country.toLowerCase().includes(inputCountry))
            filterBool = false;
        if  (inputRegion > 0)
            if (obj.destination.region !== inputRegion)
                filterBool = false;
        if (inputDayOfWeek !== "any")
            if(!obj.dayOfWeek.toLowerCase().includes(inputDayOfWeek))
                filterBool = false;
        if (obj.departureTime < inputMin || obj.departureTime > inputMax)
            filterBool = false;
        if (elemPilot.checked)
            if(obj.pilot === undefined)
                filterBool = false;
        if (elemCoPilot.checked)
            if(obj.coPilot === undefined)
                filterBool = false;
        
        if (filterBool === true)
            filterArray.push(flight[i])
    }
    
    console.log(filterArray);
    return filterArray;
}

//builds the table based on data given
function buildTable(flight){
    console.log(flight);
    let  counter = 0;
    //sets up the tHeaders and opening table tag
    let htmlString = "<table>";
    htmlString += "<tr>";
    htmlString += "<th>Flight Number</th>";
    htmlString += "<th>Day</th>";
    htmlString += "<th>Time</th>";
    htmlString += "<th>Destination</th>";
    htmlString += "<th>Pilot</th>";
    htmlString += "<th>Co-Pilot</th>";
    htmlString += "</tr>";

    //loops through the data and adds all required properties to a large html string that is fed into the table div
    for (let i = 0; i < flight.length; i++) {
        let obj = flight[i];
        counter++;
        htmlString += "<tr>";
        htmlString += "<td>" + obj.flightNumber + "</td>";
        htmlString += "<td>" + obj.dayOfWeek + "</td>";
        htmlString += "<td>" + obj.departureTime + "</td>";
        htmlString += "<td>" + obj.destination.code + ' ' + "(" + obj.destination.city + ", " + obj.destination.country + ")" + ", region=" + obj.destination.region + "</td>";
        htmlString += "<td>" + (obj.pilot ? obj.pilot.firstName + " " + obj.pilot.lastName + (obj.pilot.nickName ? " (" + obj.pilot.nickName  + ")" : ""): "not yet assigned") + "</td>";
        htmlString += "<td>" + (obj.copilot ? obj.copilot.firstName + " " + obj.copilot.lastName : "not yet assigned") + "</td>";
        htmlString += "</tr>";
    }
    let container = document.querySelector("#table");
    container.innerHTML = htmlString;
    container = document.querySelector("#totlFlights");
    container.innerHTML = "Flights(" + counter + ")";
}
